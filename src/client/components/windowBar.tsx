import { MouseEventHandler, useContext, useEffect, useState } from "react"
import { LanguageContext } from "@/client/contexts/languageContext"
import { FaMinus as Minimize, FaTimes as Close } from "react-icons/fa";
import { FiMinimize as Unmaximize, FiMaximize2 as Maximize } from "react-icons/fi";
import icon from "@/assets/icon.png"

export default function WindowBar() {
  const { translate } = useContext(LanguageContext)
  const [full, setFull] = useState(false);

  useEffect(() => {
    if (screen.width === window.outerWidth) {
      setFull(true)
    }
    window.addEventListener("resize", () => {
      if (screen.width === window.outerWidth) {
        setFull(true)
      } else {
        setFull(false)
      }
    })
  }, [])

  return (
    <nav className="flex flex-row justify-between appbar h-10 sticky top-0 w-full bg-slate-200 text-black/80 dark:bg-slate-900 dark:text-white/80 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="flex flex-row flex-nowrap px-3 items-center justify-center absolute left-0 h-full">
        <img src={icon} alt="icon" className="size-5" />
        <h1 className="ml-2 mr-1">{translate("title")}</h1>
      </div>
      <div className="flex flex-row flex-nowrap absolute right-0 h-full">
        <BarButton onClick={() => window.api.send("window:minimize")}>
          <Minimize />
        </BarButton>
        <BarButton onClick={() => window.api.send(full ? "window:unmaximize" : "window:maximize")}>
          {full ? 
            <Unmaximize /> :
            <Maximize />}
        </BarButton>
        <BarButton onClick={() => window.api.send("window:close")}>
          <Close />
        </BarButton>
      </div>
    </nav>
  )
}

const BarButton = ({ children, onClick } : { children: React.ReactNode, onClick: MouseEventHandler<HTMLButtonElement> }) => {
  return (
    <button className="h-full py-2 px-3 flex items-center justify-center hover:bg-black/20 transition-all" onClick={onClick}>
      {children}
    </button>
  )
} 