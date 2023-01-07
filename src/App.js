import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { SocketProvider } from "./utilities/contexts/SocketContext";
//Context
import { RoomProvider } from "./context/roomContext";
//Pages
// import HomePage from "./pages/HomePage/HomePage";
import StartPage from "./pages/StartPage/StartPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import LandingPage from "./pages/LandingPage/LandingPage";

const App = () => {
  return (
    <BrowserRouter>
      <RoomProvider>
        {/* <SocketProvider> */}
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/landing-session/:id" element={<LandingPage />} />
          <Route path="*" element={<ErrorPage />} />
          {/* <Route path="/" element={<HomePage />} /> */}
          {/* <Route path="/session/:id" element={<HomePage />} /> */}
        </Routes>
        {/* </SocketProvider> */}
      </RoomProvider>
    </BrowserRouter>
  );
};

export default App;
