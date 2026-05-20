import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import AmbientBackground from './components/AmbientBackground.jsx'
import JsonLdPerson from './components/JsonLdPerson.jsx'
import Navbar from './components/Navbar.jsx'
import ScrollToTopOnNav from './components/ScrollToTopOnNav.jsx'
import SeoHead from './components/SeoHead.jsx'
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
      <SeoHead />
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
        <JsonLdPerson />
        <a
          href="#main-content"
          className="fixed left-[-9999px] top-4 z-[100] whitespace-nowrap rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-lg outline-none ring-2 ring-white/30 focus:left-4 dark:bg-white dark:text-zinc-900 dark:ring-zinc-900/30"
        >
          Skip to main content
        </a>
        <AmbientBackground>
          <div className="min-h-dvh">
            <Navbar />
            <main id="main-content" className="outline-none" tabIndex={-1}>
              <AppRoutes />
            </main>
          </div>
        </AmbientBackground>
      </ModeProvider>
    </ThemeProvider>
  )
}

export default App
