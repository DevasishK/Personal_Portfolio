import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import AmbientBackground from './components/AmbientBackground.jsx'
import Navbar from './components/Navbar.jsx'
import ScrollToTopOnNav from './components/ScrollToTopOnNav.jsx'
import { ModeProvider, useMode } from './context/ModeContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import Landing from './pages/Landing.jsx'
import Professional from './pages/Professional.jsx'
import Fun from './pages/Fun.jsx'

function AppRoutes() {
  const location = useLocation()
  const { mode } = useMode()

  return (
    <>
      <ScrollToTopOnNav />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={`${location.pathname}-${mode ?? 'unset'}`}>
          <Route path="/" element={<Landing />} />
          <Route path="/pro" element={<Professional />} />
          <Route path="/fun" element={<Fun />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

function App() {
  return (
    <ThemeProvider>
      <ModeProvider>
        <AmbientBackground>
          <div className="min-h-dvh">
            <Navbar />
            <AppRoutes />
          </div>
        </AmbientBackground>
      </ModeProvider>
    </ThemeProvider>
  )
}

export default App
