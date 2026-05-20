import { profile } from './profile.ts'

/** Preferred production host (canonical, sitemap, OG). */
export const SITE_ORIGIN = 'https://www.devasishkolla.in' as const

export const OG_IMAGE_PATH = '/og-image.jpg' as const
export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630

export function absoluteUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`
  return `${SITE_ORIGIN}${p}`
}

export const ogImageUrl = absoluteUrl(OG_IMAGE_PATH)

export const defaultTitle = 'Devasish Viswanadh Kolla | Portfolio'

export const metaKeywords = [
  'Devasish Kolla',
  'Devasish Viswanadh Kolla',
  'devasishkolla.in',
  'portfolio',
  'full stack developer',
  'full-stack developer',
  'software engineer',
  'AI',
  'ML',
  'machine learning',
  'web developer',
  'cybersecurity',
].join(', ')

export const metaAuthor = profile.name

/** Default / gateway description (also used as fallback). */
export const defaultDescription =
  'Portfolio of Devasish Viswanadh Kolla (Devasish Kolla) — full-stack software engineer focused on secure, scalable systems, AI/ML, and cybersecurity. Explore professional work or the fun side at devasishkolla.in.'

export const descriptionByPath: Record<string, string> = {
  '/': defaultDescription,
  '/pro':
    'Professional portfolio of Devasish Viswanadh Kolla — projects, experience, skills in full-stack development, AI/ML, and cybersecurity, plus resume and contact.',
  '/fun':
    'Fun side of Devasish Viswanadh Kolla’s portfolio — personality, gallery, and interactive experiences at devasishkolla.in.',
}

export const titleByPath: Record<string, string> = {
  '/': defaultTitle,
  '/pro': 'Devasish Viswanadh Kolla | Professional',
  '/fun': 'Devasish Viswanadh Kolla | Fun',
}

export function seoForPathname(pathname: string): {
  title: string
  description: string
  canonical: string
  path: string
} {
  const raw = pathname === '' ? '/' : pathname
  const path = raw.startsWith('/') ? raw : `/${raw}`
  const known = path in titleByPath
  return {
    title: known ? titleByPath[path] : defaultTitle,
    description: known ? descriptionByPath[path] : defaultDescription,
    canonical: absoluteUrl(path === '/' ? '/' : path),
    path,
  }
}

export const ogLocale = 'en_IN'
