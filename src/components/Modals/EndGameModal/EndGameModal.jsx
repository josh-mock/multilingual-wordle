import IntlMessageFormat from "intl-messageformat";
import { useLang } from "../../../contexts/LanguageContext";
import "./end-game-modal.css";
import Modal from "../Modal/Modal";

export default function EndGameModal({
  isCorrect,
  turn,
  solution,
  onPlayAgain,
}) {
  const { t, lang } = useLang();

  const foundSolutionMsg = new IntlMessageFormat(t("found_solution"), lang);
  const formattedFoundSolution = foundSolutionMsg.format({ turn });

  return (
    <Modal>
      {isCorrect ? (
        <div className="end-game__content">
          <h1 className="end-game__title">{t("end_game_modal_title_win")}</h1>
          <p className="end-game__body end-game__body--solution">{solution}</p>
          <p className="end-game__body">{formattedFoundSolution}</p>
          <button onClick={onPlayAgain}>{t("new_game")}</button>
        </div>
      ) : (
        <div className="end-game__content">
          <h1 className="end-game__title">{t("end_game_modal_title_lose")}</h1>
          <p className="end-game__body">{t("the_word_was")}</p>
          <p className="end-game__body end-game__body--solution">{solution}</p>
          <button onClick={onPlayAgain}>{t("new_game")}</button>
        </div>
      )}
    </Modal>
  );
}
