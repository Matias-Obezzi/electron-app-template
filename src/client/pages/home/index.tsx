import { useContext } from "react";
import { ModalContext } from "@/client/contexts/modalContext";
import { LanguageContext } from "@/client/contexts/languageContext";

export default function Home() {
  const { open, close } = useContext(ModalContext)
  const { translate } = useContext(LanguageContext)

  const openModal = () => {
    open(<div className="flex flex-row flex-nowrap justify-between items-center gap-2">
      <button className="p-2 bg-blue-500 text-white rounded" onClick={() => open(<div>Another modal</div>)}>{translate("common","open") + " modal"}</button>
      <button className="p-2 bg-red-500 text-white rounded" onClick={() => close()}>{translate("common","close") + " modal"}</button>
    </div>, {
      modalClass: "w-full"
    })
  }
  return (
    <div>
      <h1>Home page</h1>
      <button onClick={openModal}>{translate("common","open") + " modal"}</button>
    </div>
  );
}