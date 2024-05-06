import { createContext, useContext, useState } from "react";
import { LanguageContext } from "./languageContext";

export type BarContextType = {
  title: string;
  setTitle: (title: string) => void
}

export const BarContext = createContext<BarContextType>({
  title: "",
  setTitle: () => {}
})

export const BarContextProvider = ({ children } : { children: React.ReactNode }) => {
  const { translate } = useContext(LanguageContext);
  const [title, setTitle] = useState(translate("title"));

  return (
    <BarContext.Provider value={{title, setTitle}}>
      {children}
    </BarContext.Provider>
  )
}