export function getTimeSegment(date = new Date()) {
  const hour = date.getHours()
  if (hour >= 5 && hour < 10) return 'morning'
  if (hour >= 10 && hour < 16) return 'midday'
  if (hour >= 16 && hour < 19) return 'evening'
  return 'night'
}

