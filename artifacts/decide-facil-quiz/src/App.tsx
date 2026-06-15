import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import QuizPage from "@/pages/QuizPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QuizPage />
    </QueryClientProvider>
  );
}

export default App;
