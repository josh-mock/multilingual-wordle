import { useLang } from "../../../contexts/LanguageContext";
import "./instructions.css";
import Modal from "../Modal/Modal";

export default function Instructions({ onClose }) {
  const { t } = useLang();
  return (
    <Modal>
      <div className="instructions__content">
        <h1 className="instructions__title">{t("how_to_play_modal_title")}</h1>
        <ul className="instructions__instructions">
          <li className="instructions__instruction">{t("instruction_1")}</li>
          <li className="instructions__instruction">{t("instruction_2")}</li>
          <ul className="instructions__instructions instructions__instructions--colors">
            <li>{t("instruction_green")}</li>
            <li>{t("instruction_yellow")}</li>
            <li>{t("instruction_grey")}</li>
          </ul>
          <li className="instructions__instruction">{t("instruction_3")}</li>
          <li className="instructions__instruction">{t("instruction_4")}</li>
        </ul>
        <button onClick={onClose}>{t("close")}</button>
      </div>
    </Modal>
  );
}
