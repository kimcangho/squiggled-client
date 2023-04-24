import { BrowserRouter, Routes, Route} from "react-router-dom";

import { RoomProvider } from "./context/roomContext";

import StartPage from "./pages/StartPage/StartPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import SetupPage from "./pages/SetupPage/SetupPage";

const App = () => {

  return (
    <BrowserRouter>
      <RoomProvider>a
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/join/" element={<StartPage />} />
          <Route path="/join/:id" element={<StartPage />} />
          <Route path="/setup" element={<SetupPage />} />
          <Route path="/session/:id" element={<SetupPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </RoomProvider>
    </BrowserRouter>
  );
};

export default App;
