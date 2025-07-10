import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router.jsx'
import AuthProvider from './context/AuthProvider.jsx'
import 'animate.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import EnrollmentProvider from './context/EnrollmentProvider.jsx'
import ThemeProvider from './context/ThemeProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <EnrollmentProvider>
        <ThemeProvider>
          <RouterProvider router={router}></RouterProvider>
        </ThemeProvider>
      </EnrollmentProvider>
    </AuthProvider>
  </StrictMode>,
)
