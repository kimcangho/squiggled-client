import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SocketProvider } from "./utilities/contexts/SocketContext";
//Context
import { RoomProvider } from "./context/roomContext";

import HomePage from "./pages/HomePage/HomePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import { useEffect } from "react";

const App = () => {
  // useEffect(() => {
  //   socketIO(WS);
  //   console.log(WS);
  // }, [])

  return (
    <BrowserRouter>
      <RoomProvider>
        <SocketProvider>
          <Routes>
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/landing-session/:id" element={<LandingPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/session/:id" element={<HomePage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </SocketProvider>
      </RoomProvider>
    </BrowserRouter>
  );
};

export default App;
