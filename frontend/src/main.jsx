import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './home/index.jsx'
import Dashboard from './dashboard/index.jsx'
import EditResume from './dashboard/resume/[resumeId]/edit/index.jsx'
import LoginPopup from './components/LoginPopup/LoginPopup.jsx'
import StoreContextProvider from './Context/StoreContext.jsx'

// const router = createBrowserRouter([
//   {
//     element: <App />,
//     children: [
//       {
//         path: '/',
//         element: <Home />
//       },
//       {
//         path: '/dashboard',
//         element: <Dashboard />
//       },
//       {
//         path: '/dashboard/resume/:resumeId/edit',
//         element: <EditResume />
//       },
//       {
//         path: "/sign-in",
//         element: <LoginPopup />
//       }
//     ]
//   }
// ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <StoreContextProvider>
    <BrowserRouter>

      <App />
    </BrowserRouter>

  </StoreContextProvider>
)
