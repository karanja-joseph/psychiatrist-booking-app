import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { Toaster } from "react-hot-toast";
import Log from './pages/Log';
import Reg from './pages/Reg';
import Home from './pages/Home';
import SecuredRoute from './components/SecuredRoute'
import PublicRoute from './components/publicRoute';


function App() {

  const { loading } = useSelector(state => state.alerts)

  return (
    <BrowserRouter>
      {loading && <div className='spinner-parent'>
        <div className="spinner-grow" role="status">

        </div>
      </div>}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path='/' element={<SecuredRoute><Home /></SecuredRoute>} />
        <Route path='/login' element={<PublicRoute><Log /></PublicRoute>} />
        <Route path='/register' element={<PublicRoute><Reg /></PublicRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
