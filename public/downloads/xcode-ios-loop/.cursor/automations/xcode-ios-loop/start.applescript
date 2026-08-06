on run argv
  set schemeName to item 1 of argv
  set schemeAction to item 2 of argv
  set shouldActivate to item 3 of argv
  if schemeAction is missing value or schemeAction is "" then set schemeAction to "run"
  if shouldActivate is missing value or shouldActivate is "" then set shouldActivate to "0"

  tell application "__XCODE_APP__"
    if shouldActivate is "1" then activate
    repeat until (count of workspace documents) > 0
      delay 0.25
    end repeat
    repeat until (loaded of active workspace document)
      delay 0.25
    end repeat

    tell active workspace document
      repeat with s in schemes
        if name of s is schemeName then
          set active scheme to s
          exit repeat
        end if
      end repeat

      try
        set lastResult to last scheme action result
        if completed of lastResult is false then
          stop
          repeat 20 times
            delay 0.25
            if completed of last scheme action result then exit repeat
          end repeat
        end if
      end try

      if schemeAction is "build" then
        build
      else
        run
      end if

      return name of active scheme
    end tell
  end tell
end run
