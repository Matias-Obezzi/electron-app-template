import { createContext, useContext, useEffect, useState } from "react";
import { LoadingContext } from "./loadingContext";
import translator, { Lang, langs } from "@/dicts";

export type LanguageContextType = {
  lang: Lang;
  setLang: (lang: string) => void;
  translate: (...keys: string[]) => string;
}

export const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  translate: (...keys: string[]) => ""
});

export const LanguageContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { setLoading } = useContext(LoadingContext);
  const [lang, setLang] = useState<Lang>();

  useEffect(() => {
    setLoading(true);
    let tempLang = "en";
    if (langs.includes(localStorage.getItem("lang") as typeof langs[number])){
      tempLang = localStorage.getItem("lang") as typeof langs[number];
    } else if (langs.includes(navigator.language.split("-")[0] as typeof langs[number])) {
      tempLang = navigator.language.split("-")[0];
    }
    localStorage.setItem("lang", tempLang);
    setLang(tempLang as any);
    setLoading(false);
  }, [])

  const changeLang = (lang: string) => {
    if (langs.includes(lang as typeof langs[number])) {
      setLang(lang as typeof langs[number]);
      localStorage.setItem("lang", lang);
      window.location.reload();
    }
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, translate: translator(lang) }}>
      {lang && children}
    </LanguageContext.Provider>
  );
}