import { createContext, useContext, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

export const MODES = /** @type {const} */ ({
  professional: 'professional',
  fun: 'fun',
})

const ModeContext = createContext(null)

export function ModeProvider({ children }) {
  const [mode, setMode] = useLocalStorage('site_mode', null)

  const value = useMemo(
    () => ({
      mode,
      setMode,
      isProfessional: mode === MODES.professional,
      isFun: mode === MODES.fun,
    }),
    [mode, setMode],
  )

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>
}

export function useMode() {
  const ctx = useContext(ModeContext)
  if (!ctx) throw new Error('useMode must be used within ModeProvider')
  return ctx
}

