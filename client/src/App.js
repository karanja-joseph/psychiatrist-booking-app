import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { Toaster } from "react-hot-toast";
import Log from './pages/Log';
import Reg from './pages/Reg';
import Home from './pages/Home';
import SecuredRoute from './components/SecuredRoute'
import PublicRoute from './components/publicRoute';
import Profile from './pages/Psychiatrist/Profile';
import BookAppointment from './pages/BookAppointments';
import Appointments from './pages/Appointments';
import PsychiatristAppointments from './pages/Psychiatrist/PsychiatristAppointments';
import Notifications from './pages/Notifications';
import UsersList from './pages/Admin/UsersList';
import PsychiatristList from './pages/Admin/PsychiatristList';
import ApplyPsychiatrist from './pages/ApplyPsychiatrist';



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
        <Route path='/apply-psychiatrist' element={<SecuredRoute><ApplyPsychiatrist /></SecuredRoute>} />
        <Route path='/notifications' element={<SecuredRoute><Notifications /></SecuredRoute>} />
        <Route path='/admin/userslist' element={<SecuredRoute><UsersList /></SecuredRoute>} />
        <Route path='/admin/psychiatristslist' element={<SecuredRoute><PsychiatristList /></SecuredRoute>} />
        <Route path='/psychiatrist/profile/:userId' element={<SecuredRoute><Profile /></SecuredRoute>} />
        <Route path='/book-appointment/:psychiatristId' element={<SecuredRoute><BookAppointment /></SecuredRoute>} />
        <Route path="/appointments" element={<SecuredRoute><Appointments /></SecuredRoute> } />
        <Route path="/psychiatrist/appointments" element={<SecuredRoute><PsychiatristAppointments /></SecuredRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
