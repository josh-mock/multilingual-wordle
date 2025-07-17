import { useLang } from "../../contexts/LanguageContext";

export default function Controls({
  displayType,
  onPlayAgain,
  setLang,
  toggleKeyboard,
  showKeyboard,
}) {
  const { t, lang } = useLang();
  return (
    <div className={`${displayType}-controls`}>
      <button
        className={`btn ${displayType}-controls__button ${displayType}-controls__button--${lang}`}
        onClick={onPlayAgain}
      >
        {t("new_game")}
      </button>
      <button
        className={`btn ${displayType}-controls__button ${displayType}-controls__button--${lang}`}
        onClick={() => setShowInstructions(true)}
      >
        {t("how_to_play")}
      </button>
      <button
        className={`btn ${displayType}-controls__button ${displayType}-controls__button--${lang}`}
        onClick={toggleKeyboard}
      >
        {showKeyboard ? t("hide_keyboard") : t("show_keyboard")}
      </button>
      <select
        className={`btn ${displayType}-controls__select ${displayType}-controls__select--${lang}`}
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
  );
}
