import React, { CSSProperties, useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import ReactCountryFlag from "react-country-flag";
import { useLang } from "./LanguageProvider";

export default function LanguageSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { lang, setLang } = useLang();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const languages = [
    { code: "EN", name: "English", countryCode: "US" },
    { code: "FR", name: "Français", countryCode: "FR" },
  ];

  const handleLanguageChange = (newLang: string) => {
    setLang(newLang);

    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.startsWith('/blog/')) {
        const newPath = path.replace(/(EN|FR)$/, newLang);
        console.log(newPath);
        window.location.href = newPath;
      }
    }
  }

  const flagStyle: CSSProperties = {
    width: "1.5em",
    height: "1.5em",
    borderRadius: "50%",
    objectFit: "cover",
    overflow: "hidden",
    border: "1px solid #ddd",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
  };

  const currentLanguage =
    languages.find((langItem) => langItem.code === lang) || languages[0];

  return (
    <>
      <Listbox value={lang} onChange={handleLanguageChange}>
        {({ open }) => (
          <div className="relative">
            <Listbox.Button className="relative w-8 h-8 cursor-default rounded-full flex items-center justify-center focus:outline-none">
              <ReactCountryFlag
                countryCode={currentLanguage.countryCode}
                svg
                style={flagStyle}
              />
            </Listbox.Button>
            <AnimatePresence>
              {open && (
                <Listbox.Options
                  as={motion.ul}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", bounce: 0.3, duration: 0.3 }}
                  className="absolute right-0 p-2 mt-2 overflow-auto text-base origin-top-right shadow-lg max-h-60 w-42 rounded-xl bg-white dark:bg-black focus:outline-none sm:text-sm capitalize"
                >
                  {languages.map((langItem) => (
                    <Listbox.Option
                      key={langItem.code}
                      className={({ active }) =>
                        clsx(
                          "relative cursor-default select-none py-2 pl-10 pr-4 rounded-md",
                          active ? "bg-tertiary" : ""
                        )
                      }
                      value={langItem.code}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {langItem.name}
                          </span>
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <ReactCountryFlag
                              countryCode={langItem.countryCode}
                              svg
                              style={{
                                width: "1em",
                                height: "1em",
                              }}
                            />
                          </span>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              )}
            </AnimatePresence>
          </div>
        )}
      </Listbox>
    </>
  );
}