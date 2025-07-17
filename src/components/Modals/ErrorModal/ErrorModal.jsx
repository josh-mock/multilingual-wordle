import "./error-modal.css";
import { useLang } from "../../../contexts/LanguageContext";
import Modal from "../Modal/Modal";

export default function ErrorModal({ error, onClose }) {
  const { t } = useLang();
  return (
    <Modal>
      <div className="error-modal__content">
        <h1 className="error-modal__title">{t("oops")}</h1>
        <p className="error-modal__error-text">{error}</p>
        <button className="btn" onClick={onClose}>
          {t("close")}
        </button>
      </div>
    </Modal>
  );
}
