import { useLang } from "../../contexts/LanguageContext";
import "./error-screen.css";

export default function ErrorScreen() {
  const { t } = useLang();
  return (
    <div className="error-screen container">
      <h1 className="error-screen__text">{t("error_fetching_solution")}</h1>
    </div>
  );
}
