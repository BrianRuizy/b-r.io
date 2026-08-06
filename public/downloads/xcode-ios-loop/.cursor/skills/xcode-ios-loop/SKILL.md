---
name: xcode-ios-loop
description: >-
  iOS Xcode build loop. After Swift edits, read .build/xcodebuild-status.txt
  and .build/xcodebuild-issues.txt before claiming the build succeeded.
---

# Xcode iOS build loop

Automation lives in `.cursor/automations/xcode-ios-loop/`.

## After Swift changes

1. Hooks run Product → Run in Xcode after Swift edits (debounced) and when your turn ends.
2. Read `.build/xcodebuild-status.txt` and `.build/xcodebuild-issues.txt`.
3. Do not claim success unless status is `succeeded` and issues has no errors.
4. Fix errors, then let the hook rerun. Do not spam `./run.sh`.

Manual run: `.cursor/automations/xcode-ios-loop/run.sh`

Toggle: edit `.cursor/automations/xcode-ios-loop/.xcode-loop` (`on` or `off`).

Scheme name: auto-detected from your project and saved to `.cursor/automations/xcode-ios-loop/.scheme`. Override that file to pin a specific scheme.
