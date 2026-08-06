#!/usr/bin/env bash
# Extract build results from Xcode into .build/ for Cursor.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=/dev/null
source "$SCRIPT_DIR/hooks/shared.sh"

ISSUES_FILE="${1:?issues file}"
STATUS_FILE="${2:?status file}"
SCHEME="${3:?scheme}"
XCODE_APP="${XCODE_APP:-$(xcode_resolve_app)}"

read -r build_status err_count <<EOF
$(osascript 2>/dev/null <<APPLESCRIPT
tell application "$XCODE_APP"
  tell active workspace document
    set r to last scheme action result
    return (status of r as string) & " " & (count of build errors of r)
  end tell
end tell
APPLESCRIPT
)
EOF

: > "$ISSUES_FILE"

while IFS=$'\t' read -r fp ln msg; do
  [[ -z "$msg" ]] && continue
  if [[ -n "$fp" && "$fp" != "missing value" && -n "$ln" && "$ln" != "missing value" ]]; then
    echo "$fp:$ln:0: error: $msg" >> "$ISSUES_FILE"
  else
    echo "error: $msg" >> "$ISSUES_FILE"
  fi
done < <(osascript 2>/dev/null <<APPLESCRIPT
tell application "$XCODE_APP"
  tell active workspace document
    set r to last scheme action result
    set out to ""
    repeat with e in build errors of r
      set out to out & (file path of e) & tab & (starting line number of e) & tab & (message of e) & linefeed
    end repeat
    return out
  end tell
end tell
APPLESCRIPT
)

xcode_build_succeeded() {
  [[ "$build_status" == "succeeded" ]] && return 0
  [[ "${XCODE_ACTION:-run}" == "run" && "$build_status" == "running" && "${err_count:-1}" == "0" ]]
}

if xcode_build_succeeded; then
  echo "succeeded $SCHEME" > "$STATUS_FILE"
else
  echo "failed $SCHEME" > "$STATUS_FILE"
fi
