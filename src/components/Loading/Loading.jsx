import "./loading.css";
import { ThreeDot } from "react-loading-indicators";
import { useLang } from "../../contexts/LanguageContext";

export default function Loading() {
  const { t } = useLang();

  return (
    <div className="loading container">
      <ThreeDot
        color="hsla(0, 0%, 20%)"
        size="large"
        text={t("loading")}
        textColor="hsla(0, 0%, 20%)"
      />
    </div>
  );
}
