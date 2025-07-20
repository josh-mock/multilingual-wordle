import { useState } from "react";
import { useLang } from "../contexts/LanguageContext";
import { SupportedLang } from "../translations";

type LetterColor = "absent" | "present" | "correct";

interface LetterGuess {
  key: string;
  color: LetterColor;
}

const isGuessValid = async (
  guessedWord: string,
  lang: SupportedLang
): Promise<boolean> => {
  try {
    const response = await fetch(
      `https://freedictionaryapi.com/api/v1/entries/${lang}/${guessedWord}`
    );

    if (!response.ok) {
      return false;
    }

    const data = await response.json();

    // Check that 'entries' exists and is a non-empty array
    return Array.isArray(data.entries) && data.entries.length > 0;
  } catch (error) {
    // Network error or invalid JSON, treat as invalid
    return false;
  }
};

const useWordle = (solution: string) => {
  const [turn, setTurn] = useState<number>(0);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [guesses, setGuesses] = useState([...Array(6)]); // each guess is an array
  const [history, setHistory] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [usedKeys, setUsedKeys] = useState({}); // {a: 'absent', b: 'correct', c: 'present'} etc
  const [error, setError] = useState<string | null>(null);
  const { t, lang } = useLang();

  // format a guess into an array of letter objects
  // e.g. [{key: 'a', color: 'yellow'}]
  const formatGuess = () => {
    let solutionArray: (string | null)[] = [...solution];
    let formattedGuess: LetterGuess[] = [...currentGuess].map((l) => ({
      key: l,
      color: "absent",
    }));

    // find any correct letters
    formattedGuess.forEach((l, i) => {
      if (solution[i] === l.key) {
        formattedGuess[i].color = "correct";
        solutionArray[i] = null;
      }
    });

    // find any yellow letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== "correct") {
        formattedGuess[i].color = "present";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (formattedGuess: LetterGuess[]) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });
    setUsedKeys((prevUsedKeys) => {
      formattedGuess.forEach((l) => {
        const currentColor = prevUsedKeys[l.key];

        if (l.color === "correct") {
          prevUsedKeys[l.key] = "correct";
          return;
        }
        if (l.color === "present" && currentColor !== "correct") {
          prevUsedKeys[l.key] = "present";
          return;
        }
        if (
          l.color === "absent" &&
          currentColor !== "correct" &&
          currentColor !== "present"
        ) {
          prevUsedKeys[l.key] = "absent";
          return;
        }
      });

      return prevUsedKeys;
    });
    setCurrentGuess("");
  };

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyup = async ({ key }) => {
    if (key === "Enter") {
      if (turn > 5) {
        return;
      }

      if (history.includes(currentGuess)) {
        setError(t("duplicate_word_error"));
        return;
      }

      if (currentGuess.length !== 5) {
        setError(t("incorrect_length_error"));
        return;
      }

      if (lang === "en" || lang === "de" || lang === "es" || lang === "fr") {
        const isValid = await isGuessValid(currentGuess, lang);
        if (!isValid) {
          setError(t("invalid_word"));
          return;
        }
      }

      const formatted = formatGuess();
      addNewGuess(formatted);
      return;
    }

    if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }

    const langRegexMap = {
      en: /^[a-zA-Z]$/,
      fr: /^[a-zA-Zàâçéèêëîïôùûü]$/,
      de: /^[a-zA-Zäöüß]$/,
      ar: /^[\u0621-\u063A\u0641-\u064A]$/,
      fa: /^[\u0621-\u063A\u0641-\u064A\u067E-\u0686\u0698-\u06AF\u06CC]$/,
      es: /^[a-zA-Zñáéíóú]$/,
    };

    const validCharRegex = langRegexMap[lang] || /^[a-zA-Z]$/;

    if (validCharRegex.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      }
    }
  };

  return {
    turn,
    currentGuess,
    guesses,
    isCorrect,
    usedKeys,
    handleKeyup,
    error,
    setError,
  };
};

export default useWordle;
