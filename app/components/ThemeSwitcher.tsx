import React from "react";

import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
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
    <>
      <Listbox value={theme} onChange={(value) => setTheme(value)}>
        {({ open }) => {
          const iconClassName = clsx(
            "w-5 h-5 text-secondary hover:text-primary cursor-pointer transition-colors",
            open ? "text-primary" : "text-secondary",
          );
          return (
            <div className="relative">
              <Listbox.Button
                className={clsx(
                  "relative flex h-8 w-8 cursor-default items-center justify-center rounded-lg",
                )}
              >
                {resolvedTheme === "dark" ? (
                  <MoonIcon className={iconClassName} />
                ) : (
                  <SunIcon className={iconClassName} />
                )}
              </Listbox.Button>
              <AnimatePresence>
                {open && (
                  <Listbox.Options
                    as={motion.ul}
                    static
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", bounce: 0.3, duration: 0.3 }}
                    className="w-42 absolute right-0 z-10 mt-2 max-h-60 origin-top-right overflow-auto rounded-xl bg-contrast p-2 text-base capitalize shadow-md focus:outline-none sm:text-sm"
                  >
                    {themes.map((theme) => (
                      <Listbox.Option
                        key={theme}
                        className={({ active }) =>
                          clsx(
                            "relative cursor-default select-none rounded-md py-2 pl-10 pr-4",
                            active ? "bg-secondary" : "",
                          )
                        }
                        value={theme}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {theme == "system" ? "Automatic" : theme}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 dark:text-neutral-50">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                )}
              </AnimatePresence>
            </div>
          );
        }}
      </Listbox>
      {/* <Select.Root>
        <Select.Trigger
          className="relative flex focus:outline-none"
          aria-label="theme-switcher"
        >
          <Select.Icon>
            <MoonIcon className="h-5 w-5 cursor-pointer text-secondary transition-colors hover:text-primary" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            position="popper"
            sideOffset={16}
            align="end"
            className="w-42 z-20 origin-top-right overflow-auto rounded-xl bg-primary p-2 text-base capitalize shadow-lg focus:outline-none sm:text-sm"
          >
            <Select.Viewport>
              <Select.Group>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">Automatic</SelectItem>
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root> */}
    </>
  );
}

// const SelectItem = React.forwardRef(
//   ({ children, className, ...props }, forwardedRef) => {
//     return (
//       <Select.Item
//         className={clsx(
//           "relative cursor-default select-none rounded-md py-2 pl-10 pr-4 hover:bg-secondary focus:outline-none",
//           className,
//         )}
//         {...props}
//         ref={forwardedRef}
//       >
//         <Select.ItemText>{children}</Select.ItemText>
//         <Select.ItemIndicator className="absolute inset-y-0 left-0 flex items-center pl-3 dark:text-neutral-50">
//           <CheckIcon className="h-5 w-5" />
//         </Select.ItemIndicator>
//       </Select.Item>
//     );
//   },
// );
