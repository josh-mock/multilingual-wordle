import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import WordlWide from "./components/Wordle";
import Header from "./components/Header/Header";
import { useLang } from "./contexts/LanguageContext";
import words from "./words";
import Loading from "./components/Loading/Loading";
import ErrorScreen from "./components/ErrorScreen/ErrorScreen";
import Footer from "./components/Footer/Footer";

// Function to fetch the solution word
const fetchSolution = async (lang: string): Promise<string> => {
  if (lang === "en") {
    const response = await fetch(
      `https://random-word-api.vercel.app/api?words=1&length=5`
    );
    const data = await response.json();
    return data[0];
  } else {
    const dict = words[lang];
    if (!dict || dict.length === 0) {
      throw new Error(`No words found for language: ${lang}`);
    }
    const randomIndex = Math.floor(Math.random() * dict.length);
    return dict[randomIndex];
  }
};

export default function WordleApp() {
  const { lang, t } = useLang();

  const {
    data: solution,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["solution", lang],
    queryFn: () => fetchSolution(lang),
    refetchOnWindowFocus: false,
  });

  console.log(solution);

  const [showKeyboard, setShowKeyboard] = useState(true);
  const toggleKeyboard = () => setShowKeyboard((prev) => !prev);
  const [gameKey, setGameKey] = useState(0);

  const handlePlayAgain = async () => {
    await refetch();
    setGameKey((k) => k + 1);
  };

  if (isLoading || isFetching) return <Loading />;
  if (isError) return <ErrorScreen />;

  return (
    <div className="container">
      <Header
        onPlayAgain={handlePlayAgain}
        toggleKeyboard={toggleKeyboard}
        showKeyboard={showKeyboard}
      />
      {solution && (
        <WordlWide
          key={gameKey}
          solution={solution}
          onPlayAgain={handlePlayAgain}
          showKeyboard={showKeyboard}
        />
      )}
      <Footer />
    </div>
  );
}
