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
        className={`${displayType}-controls__button`}
        onClick={onPlayAgain}
      >
        {t("new_game")}
      </button>
      <button
        className={`${displayType}-controls__button`}
        onClick={() => setShowInstructions(true)}
      >
        {t("how_to_play")}
      </button>
      <button
        className={`${displayType}-controls__button`}
        onClick={toggleKeyboard}
      >
        {showKeyboard ? t("hide_keyboard") : t("show_keyboard")}
      </button>
      <select
        className={`${displayType}-controls__select`}
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
