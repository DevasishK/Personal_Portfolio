import clsx from 'clsx'
import { useMemo } from 'react'
import { usePerformancePrefs } from '../../hooks/usePerformancePrefs.js'
import SecureFileLockerVisual from './SecureFileLockerVisual.jsx'
import ShopForageVisual from './ShopForageVisual.jsx'
import PhishingUrlVisual from './PhishingUrlVisual.jsx'
import LoanRiskVisual from './LoanRiskVisual.jsx'

export default function ProjectVisual({ projectId, className }) {
  const { reducedMotion, liteEffects } = usePerformancePrefs()

  const Visual = useMemo(() => {
    switch (projectId) {
      case 'pf1':
        return SecureFileLockerVisual
      case 'pf2':
        return ShopForageVisual
      case 'pf3':
        return PhishingUrlVisual
      case 'pf4':
        return LoanRiskVisual
      default:
        return null
    }
  }, [projectId])

  return (
    <div
      className={clsx(
        'group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-zinc-100 via-white to-zinc-50 shadow-sm',
        'transition-transform duration-200 ease-out hover:scale-[1.01]',
        'dark:border-white/10 dark:from-white/10 dark:via-white/5 dark:to-white/10',
        className,
      )}
    >
      <div
        className={clsx(
          'pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200',
          'bg-[radial-gradient(circle_at_30%_25%,rgba(249,115,22,0.20),transparent_55%),radial-gradient(circle_at_70%_65%,rgba(236,72,153,0.14),transparent_55%)]',
          'group-hover:opacity-100',
        )}
        aria-hidden="true"
      />

      <div className="absolute inset-0 p-5">
        {Visual ? <Visual reducedMotion={reducedMotion} liteEffects={liteEffects} /> : null}
      </div>
    </div>
  )
}

