#!/usr/bin/env bash
# Shared helpers for the iOS Xcode build loop.

_HOOKS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
AUTOMATION_DIR="$(cd "$_HOOKS_DIR/.." && pwd)"
ENABLED_FILE="$AUTOMATION_DIR/.xcode-loop"
SCHEME_FILE="$AUTOMATION_DIR/.scheme"
MIN_COOLDOWN_SEC="${XCODE_BUILD_COOLDOWN_SEC:-30}"
DEBOUNCE_SEC="${XCODE_BUILD_DEBOUNCE_SEC:-6}"
MAX_WATCH_SEC="${XCODE_BUILD_WATCH_MAX_SEC:-300}"

xcode_resolve_app() {
  if [[ -n "${XCODE_APP:-}" ]]; then
    echo "$XCODE_APP"
    return
  fi
  local app doc_count
  for app in "Xcode-beta" "Xcode"; do
    doc_count="$(osascript -e "tell application \"$app\" to count workspace documents" 2>/dev/null || echo 0)"
    if [[ "$doc_count" =~ ^[1-9] ]]; then
      echo "$app"
      return
    fi
  done
  if [[ -d "/Applications/Xcode-beta.app" ]]; then
    echo "Xcode-beta"
  else
    echo "Xcode"
  fi
}

xcode_repo_root() {
  cd "$AUTOMATION_DIR/../../.." && pwd
}

xcode_build_dir() {
  echo "$(xcode_repo_root)/.build"
}

xcode_hook_log() {
  echo "$(xcode_build_dir)/xcode-build-hook.log"
}

xcode_log_hook() {
  mkdir -p "$(xcode_build_dir)"
  echo "—— $(date -Iseconds) $* ——" >> "$(xcode_hook_log)"
}

xcode_read_enabled() {
  if [[ ! -f "$ENABLED_FILE" ]]; then
    echo "on"
    return
  fi
  local flag
  flag="$(tr '[:upper:]' '[:lower:]' < "$ENABLED_FILE" | tr -d '[:space:]')"
  case "$flag" in
    on|1|true|yes) echo "on" ;;
    *) echo "off" ;;
  esac
}

xcode_automation_enabled() {
  [[ "${XCODE_SKIP_BUILD_HOOK:-}" == "1" ]] && return 1
  [[ "$(xcode_read_enabled)" == "on" ]]
}

xcode_list_schemes() {
  local project="$1"
  if [[ "$project" == *.xcworkspace ]]; then
    xcodebuild -list -workspace "$project" 2>/dev/null | sed -n '/Schemes:/,/^$/p' | tail -n +2 | sed 's/^[[:space:]]*//' | grep -v '^$'
  else
    xcodebuild -list -project "$project" 2>/dev/null | sed -n '/Schemes:/,/^$/p' | tail -n +2 | sed 's/^[[:space:]]*//' | grep -v '^$'
  fi
}

xcode_scheme_exists() {
  local project="$1" scheme="$2"
  [[ -n "$scheme" ]] || return 1
  while IFS= read -r candidate; do
    [[ "$candidate" == "$scheme" ]] && return 0
  done < <(xcode_list_schemes "$project")
  return 1
}

xcode_scheme_is_app_like() {
  local scheme="$1"
  [[ "$scheme" != *Test* ]] || return 1
  [[ "$scheme" != Pods-* ]] || return 1
  return 0
}

xcode_pick_scheme() {
  local project="$1"
  local base scheme

  [[ -n "$project" ]] || return 1

  base="$(basename "$project")"
  base="${base%.xcworkspace}"
  base="${base%.xcodeproj}"

  while IFS= read -r scheme; do
    [[ "$scheme" == "$base" ]] && { echo "$scheme"; return 0; }
  done < <(xcode_list_schemes "$project")

  while IFS= read -r scheme; do
    xcode_scheme_is_app_like "$scheme" || continue
    echo "$scheme"
    return 0
  done < <(xcode_list_schemes "$project")

  xcode_list_schemes "$project" | head -1
}

xcode_write_scheme() {
  printf '%s\n' "$1" > "$SCHEME_FILE"
}

xcode_scheme() {
  local root project configured detected

  if [[ -n "${XCODE_SCHEME:-}" ]]; then
    echo "$XCODE_SCHEME"
    return 0
  fi

  root="$(xcode_repo_root)"
  project="$(xcode_find_project "$root")" || return 1

  if [[ -f "$SCHEME_FILE" ]]; then
    configured="$(tr -d '[:space:]' < "$SCHEME_FILE")"
    if [[ -n "$configured" ]] && xcode_scheme_exists "$project" "$configured"; then
      echo "$configured"
      return 0
    fi
  fi

  detected="$(xcode_pick_scheme "$project")" || return 1
  xcode_write_scheme "$detected"
  echo "$detected"
}

