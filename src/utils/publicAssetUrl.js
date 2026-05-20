/** Absolute URL for a file in `public/` (works from any route, e.g. `/pro`). */
export function resolvePublicAssetUrl(path) {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  const base = import.meta.env.BASE_URL || '/'
  const normalized = path.startsWith('/') ? path : `/${path}`
  const joined = `${base.replace(/\/$/, '')}${normalized}`.replace(/\/{2,}/g, '/')
  if (typeof window === 'undefined') return joined
  return new URL(joined, window.location.origin).href
}
