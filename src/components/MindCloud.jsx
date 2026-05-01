import clsx from 'clsx'
import { useState } from 'react'
import { usePerformancePrefs } from '../hooks/usePerformancePrefs.js'

export default function MindCloud({
  className,
  imageSrc = '/PHOTO-2026-05-02-02-26-40.jpg',
  fallbackText = 'DVK',
}) {
  const [imgOk, setImgOk] = useState(true)
  const { reducedMotion, liteEffects } = usePerformancePrefs()
  return (
    <div className={clsx('absolute inset-0 pointer-events-none', className)} aria-hidden="true">
      {/* main anchor cloud (400–500px), energetic source */}
      <div
        className={clsx(
          'absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-orange-400/38 via-pink-400/32 to-purple-400/32 dark:from-orange-400/50 dark:via-pink-400/44 dark:to-purple-400/44',
          liteEffects ? 'opacity-45 blur-2xl' : 'opacity-70 blur-3xl',
          reducedMotion || liteEffects ? null : 'animate-mindPulse',
        )}
      />

      {/* inner glow cluster */}
      <div
        className={clsx(
          'absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-pink-400/22 via-purple-400/18 to-orange-400/18 dark:from-pink-400/28 dark:via-purple-400/22 dark:to-orange-400/22',
          liteEffects ? 'opacity-40 blur-2xl' : 'opacity-65 blur-3xl',
        )}
      />

      {/* faint radial rings */}
      <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/10 opacity-30 dark:border-white/10 dark:opacity-35" />
      <div className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/10 opacity-25 dark:border-white/10 dark:opacity-30" />

      {/* core: glass ring + profile image */}
      <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 shadow-inner dark:bg-white/10">
        <div className="h-full w-full rounded-full bg-white/20 p-1.5 dark:bg-white/5">
          <div className="h-full w-full overflow-hidden rounded-full bg-white/40 dark:bg-black/30">
            {imgOk ? (
              <img
                src={imageSrc}
                alt=""
                className="h-full w-full object-cover object-top"
                onError={() => setImgOk(false)}
              />
            ) : (
              <div className="grid h-full w-full place-items-center text-sm font-semibold tracking-widest text-zinc-900/60 dark:text-white/70">
                {fallbackText}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

