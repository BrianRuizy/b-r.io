#!/usr/bin/env bash
# Cursor stop hook: build & run in Xcode when the agent finishes a turn.

set -euo pipefail

HOOKS_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=/dev/null
source "$HOOKS_DIR/shared.sh"

if ! xcode_automation_enabled; then
  exit 0
fi

xcode_log_hook "stop hook"
xcode_run_build "stop"

exit 0