xcode_find_project() {
  local root="$1"
  local workspace project prune
  prune=(\( -path '*/Pods/*' -o -path '*/DerivedData/*' -o -path '*/.build/*' -o -path '*.xcodeproj/*' \) -prune -o)

  workspace="$(
    find "$root" -maxdepth 4 "${prune[@]}" -name '*.xcworkspace' -print 2>/dev/null | head -1
  )"
  if [[ -n "$workspace" ]]; then
    echo "$workspace"
    return 0
  fi

  project="$(
    find "$root" -maxdepth 4 "${prune[@]}" -name '*.xcodeproj' -print 2>/dev/null | head -1
  )"
  if [[ -n "$project" ]]; then
    echo "$project"
    return 0
  fi

  return 1
}

xcode_cooldown_file() {
  echo "$(xcode_build_dir)/xcode-build-last-trigger"
}

xcode_within_cooldown() {
  [[ "${XCODE_FORCE_BUILD:-}" == "1" ]] && return 1
  local cooldown_file last now
  cooldown_file="$(xcode_cooldown_file)"
  [[ -f "$cooldown_file" ]] || return 1
  last=$(stat -f '%m' "$cooldown_file" 2>/dev/null || stat -c '%Y' "$cooldown_file")
  now=$(date +%s)
  (( now - last < MIN_COOLDOWN_SEC ))
}

xcode_mark_trigger() {
  date +%s > "$(xcode_cooldown_file)"
}

xcode_watch_pid_file() {
  echo "$(xcode_build_dir)/xcode-build-watch.pid"
}

xcode_cleanup_stale_watcher() {
  local watch_file pid mtime now
  watch_file="$(xcode_watch_pid_file)"
  [[ -f "$watch_file" ]] || return 0
  pid=$(tr -d '[:space:]' < "$watch_file" 2>/dev/null || true)
  mtime=$(stat -f '%m' "$watch_file" 2>/dev/null || stat -c '%Y' "$watch_file" 2>/dev/null || echo 0)
  now=$(date +%s)
  if [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null; then
    if (( now - mtime > MAX_WATCH_SEC )); then
      kill "$pid" 2>/dev/null || true
      rm -f "$watch_file"
      xcode_log_hook "cleared stale build watcher (pid $pid)"
    fi
    return 0
  fi
  rm -f "$watch_file"
}

xcode_action_running() {
  xcode_cleanup_stale_watcher
  local watch_file pid
  watch_file="$(xcode_watch_pid_file)"
  [[ -f "$watch_file" ]] || return 1
  pid=$(tr -d '[:space:]' < "$watch_file" 2>/dev/null || true)
  [[ -n "$pid" ]] || { rm -f "$watch_file"; return 1; }
  if kill -0 "$pid" 2>/dev/null; then
    return 0
  fi
  rm -f "$watch_file"
  return 1
}

xcode_run_build() {
  local log reason
  log="$(xcode_hook_log)"
  reason="${1:-hook}"

  if [[ "$reason" == "stop" ]]; then
    XCODE_FORCE_BUILD=1
  fi

  xcode_cleanup_stale_watcher

  if ! xcode_automation_enabled; then
    xcode_log_hook "skipped ($reason): automation off"
    return 0
  fi

  if xcode_within_cooldown; then
    xcode_log_hook "skipped ($reason): cooldown (${MIN_COOLDOWN_SEC}s)"
    return 0
  fi

  if xcode_action_running; then
    if [[ "${XCODE_FORCE_BUILD:-}" == "1" ]]; then
      kill "$(tr -d '[:space:]' < "$(xcode_watch_pid_file)" 2>/dev/null || true)" 2>/dev/null || true
      rm -f "$(xcode_watch_pid_file)"
      xcode_log_hook "replaced running watcher ($reason)"
    else
      xcode_log_hook "skipped ($reason): build watcher already running"
      return 0
    fi
  fi

  mkdir -p "$(xcode_build_dir)"
  xcode_log_hook "trigger ($reason) scheme=$(xcode_scheme)"
  XCODE_BUILD_TRIGGER="$reason" XCODE_FORCE_BUILD="${XCODE_FORCE_BUILD:-}" "$AUTOMATION_DIR/run.sh" >> "$log" 2>&1 &
  local run_pid=$!
  disown "$run_pid" 2>/dev/null || true
  xcode_log_hook "started run.sh pid=$run_pid"
}
