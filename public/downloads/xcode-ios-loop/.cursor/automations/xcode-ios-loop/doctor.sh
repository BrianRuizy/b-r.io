#!/usr/bin/env bash
set -euo pipefail
AUTOMATION_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$AUTOMATION_DIR/../../.." && pwd)"
# shellcheck source=/dev/null
source "$AUTOMATION_DIR/hooks/shared.sh"

echo "Xcode iOS loop doctor"
echo "root: $ROOT"

project="$(xcode_find_project "$ROOT" || true)"
if [[ -n "$project" ]]; then
  echo "project: $project"
else
  echo "project: NOT FOUND"
fi

scheme="$(xcode_scheme 2>/dev/null || true)"
if [[ -n "$scheme" ]]; then
  echo "scheme: $scheme"
else
  echo "scheme: NOT FOUND (run from repo root with an .xcodeproj or .xcworkspace nearby)"
fi

echo "automation: $(xcode_read_enabled)"
command -v jq >/dev/null && echo "jq: ok" || echo "jq: missing (brew install jq)"

hooks_file="$ROOT/.cursor/hooks.json"
if [[ -f "$hooks_file" ]] && grep -q xcode-ios-loop "$hooks_file"; then
  echo "hooks.json: ok"
else
  echo "hooks.json: missing or not wired"
fi

if [[ -n "$project" ]]; then
  echo "schemes:"
  xcode_list_schemes "$project" | sed 's/^/  - /'
fi
