import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import SessionPage from './pages/SessionPage/SessionPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/session/:id' element={<SessionPage />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App