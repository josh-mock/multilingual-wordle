import { useEffect, useState } from "react";
import useWordlWide from "../hooks/useWordlWide";
import Keyboard from "./Keyboard/Keyboard";
import EndGameModal from "./Modals/EndGameModal/EndGameModal";
import ErrorModal from "./Modals/ErrorModal/ErrorModal";
import WordleGrid from "./WordleGrid/WordleGrid";
export default function Wordle({ solution, onPlayAgain, showKeyboard }) {
  const {
    currentGuess,
    guesses,
    turn,
    isCorrect,
    usedKeys,
    handleKeyup,
    error,
    setError,
  } = useWordlWide(solution);
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleCloseModal = () => {
    setShowErrorModal(false);
    setError(false);
  };

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }

    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }

    if (error) {
      setShowErrorModal(true);
    }

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup, isCorrect, turn]);

  return (
    <div>
      <WordleGrid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      {showKeyboard && (
        <Keyboard usedKeys={usedKeys} onKeyClick={handleKeyup} />
      )}
      {showModal && (
        <EndGameModal
          isCorrect={isCorrect}
          turn={turn}
          solution={solution}
          onPlayAgain={onPlayAgain}
        />
      )}
      {showErrorModal && (
        <ErrorModal error={error} onClose={() => handleCloseModal()} />
      )}
    </div>
  );
}
