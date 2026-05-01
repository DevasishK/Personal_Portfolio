import { useEffect, useMemo, useState } from 'react'

function getReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getLiteEffectsHeuristic() {
  if (typeof navigator === 'undefined') return false
  const dm = navigator.deviceMemory
  const hc = navigator.hardwareConcurrency
  // Heuristic: <=4GB RAM or <=4 cores tends to struggle with heavy blur + multiple animations.
  return (typeof dm === 'number' && dm <= 4) || (typeof hc === 'number' && hc <= 4)
}

export function usePerformancePrefs() {
  const [reducedMotion, setReducedMotion] = useState(getReducedMotion)
  const [liteEffects, setLiteEffects] = useState(() => getReducedMotion() || getLiteEffectsHeuristic())

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')

    function onChange() {
      const rm = mq.matches
      setReducedMotion(rm)
      setLiteEffects(rm || getLiteEffectsHeuristic())
    }

    onChange()
    // Safari fallback: addListener/removeListener
    if (mq.addEventListener) mq.addEventListener('change', onChange)
    else mq.addListener(onChange)

    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange)
      else mq.removeListener(onChange)
    }
  }, [])

  return useMemo(
    () => ({
      reducedMotion,
      liteEffects,
    }),
    [reducedMotion, liteEffects],
  )
}

