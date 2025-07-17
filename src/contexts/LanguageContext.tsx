// LanguageContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { SupportedLang } from "../translations";
import { translations } from "../translations";

type LangContextType = {
  lang: SupportedLang;
  setLang: (lang: SupportedLang) => void;
  t: (key: keyof (typeof translations)["en"]) => string;
};

const LanguageContext = createContext<LangContextType | undefined>(undefined);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [lang, setLang] = useState<SupportedLang>(() => {
    return (localStorage.getItem("lang") as SupportedLang) || "en";
  });

  const directionMap: Record<SupportedLang, "ltr" | "rtl"> = {
    en: "ltr",
    ar: "rtl",
    de: "ltr",
    fr: "ltr",
    es: "ltr",
    fa: "rtl",
  };

  const changeLang = (newLang: SupportedLang) => {
    localStorage.setItem("lang", newLang);
    setLang(newLang);
    document.documentElement.setAttribute("dir", directionMap[newLang]);
  };

  useEffect(() => {
    document.documentElement.setAttribute("dir", directionMap[lang]);
  }, [lang]);

  const t = (key: keyof (typeof translations)["en"]) => translations[lang][key];

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLang must be used inside LanguageProvider");
  return context;
};
