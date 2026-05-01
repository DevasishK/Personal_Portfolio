import { Menu, Moon, Sparkles, Sun, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import ModeToggle from './ModeToggle.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { useVisitorCount } from '../services/api.js'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { usePerformancePrefs } from '../hooks/usePerformancePrefs.js'

function NavLink({ to, children }) {
  const { pathname } = useLocation()
  const active = pathname === to
  return (
    <Link
      to={to}
      className={clsx(
        'rounded-lg px-3 py-2 text-sm font-medium transition',
        active
          ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
          : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-900/60 dark:hover:text-white',
      )}
    >
      {children}
    </Link>
  )
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { count } = useVisitorCount({ autoIncrement: true })
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const { liteEffects } = usePerformancePrefs()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onClick = (e) => {
      if (!menuRef.current) return
      if (!menuRef.current.contains(e.target)) setOpen(false)
    }
    window.addEventListener('mousedown', onClick)
    return () => window.removeEventListener('mousedown', onClick)
  }, [open])

  return (
    <div className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] -translate-x-1/2 max-w-3xl">
      <div
        ref={menuRef}
        className={clsx(
          'relative rounded-full border px-6',
          liteEffects ? 'bg-white/92 dark:bg-zinc-900/92' : 'backdrop-blur-sm',
          'transition-[transform,background-color,border-color,box-shadow] duration-200 ease-out',
          scrolled ? 'py-2.5 scale-[0.99]' : 'py-3 hover:scale-[1.01]',
          scrolled
            ? 'bg-white/85 border-zinc-200 shadow-md dark:bg-zinc-900/85 dark:border-zinc-700 dark:shadow-lg'
            : 'bg-white/70 border-zinc-200 shadow-md dark:bg-zinc-900/70 dark:border-zinc-700 dark:shadow-lg',
        )}
      >
        <div className="grid items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
          {/* Left: brand */}
          <div className="flex items-center justify-start">
            <Link to="/" className="group inline-flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-zinc-900 text-white transition dark:bg-white dark:text-zinc-900">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-base font-semibold text-zinc-900 dark:text-white">DVK.</span>
            </Link>
          </div>

          {/* Center: mode toggle (primary) */}
          <div className="hidden justify-center md:flex">
            <ModeToggle />
          </div>

          {/* Right: visits + theme + hamburger */}
          <div className="flex items-center justify-end gap-2">
            <div className="hidden sm:block">
              <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-950/30 dark:text-zinc-200">
                {count == null ? '— visits' : `${count.toLocaleString()} visits`}
              </span>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-3 py-2 text-zinc-900 transition-all duration-200 ease-in-out hover:scale-105 dark:border-zinc-700 dark:bg-zinc-950/30 dark:text-white"
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Mobile */}
            <div className="flex items-center gap-2 md:hidden">
              <ModeToggle className="w-[190px]" />
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-3 py-2 text-zinc-900 transition-all duration-200 ease-in-out hover:scale-105 dark:border-zinc-700 dark:bg-zinc-950/30 dark:text-white"
                aria-label={open ? 'Close menu' : 'Open menu'}
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {open ? (
          <div className="absolute left-0 right-0 top-full mt-3 overflow-hidden rounded-2xl border border-zinc-200 bg-white/90 p-3 backdrop-blur-md shadow-md dark:border-zinc-700 dark:bg-zinc-900/90">
            <div className="grid gap-2">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/pro">Professional</NavLink>
              <NavLink to="/fun">Fun</NavLink>
              <div className="pt-2">
                <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-950/30 dark:text-zinc-200">
                  {count == null ? '— visits' : `${count.toLocaleString()} visits`}
                </span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

