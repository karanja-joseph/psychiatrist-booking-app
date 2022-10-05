import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import Log from './pages/Log';
import Reg from './pages/Reg';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path='/login' element={<Log />} />
        <Route path='/register' element={<Reg />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
