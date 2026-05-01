import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useMode } from '../context/ModeContext.jsx'

export default function ScrollToTopOnNav() {
  const location = useLocation()
  const { mode } = useMode()

  useEffect(() => {
    // Instant, always. No smooth scroll, no preservation.
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname, mode])

  return null
}

