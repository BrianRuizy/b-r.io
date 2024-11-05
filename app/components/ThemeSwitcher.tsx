import React from "react";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

import * as Select from "@radix-ui/react-select";

import { MoonIcon, CheckIcon } from "@heroicons/react/20/solid";
import { SunIcon } from "@heroicons/react/24/outline";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme, themes } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Select.Root value={theme} onValueChange={setTheme}>
      <Select.Trigger
        className="relative flex h-8 w-8 cursor-default items-center justify-center rounded-lg"
        aria-label="Theme"
      >
        <Select.Value>
          {resolvedTheme === "dark" ? (
            <MoonIcon
              className={clsx(
                "h-5 w-5 cursor-pointer text-secondary transition-colors hover:text-primary",
                "data-[state=open]:text-primary",
              )}
            />
          ) : (
            <SunIcon
              className={clsx(
                "h-5 w-5 cursor-pointer text-secondary transition-colors hover:text-primary",
                "data-[state=open]:text-primary",
              )}
            />
          )}
        </Select.Value>
      </Select.Trigger>

      <AnimatePresence>
        <Select.Portal>
          <Select.Content asChild position="popper" side="bottom" align="end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.3 }}
              className="absolute right-0 z-10 mt-2 max-h-60 w-36 origin-top-right overflow-auto rounded-xl bg-contrast p-2 text-base capitalize shadow-md focus:outline-none dark:bg-black sm:text-sm"
            >
              <Select.Viewport>
                {themes.map((themeOption) => (
                  <Select.Item
                    key={themeOption}
                    value={themeOption}
                    className={clsx(
                      "relative flex cursor-default select-none items-center justify-between gap-2 rounded-md px-4 py-2",
                      "focus:outline-none",
                      "data-[highlighted]:bg-secondary",
                    )}
                  >
                    <Select.ItemText className="truncate">
                      {themeOption === "system" ? "System" : themeOption}
                    </Select.ItemText>
                    <Select.ItemIndicator>
                      <CheckIcon
                        className="h-5 w-5 dark:text-neutral-50"
                        aria-hidden="true"
                      />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </motion.div>
          </Select.Content>
        </Select.Portal>
      </AnimatePresence>
    </Select.Root>
  );
}
