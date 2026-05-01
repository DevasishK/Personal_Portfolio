import { motion } from 'framer-motion'

export default function SkillGraph({ skills }) {
  return (
    <div className="grid gap-3">
      {skills.map((s) => (
        <div key={s.name} className="group relative grid gap-2">
          <div className="flex items-center justify-between text-sm">
            <div className="font-medium">{s.name}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">{s.level}%</div>
          </div>
          <div className="relative h-2 rounded-full bg-zinc-200 dark:bg-neutral-800">
            <div className="pointer-events-none absolute -top-9 left-0 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100">
              <div className="rounded-lg border border-zinc-200/70 bg-white/80 px-2 py-1 text-xs text-zinc-900 shadow-md backdrop-blur dark:border-white/10 dark:bg-neutral-900/80 dark:text-white">
                {s.level}% proficiency
              </div>
            </div>
            <motion.div
              className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${s.level}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

