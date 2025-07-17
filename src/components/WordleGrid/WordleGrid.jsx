import WordleRow from "../WordleRow/WordleRow";
import "./wordle-grid.css";
export default function WordleGrid({ guesses, currentGuess, turn }) {
  return (
    <div className="wordle-grid">
      {guesses.map((g, i) => {
        if (turn === i) {
          return <WordleRow key={i} currentGuess={currentGuess} />;
        }
        return <WordleRow key={i} guess={g} />;
      })}
    </div>
  );
}
