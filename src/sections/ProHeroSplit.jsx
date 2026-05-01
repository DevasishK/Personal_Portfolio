import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { ArrowDownRight } from 'lucide-react'
import { profile } from '../profile.ts'

function IconGitHub(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.73.5.75 5.62.75 12c0 5.1 3.14 9.42 7.5 10.95.55.1.75-.25.75-.55v-2.1c-3.05.68-3.7-1.34-3.7-1.34-.5-1.3-1.22-1.65-1.22-1.65-1-.7.08-.69.08-.69 1.1.08 1.68 1.18 1.68 1.18.98 1.74 2.56 1.24 3.18.95.1-.73.38-1.24.7-1.52-2.44-.29-5-1.25-5-5.57 0-1.23.42-2.24 1.1-3.03-.1-.29-.48-1.48.1-3.08 0 0 .9-.3 2.95 1.16.86-.25 1.78-.38 2.7-.38.92 0 1.85.13 2.7.38 2.05-1.46 2.95-1.16 2.95-1.16.58 1.6.2 2.79.1 3.08.68.79 1.1 1.8 1.1 3.03 0 4.33-2.57 5.28-5.02 5.56.4.36.75 1.08.75 2.18v3.23c0 .3.2.66.76.55 4.35-1.53 7.49-5.85 7.49-10.95C23.25 5.62 18.27.5 12 .5z" />
    </svg>
  )
}

function IconLinkedIn(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.98 3.5C3.88 3.5 3 4.4 3 5.5S3.88 7.5 4.98 7.5c1.1 0 2-.9 2-2s-.9-2-2-2zM3.5 21h2.98V9H3.5v12zM9 9h2.86v1.64h.04c.4-.76 1.38-1.56 2.84-1.56C18 9.08 19 11.1 19 14.02V21h-2.98v-6.17c0-1.47-.03-3.36-2.05-3.36-2.06 0-2.38 1.6-2.38 3.26V21H9V9z" />
    </svg>
  )
}

function IconInstagram(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9z" />
      <path d="M12 7.2A4.8 4.8 0 1 1 7.2 12 4.8 4.8 0 0 1 12 7.2zm0 2A2.8 2.8 0 1 0 14.8 12 2.8 2.8 0 0 0 12 9.2z" />
      <path d="M17.5 6.4a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1z" />
    </svg>
  )
}

function IconLeetCode(props) {
  // Minimal LeetCode-style mark (not a logo-perfect replica).
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M9.2 6.8 7 9a5 5 0 0 0 0 7.07l.9.9a5 5 0 0 0 7.07 0l2.2-2.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M10 12h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default function ProHeroSplit({ onPlayVideo, onPreviewResume }) {
  const [imgOk, setImgOk] = useState(true)

  const imageUrl = useMemo(() => {
    // Prefer profile-provided URL when available, otherwise default to /profile.jpg
    // (safe fallback: if it 404s, we render a neutral block instead)
    return profile?.hero?.profileImageUrl || '/profile.jpg'
  }, [])

  return (
    <section className="w-full bg-white py-20 dark:bg-[#020617]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-12 items-center gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="col-span-12 md:col-span-7"
          >
            <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">Hi, I’m</p>

            <h1 className="text-6xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-white">
              Devasish
              <br />
              Viswanadh Kolla
            </h1>

            <p className="mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
              Building secure, scalable systems with AI and cybersecurity in mind.
            </p>

            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              I sometimes finish a week’s work in one night.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-700 dark:text-zinc-200">
              {/* Social links */}
              <a
                href={profile.social.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition-transform duration-200 hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10 dark:text-zinc-200"
              >
                <IconGitHub className="h-4 w-4" /> GitHub
              </a>
              <a
                href={profile.social.leetcode}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition-transform duration-200 hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10 dark:text-zinc-200"
              >
                <IconLeetCode className="h-4 w-4 text-orange-700 dark:text-orange-200" /> LeetCode
              </a>
              <a
                href={profile.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition-transform duration-200 hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10 dark:text-zinc-200"
              >
                <IconInstagram className="h-4 w-4" /> Instagram
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition-transform duration-200 hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10 dark:text-zinc-200"
              >
                <IconLinkedIn className="h-4 w-4" /> LinkedIn
              </a>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3 font-medium text-white transition-all duration-200 hover:scale-[1.03] hover:bg-orange-600"
                href="#projects"
              >
                Explore My Work <ArrowDownRight className="ml-2 h-4 w-4" />
              </a>
              <a
                className="inline-flex items-center justify-center rounded-xl border border-zinc-300 px-6 py-3 font-medium text-zinc-900 transition-all duration-200 hover:scale-[1.03] hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
                href="#contact"
              >
                Let’s Connect <ArrowDownRight className="ml-2 h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={onPreviewResume}
                className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white px-6 py-3 font-medium text-zinc-900 transition-all duration-200 hover:scale-[1.03] hover:bg-zinc-100 dark:border-zinc-700 dark:bg-white/10 dark:text-white dark:hover:bg-zinc-800"
              >
                Preview Resume <ArrowDownRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.05 }}
            className="col-span-12 flex justify-start md:col-span-5 md:justify-end"
          >
            <div className="relative">
              <div
                className="pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-br from-orange-500/10 via-transparent to-transparent blur-2xl"
                aria-hidden="true"
              />
              {imgOk ? (
                <img
                  src={imageUrl}
                  alt="Devasish Viswanadh Kolla"
                  className="h-72 w-72 rounded-2xl object-cover shadow-inner"
                  onError={() => setImgOk(false)}
                />
              ) : (
                <div className="flex h-72 w-72 items-center justify-center rounded-2xl bg-zinc-100 shadow-inner dark:bg-zinc-800">
                  <span className="text-2xl font-semibold text-zinc-500 dark:text-zinc-300">DK</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

