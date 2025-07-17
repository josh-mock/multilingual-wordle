import "./header.css";
import Instructions from "../Modals/Instructions/Instructions";
import { useState, useEffect } from "react";
import { useLang } from "../../contexts/LanguageContext";
import Controls from "../Controls/Controls";

export default function Header({ onPlayAgain, toggleKeyboard, showKeyboard }) {
  const [showInstructions, setShowInstructions] = useState(false);
  const [isControlsOpen, setIsControlsOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    document.title = t("document_title");
  }, [lang, t]);

  const handleCloseInstructions = () => {
    setShowInstructions(false);
  };

  return (
    <header className="header">
      <h1 className="header__title">{t("title")}</h1>

      <Controls
        onPlayAgain={onPlayAgain}
        setLang={setLang}
        toggleKeyboard={toggleKeyboard}
        showKeyboard={showKeyboard}
      />

      {showInstructions && <Instructions onClose={handleCloseInstructions} />}
    </header>
  );
}
