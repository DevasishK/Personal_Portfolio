import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { isEmailConfigured, sendRelationshipRequest } from '../services/email.js'
import FloatingEmojiBurst from './FloatingEmojiBurst.jsx'
import { STATUSES } from './RelationshipStatusDisplay.jsx'

const MAX_CHARS = 120
const AUTO_CLOSE_MS = 2600

function ModalShell({ open, onClose, children }) {
  useEffect(() => {
    if (!open) return
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const content = (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[999] grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white p-8 text-gray-900 shadow-2xl max-h-[85vh] overflow-y-auto border border-gray-200 dark:bg-white/10 dark:text-white dark:border-white/10 dark:backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-xl bg-gray-100 p-2 text-gray-900 transition-all duration-300 ease-in-out hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
              onClick={onClose}
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )

  // Render to document.body to avoid being trapped by transformed ancestors.
  if (typeof document !== 'undefined') return createPortal(content, document.body)
  return content
}

function Input({ label, ...props }) {
  return (
    <label className="grid gap-2 text-left text-sm text-gray-700 dark:text-white/80">
      <span className="font-medium">{label}</span>
      <input
        {...props}
        className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm text-black placeholder:text-gray-500 outline-none transition-all duration-300 ease-in-out focus:ring-2 focus:ring-purple-400 dark:border-white/20 dark:bg-white/10 dark:text-white dark:placeholder:text-white/50"
      />
    </label>
  )
}

function Textarea({ label, ...props }) {
  return (
    <label className="grid gap-2 text-left text-sm text-gray-700 dark:text-white/80">
      <span className="font-medium">{label}</span>
      <textarea
        {...props}
        className="min-h-28 w-full resize-none rounded-xl border border-gray-200 bg-white p-3 text-sm text-black placeholder:text-gray-500 outline-none transition-all duration-300 ease-in-out focus:ring-2 focus:ring-purple-400 dark:border-white/20 dark:bg-white/10 dark:text-white dark:placeholder:text-white/50"
      />
    </label>
  )
}

const VIBES = /** @type {const} */ ([
  { key: 'curious', label: '😄 Just curious' },
  { key: 'shooting_shot', label: '😏 Shooting my shot' },
  { key: 'friendly', label: '🤝 Friendly message' },
  { key: 'serious_proposal', label: '💍 Serious proposal' },
])

function vibeTitle(vibe) {
  switch (vibe) {
    case 'shooting_shot':
      return 'Alright… impress me 😌'
    case 'serious_proposal':
      return 'When and where? 👀'
    case 'friendly':
      return 'Let’s keep it chill 😄'
    case 'curious':
      return 'Okay… I’m listening 👀'
    default:
      return 'What’s your vibe? 😏'
  }
}

function vibePlaceholder(vibe) {
  switch (vibe) {
    case 'shooting_shot':
      return 'Don’t be boring… I’ve seen worse 😏'
    case 'serious_proposal':
      return 'Coffee? Walk? Something interesting? 😄'
    case 'curious':
      return 'Why did you even click this? 😄'
    default:
      return 'Say something nice…'
  }
}

export default function StatusRequestModal({ open, onClose, currentStatus }) {
  const configured = isEmailConfigured()

  const [step, setStep] = useState(1) // 1 vibe, 2 form, 3 success
  const [vibe, setVibe] = useState(null)
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [burst, setBurst] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    if (!open) return
    setError(null)
    setLoading(false)
    setBurst(false)
    setStep(1)
    setVibe(null)
    setName('')
    setDate('')
    setText('')
    setSuccessMsg('')
  }, [open])

  useEffect(() => {
    if (!open) return
    if (step !== 3) return
    const t = setTimeout(() => {
      onClose()
    }, AUTO_CLOSE_MS)
    return () => clearTimeout(t)
  }, [open, onClose, step])

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const isProposal = vibe === 'serious_proposal'
      const payload = {
        name: name.trim() || 'Anonymous',
        type: isProposal ? 'proposal' : 'status_change',
        statusAtTime: currentStatus,
        message: `Vibe: ${vibe ?? 'unknown'}\n\n${text.trim()}`,
        date: isProposal ? date : '',
        createdAt: new Date().toISOString(),
      }

      await sendRelationshipRequest(payload)
      setBurst(true)
      setTimeout(() => setBurst(false), 1200)
      setSuccessMsg(Math.random() > 0.5 ? 'Bold move… I respect it 😏' : 'Let’s see if this works 😄')
      setStep(3)
    } catch (err) {
      setError(err?.message || 'Failed to send. Try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ModalShell open={open} onClose={onClose}>
      <div className="relative">
        <FloatingEmojiBurst active={burst} />

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="vibe"
              initial={{ opacity: 0, scale: 0.9, rotate: 1 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <div className="text-balance text-2xl font-semibold text-gray-900 dark:text-white">What’s your vibe? 😏</div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Pick one. I promise I’ll read it (eventually).
              </div>

              <div className="mt-6 grid gap-3">
                {VIBES.map((v) => (
                  <motion.button
                    key={v.key}
                    type="button"
                    className="w-full rounded-full border border-gray-200 bg-white px-4 py-2 text-left text-sm font-semibold text-gray-900 transition-all duration-200 ease-out hover:scale-[1.02] hover:bg-gray-50 dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setVibe(v.key)
                      setStep(2)
                    }}
                  >
                    {v.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : null}

          {step === 2 ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <div className="text-balance text-2xl font-semibold text-gray-900 dark:text-white">{vibeTitle(vibe)}</div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Typing something interesting… I hope 👀
              </div>

              {!configured ? (
                <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-white/80">
                  Email sending is not configured yet. Add EmailJS keys in your <code className="text-gray-900 dark:text-white">.env</code> and
                  restart dev server.
                </div>
              ) : null}

              <form onSubmit={submit} className="mt-6 space-y-4">
                <Input label="Name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />

                {vibe === 'serious_proposal' ? (
                  <Input label="Pick a date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                ) : null}

                <Textarea
                  label={vibe === 'serious_proposal' ? 'Plan' : 'Message'}
                  placeholder={vibePlaceholder(vibe)}
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
                  maxLength={MAX_CHARS}
                  required
                />
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {text.length}/{MAX_CHARS} (don’t write an essay 😄)
                </div>

                {error ? <div className="text-sm text-red-600 dark:text-red-200">{error}</div> : null}

                <button
                  type="submit"
                  disabled={loading || !configured}
                  className="w-full rounded-xl bg-purple-500 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 ease-out hover:scale-[1.02] hover:bg-purple-600 hover:shadow-md disabled:opacity-60"
                >
                  {loading ? 'Sending…' : 'Send Request 💌'}
                </button>

                <button
                  type="button"
                  className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition-all duration-200 ease-out hover:bg-gray-50 dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
                  onClick={() => {
                    setStep(1)
                    setVibe(null)
                    setError(null)
                  }}
                >
                  Back
                </button>
              </form>
            </motion.div>
          ) : null}

          {step === 3 ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="mt-2 text-center"
            >
              <div className="text-balance text-2xl font-semibold text-gray-900 dark:text-white">{successMsg}</div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">Delivered to my inbox. No promises. Only vibes.</div>
              <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center dark:border-white/10 dark:bg-white/5">
                <div className="text-sm text-gray-700 dark:text-white/80">Closing in a sec…</div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {step !== 1 ? (
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Your message goes straight to my inbox. Status will not change automatically.
          </div>
        ) : null}

      </div>
    </ModalShell>
  )
}

