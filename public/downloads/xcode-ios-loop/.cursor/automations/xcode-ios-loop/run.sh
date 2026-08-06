#!/usr/bin/env bash
# Build & run your iOS app in Xcode (Product → Run).

set -euo pipefail

AUTOMATION_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$AUTOMATION_DIR/../../.." && pwd)"
# shellcheck source=/dev/null
source "$AUTOMATION_DIR/hooks/shared.sh"

SCHEME="$(xcode_scheme)"
PROJECT="$(xcode_find_project "$ROOT")"
LOG_DIR="$(xcode_build_dir)"
ISSUES_FILE="$LOG_DIR/xcodebuild-issues.txt"
STATUS_FILE="$LOG_DIR/xcodebuild-status.txt"
WATCH_PID_FILE="$(xcode_watch_pid_file)"
FINISH_SCRIPT="$AUTOMATION_DIR/finish.sh"
TRIGGER="${XCODE_BUILD_TRIGGER:-manual}"
XCODE_ACTION="${XCODE_ACTION:-run}"
XCODE_ACTIVATE="${XCODE_ACTIVATE:-0}"
WATCH_MAX_SEC="${XCODE_BUILD_WATCH_MAX_SEC:-300}"

if [[ "$TRIGGER" == "manual" ]]; then
  XCODE_FORCE_BUILD=1
fi

if [[ -z "$PROJECT" ]]; then
  echo "No .xcworkspace or .xcodeproj found in repo root" >&2
  exit 1
fi

mkdir -p "$LOG_DIR"
xcode_cleanup_stale_watcher

if xcode_action_running && [[ "${XCODE_FORCE_BUILD:-}" != "1" ]]; then
  echo "skipped: build watcher already running" >&2
  exit 0
fi

if [[ ! -d "/Applications/Xcode.app" && ! -d "/Applications/Xcode-beta.app" ]]; then
  echo "Xcode.app not found" >&2
  exit 1
fi

XCODE_APP="$(xcode_resolve_app)"
export XCODE_APP

xcode_has_workspace() {
  osascript -e "tell application \"$XCODE_APP\" to (count of workspace documents) > 0" 2>/dev/null | grep -q true
}

if ! xcode_has_workspace; then
  if [[ "$XCODE_ACTIVATE" == "1" ]]; then
    open -a "$XCODE_APP" "$PROJECT"
  else
    open -g -a "$XCODE_APP" "$PROJECT"
  fi
  for _ in $(seq 1 40); do
    xcode_has_workspace && break
    sleep 0.25
  done
fi

echo "→ Xcode $XCODE_ACTION  scheme=$SCHEME  app=$XCODE_APP"
echo "  project: $PROJECT"

START_SCRIPT="$AUTOMATION_DIR/start.applescript"
TMP_START="$LOG_DIR/.xcode-start.applescript"
sed "s/__XCODE_APP__/$XCODE_APP/g" "$START_SCRIPT" > "$TMP_START"

osascript "$TMP_START" "$SCHEME" "$XCODE_ACTION" "$XCODE_ACTIVATE" >/dev/null || {
  rm -f "$TMP_START"
  echo "failed to start $XCODE_ACTION" >&2
  echo "failed $SCHEME" > "$STATUS_FILE"
  exit 1
}
rm -f "$TMP_START"

xcode_mark_trigger
echo "running $SCHEME" > "$STATUS_FILE"

xcode_action_snapshot() {
  osascript 2>/dev/null <<APPLESCRIPT
tell application "$XCODE_APP"
  tell active workspace document
    set r to last scheme action result
    return (completed of r as string) & tab & (status of r as string) & tab & (count of build errors of r as string)
  end tell
end tell
APPLESCRIPT
}

(
  deadline=$((SECONDS + WATCH_MAX_SEC))
  watch_start=$SECONDS
  fail_streak=0
  stable_run_polls=0
  error_polls=0
  seen_active_build=0
  RUN_MIN_SEC="${XCODE_RUN_MIN_SEC:-45}"
  RUN_STABLE_POLLS="${XCODE_RUN_STABLE_POLLS:-5}"
  ERROR_STABLE_POLLS="${XCODE_ERROR_STABLE_POLLS:-2}"

  while (( SECONDS < deadline )); do
    snapshot="$(xcode_action_snapshot || true)"
    if [[ -z "$snapshot" ]]; then
      fail_streak=$((fail_streak + 1))
      (( fail_streak >= 5 )) && break
      sleep 2
      continue
    fi

    fail_streak=0
    IFS=$'\t' read -r completed build_status err_count <<< "$snapshot"
    err_count="${err_count:-0}"
    elapsed=$((SECONDS - watch_start))

    [[ "$completed" == "false" || "$build_status" == "running" ]] && seen_active_build=1

    if [[ "$completed" == "true" && ( "$seen_active_build" -eq 1 || elapsed -ge 10 ) ]]; then
      break
    fi

    case "$build_status" in
      succeeded|failed|cancelled) break ;;
    esac

    if [[ "$err_count" != "0" ]]; then
      error_polls=$((error_polls + 1))
      stable_run_polls=0
      (( error_polls >= ERROR_STABLE_POLLS )) && break
    else
      error_polls=0
    fi

    if [[ "$XCODE_ACTION" == "run" && "$build_status" == "running" && "$err_count" == "0" && elapsed -ge RUN_MIN_SEC ]]; then
      stable_run_polls=$((stable_run_polls + 1))
      (( stable_run_polls >= RUN_STABLE_POLLS )) && break
    else
      stable_run_polls=0
    fi

    sleep 2
  done

  export XCODE_ACTION
  "$FINISH_SCRIPT" "$ISSUES_FILE" "$STATUS_FILE" "$SCHEME"
  rm -f "$WATCH_PID_FILE"
) &

echo $! > "$WATCH_PID_FILE"
disown "$(cat "$WATCH_PID_FILE")" 2>/dev/null || true
