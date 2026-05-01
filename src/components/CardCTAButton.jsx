import { ArrowRight } from 'lucide-react'
import clsx from 'clsx'

export default function CardCTAButton({ children, className }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black shadow-sm transition-all duration-300 ease-in-out',
        'group-hover:-translate-y-[1px] group-hover:scale-105 group-hover:shadow-lg',
        className,
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </span>
  )
}

