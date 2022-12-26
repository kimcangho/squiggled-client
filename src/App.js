import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SocketProvider } from "./utilities/contexts/SocketContext";

import HomePage from "./pages/HomePage/HomePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import LandingPage from "./pages/LandingPage/LandingPage";

const App = () => {
  return (
    <BrowserRouter>
      <SocketProvider>
        <Routes>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/session/:id" element={<HomePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </SocketProvider>
    </BrowserRouter>
  );
};

export default App;
