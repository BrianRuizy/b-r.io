#!/usr/bin/env bash
# Cursor afterFileEdit hook: debounced build & run in Xcode for Swift files.

set -euo pipefail

input=$(cat)
file_path="$(echo "$input" | jq -r '.file_path // empty')"

[[ -n "$file_path" && "$file_path" == *.swift ]] || exit 0

case "$file_path" in
  */.build/*|*/DerivedData/*) exit 0 ;;
esac

HOOKS_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=/dev/null
source "$HOOKS_DIR/shared.sh"

if ! xcode_automation_enabled; then
  exit 0
fi

BUILD_DIR="$(xcode_build_dir)"
STAMP="$BUILD_DIR/xcode-build.stamp"
mkdir -p "$BUILD_DIR"

token="$$-$(date +%s%N)"
echo "$token" > "$STAMP"

xcode_log_hook "afterFileEdit ${file_path##*/} (debouncing ${DEBOUNCE_SEC}s)"

HOOK_LOG="$(xcode_hook_log)"
nohup bash -c "
  sleep \"${DEBOUNCE_SEC}\"
  [[ \"\$(cat \"$STAMP\" 2>/dev/null)\" == \"$token\" ]] || exit 0
  source \"$HOOKS_DIR/shared.sh\"
  xcode_run_build \"afterFileEdit\"
" >> "$HOOK_LOG" 2>&1 &

disown $! 2>/dev/null || true
exit 0
