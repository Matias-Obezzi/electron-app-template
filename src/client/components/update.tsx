import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../contexts/languageContext";
import { ModalContext } from "../contexts/modalContext";
import { LoadingContext } from "../contexts/loadingContext";

export default function Update() {
  const { open } = useContext(ModalContext);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    window.api.receive("update:available", () => setUpdateAvailable(true));
  }, [])

  useEffect(() => {
    if (updateAvailable) {
      open(<UpdateAvailable />);
    }
  }, [updateAvailable])

  return null as any;
}

function UpdateAvailable() {
  const { translate } = useContext(LanguageContext);
  const { setLoading } = useContext(LoadingContext);
  const [canInstall, setCanInstall] = useState(false);
  const [wantInstall, setWantInstall] = useState(false);

  useEffect(() => {
    if (canInstall && wantInstall) {
      window.api.send("update:install");
    }
  }, [canInstall, wantInstall])

  useEffect(() => {
    window.api.receive("update:downloaded", () => setCanInstall(true));
  }, [])

  function update() {
    setWantInstall(true)
    setLoading(true);
  }

  return <>
    <h1>{translate("update", "title")}</h1>
    <p>{translate("update", "message")}</p>
    <button onClick={update}>{translate("update", "button")}</button>
  </>
}