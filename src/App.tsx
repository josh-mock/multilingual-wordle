import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WordleApp from "./WordleApp";
import { LanguageProvider } from "./contexts/LanguageContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <WordleApp />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
