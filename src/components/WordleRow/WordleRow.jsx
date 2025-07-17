import "./wordle-row.css";

export default function WordleRow({ guess, currentGuess }) {
  if (guess) {
    return (
      <div className="wordle-row wordle-row--past">
        {guess.map((l, i) => (
          <div
            key={i}
            className={`wordle-row__tile wordle-row__tile--${l.color}`}
          >
            {l.key}
          </div>
        ))}
      </div>
    );
  }

  if (currentGuess) {
    let letters = currentGuess.split("");

    return (
      <div className="wordle-row wordle-row--current">
        {letters.map((letter, i) => (
          <div key={i} className="wordle-row__tile wordle-row__tile--filled">
            {letter}
          </div>
        ))}
        {[...Array(5 - letters.length)].map((_, i) => (
          <div key={i} className="wordle-row__tile"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="wordle-row">
      <div className="wordle-row__tile"></div>
      <div className="wordle-row__tile"></div>
      <div className="wordle-row__tile"></div>
      <div className="wordle-row__tile"></div>
      <div className="wordle-row__tile"></div>
    </div>
  );
}
