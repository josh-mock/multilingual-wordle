import "./header.css";
import Instructions from "../Modals/Instructions/Instructions";
import { useState, useEffect } from "react";
import { useLang } from "../../contexts/LanguageContext";
import HeaderControls from "../Controls/HeaderControls/HeaderControls";
import DropdownControls from "../Controls/DropdownControls/DropdownControls";

export default function Header({ onPlayAgain, toggleKeyboard, showKeyboard }) {
  const [showInstructions, setShowInstructions] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    document.title = t("document_title");
  }, [lang, t]);

  const handleCloseInstructions = () => {
    setShowInstructions(false);
  };

  const handleCloseControls = () => {
    setShowControls(false);
  };

  return (
    <header className="header">
      <h1 className="header__title">{t("title")}</h1>
      <button
        className={`btn header__control-toggle`}
        onClick={() => setShowControls((prev) => !prev)}
      >
        {showControls ? t("hide_controls") : t("show_controls")}
      </button>
      <HeaderControls
        onPlayAgain={onPlayAgain}
        setLang={setLang}
        toggleKeyboard={toggleKeyboard}
        showKeyboard={showKeyboard}
        setShowInstructions={setShowInstructions}
      />
      {showControls && (
        <DropdownControls
          onPlayAgain={onPlayAgain}
          setLang={setLang}
          toggleKeyboard={toggleKeyboard}
          showKeyboard={showKeyboard}
          onClose={handleCloseControls}
          setShowInstructions={setShowInstructions}
        />
      )}
      {showInstructions && <Instructions onClose={handleCloseInstructions} />}
    </header>
  );
}
