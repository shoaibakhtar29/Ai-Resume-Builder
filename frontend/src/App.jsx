import React, { useContext, useEffect } from 'react'
import './App.css'
import Header from './components/custom/Header'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Home from './home/index'
import Dashboard from './dashboard/index'
import EditResume from './dashboard/resume/[resumeId]/edit/index'
import { Navigate, Route, Routes } from 'react-router-dom'
import ViewResume from './my-resume/[resumeId]/view'
import { StoreContext } from './Context/StoreContext'
import PrivateRoute from './PrivateRoute'
import Footer from './components/custom/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const { token, setToken } = useContext(StoreContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);
  return (
    <>
      <ToastContainer />
      <Header />
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path='/dashboard/resume/:resumeId/edit' element={<EditResume />} />
        <Route path='/sign-in' element={<LoginPopup />} />
        <Route path='/my-resume/:resumeId/view' element={<ViewResume />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
