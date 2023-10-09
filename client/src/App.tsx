import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "./Snackbar";
import FormRoute from "./Routes/FormRoute";
import TableRoute from "./Routes/TableRoute";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <div>
      <BrowserRouter>
        <SnackbarProvider>
          <Routes>
            <Route path="/" element={<FormRoute />} />
            <Route path="/scoreboard" element={<TableRoute />} />
          </Routes>
        </SnackbarProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
