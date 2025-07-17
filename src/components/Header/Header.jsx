import "./header.css";
import Instructions from "../Modals/Instructions/Instructions";
import { useState, useEffect } from "react";
import { useLang } from "../../contexts/LanguageContext";

export default function Header({ onPlayAgain, togglekeyboard, showkeyboard }) {
  const [showInstructions, setShowInstructions] = useState(false);
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

      <div className="header__controls">
        <button className="header__button" onClick={onPlayAgain}>
          {t("new_game")}
        </button>
        <button
          className="header__button"
          onClick={() => setShowInstructions(true)}
        >
          {t("how_to_play")}
        </button>
        <button className="header__button" onClick={togglekeyboard}>
          {showkeyboard ? t("hide_keyboard") : t("show_keyboard")}
        </button>
        <select
          className="header__select"
          value={lang}
          onChange={(e) => {
            setLang(e.target.value);
            onPlayAgain();
          }}
        >
          <option value="en">🇬🇧 EN</option>
          <option value="ar">🇸🇦 AR</option>
          <option value="de">🇩🇪 DE</option>
          <option value="es">🇪🇸 ES</option>
          <option value="fa">🇮🇷 FA</option>
          <option value="fr">🇫🇷 FR</option>
        </select>
      </div>

      {showInstructions && <Instructions onClose={handleCloseInstructions} />}
    </header>
  );
}
