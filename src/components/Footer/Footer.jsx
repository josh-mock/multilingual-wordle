import "./footer.css";
import DOMPurify from "dompurify";
import { useLang } from "../../contexts/LanguageContext";

export default function Footer() {
  const { t } = useLang();
  const sanitizedFooter = DOMPurify.sanitize(t("footer"));

  return (
    <footer
      className="footer"
      dangerouslySetInnerHTML={{ __html: sanitizedFooter }}
    />
  );
}
