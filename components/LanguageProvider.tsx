"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FunctionComponent,
} from "react";

// Context type
type LangContextType = {
  lang: string;
  setLang: (lang: string) => void;
};

// Default context
const LangContext = createContext<LangContextType>({
  lang: "FR",
  setLang: () => {},
});

// Custom hook to get selected language
export const useLang = () => useContext(LangContext);

export const LangProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [lang, setLang] = useState("FR"); // Default language

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
};
