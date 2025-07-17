import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WordlWideApp from "./WordlWideApp";
import { LanguageProvider } from "./contexts/LanguageContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <WordlWideApp />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
