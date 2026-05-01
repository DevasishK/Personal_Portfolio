import { useEffect, useState } from 'react'
import { getTimeSegment } from '../utils/getTimeSegment.js'

export function useTimeSegment({ intervalMs = 300000 } = {}) {
  const [segment, setSegment] = useState(() => getTimeSegment())
  const [hour, setHour] = useState(() => new Date().getHours())

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setHour(now.getHours())
      setSegment(getTimeSegment(now))
    }
    update()
    const interval = window.setInterval(update, intervalMs)
    return () => window.clearInterval(interval)
  }, [intervalMs])

  return { segment, hour }
}

