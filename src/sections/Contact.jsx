import clsx from 'clsx'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import Reveal from '../components/Reveal.jsx'
import { usePerformancePrefs } from '../hooks/usePerformancePrefs.js'
import { profile } from '../profile.ts'
import { submitQuestion } from '../services/api.js'
import { isEmailConfigured, sendRelationshipRequest } from '../services/email.js'

export default function Contact({ variant = 'professional' }) {
  const { liteEffects } = usePerformancePrefs()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [question, setQuestion] = useState('')
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [sentOnce, setSentOnce] = useState(false)
  const [copied, setCopied] = useState(null)

  // Chat UI state (UI-only refactor; backend logic stays in onSubmit)
  const [step, setStep] = useState(1) // 1 name, 2 email, 3 message, 4 confirm, 5 sent
  const [draft, setDraft] = useState('')
  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState([])
  const listRef = useRef(null)
  const typingTimerRef = useRef(null)

  const quickActions = useMemo(
    () => [
      { id: 'hire', label: '💼 Hire me', preset: 'Hey Devasish — I’d like to discuss a role. Here’s what I’m looking for:' },
      { id: 'collab', label: '🤝 Collaborate', preset: 'Yo Devasish — want to collaborate on something? Here’s the idea:' },
      { id: 'tea', label: '☕ Tea chat', preset: 'Ok serious question… tea chat when? 😄 Also:' },
    ],
    [],
  )

  function resetChat() {
    setStep(1)
    setDraft('')
    setTyping(false)
    setMessages([{ id: 'b1', sender: 'bot', text: 'Hey 👋 What should I call you?' }])
  }

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- reset chat when switching contact variant */
    resetChat()
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [variant])

  useEffect(() => {
    // keep scroll pinned to bottom
    if (!listRef.current) return
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, typing])

  async function copyToClipboard(value, kind) {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(kind)
      window.setTimeout(() => setCopied(null), 1200)
    } catch {
      // Clipboard may be blocked; fall back to no-op.
      setCopied('blocked')
      window.setTimeout(() => setCopied(null), 1200)
    }
  }

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      const payload = {
        name: name.trim() || 'Anonymous',
        email: email.trim() || null,
        question: question.trim(),
        source: variant,
      }

      if (variant === 'professional' && isEmailConfigured()) {
        await sendRelationshipRequest({
          name: payload.name,
          type: 'status_change',
          statusAtTime: 'Professional Contact',
          message: `Email: ${payload.email ?? '(none)'}\n\nMessage:\n${payload.question}`,
          date: '',
          createdAt: new Date().toISOString(),
        })
      } else {
        await submitQuestion(payload)
      }
      setName('')
      setEmail('')
      setQuestion('')
      setStatus({ type: 'ok', msg: 'Sent. I’ll get back to you soon.' })
      setSentOnce(true)
    } catch (err) {
      setStatus({ type: 'err', msg: err?.message || 'Something went wrong.' })
    } finally {
      setLoading(false)
    }
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
  }

  function pushBot(text) {
    setTyping(true)
    if (typingTimerRef.current) window.clearTimeout(typingTimerRef.current)
    typingTimerRef.current = window.setTimeout(() => {
      setTyping(false)
      setMessages((prev) => [...prev, { id: `b-${Date.now()}`, sender: 'bot', text }])
    }, 650)
  }

  function handleUserSend(text) {
    const value = text.trim()
    if (!value) return
    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, sender: 'user', text: value }])
    setDraft('')

    if (step === 1) {
      setName(value)
      setStep(2)
      pushBot(`Nice to meet you, ${value}. Where can I reach you?`)
      return
    }
    if (step === 2) {
      if (!isValidEmail(value)) {
        pushBot('That email looks a little sus 😅 Try again?')
        return
      }
      setEmail(value)
      setStep(3)
      pushBot('What are you building or thinking about?')
      return
    }
    if (step === 3) {
      setQuestion(value)
      setStep(4)
      pushBot('Got it. Want me to send this?')
      return
    }
    if (step === 4) {
      const yes = /^y(es)?|send|ok|sure|go/i.test(value)
      const no = /^n(o)?|wait|edit/i.test(value)
      if (no) {
        setStep(3)
        pushBot('Cool — tweak your message and send it again.')
        return
      }
      if (!yes) {
        pushBot('Say “yes” to send, or “no” to edit 🙂')
        return
      }

      // Trigger existing backend submit logic (no API changes)
      onSubmit({ preventDefault() {} })
      setStep(5)
      pushBot('Message sent 🚀 I’ll get back to you soon.')
    }
  }

  return (
    <section id="contact" className="w-full border-t border-black/5 py-16 dark:border-white/10 md:py-20">
      <Reveal>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="max-w-xl">
              <div className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Contact</div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
                Let’s talk
              </h2>
              <p className="mt-3 text-base text-zinc-600 dark:text-zinc-300 md:text-lg">
                Send a message through the chat below — I read everything that comes through.
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  <a className="btn-primary w-full sm:w-auto" href={`mailto:${profile.contact.email}`}>
                    Email me
                  </a>
                  <a className="btn-ghost w-full sm:w-auto" href={`tel:${profile.contact.phone}`}>
                    Call me
                  </a>
                  <a
                    className="btn-ghost w-full sm:w-auto"
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Connect on LinkedIn
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(profile.contact.email, 'email')}
                    className="chip hover:opacity-90"
                    title="Click to copy"
                  >
                    {copied === 'email' ? 'Copied email' : profile.contact.email}
                  </button>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(profile.contact.phone, 'phone')}
                    className="chip hover:opacity-90"
                    title="Click to copy"
                  >
                    {copied === 'phone' ? 'Copied phone' : profile.contact.phone}
                  </button>
                  {copied === 'blocked' ? (
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      Copy blocked by browser
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="mt-6 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                <div>Fast replies: 24–48 hours (usually).</div>
                <div>Best detail: what you’re building + what you need.</div>
              </div>
            </div>

            <div className="w-full">
              <div
                className={clsx(
                  'relative overflow-hidden rounded-3xl border p-6 shadow-sm',
                  'border-zinc-200 bg-white dark:border-white/10 dark:shadow-none',
                  liteEffects ? 'dark:bg-white/6' : 'backdrop-blur-md dark:bg-white/5',
                )}
              >
                <div
                  className={clsx(
                    'pointer-events-none absolute -inset-8 rounded-[32px] bg-gradient-to-br from-orange-400/18 via-pink-400/14 to-purple-400/14 dark:from-orange-400/18 dark:via-pink-400/14 dark:to-purple-400/14',
                    liteEffects ? 'opacity-25 blur-2xl dark:opacity-40' : 'opacity-20 blur-3xl dark:opacity-100',
                  )}
                  aria-hidden="true"
                />

                <div className="relative">
                  {/* Message list */}
                  <div
                    ref={listRef}
                    className="max-h-[340px] space-y-3 overflow-y-auto pr-2 [scrollbar-width:thin]"
                  >
                    {messages.map((m) => {
                      const isUser = m.sender === 'user'
                      return (
                        <div
                          key={m.id}
                          className={clsx(
                            'flex',
                            isUser ? 'justify-end' : 'justify-start',
                          )}
                        >
                          <div
                            className={clsx(
                              'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                              isUser
                                ? 'bg-gradient-to-r from-orange-100 via-pink-100 to-purple-100 text-zinc-900 dark:from-orange-400/25 dark:via-pink-400/20 dark:to-purple-400/20 dark:text-white'
                                : 'border border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-white/10 dark:bg-white/10 dark:text-white/90',
                            )}
                          >
                            {m.text}
                          </div>
                        </div>
                      )
                    })}

                    {typing ? (
                      <div className="flex justify-start">
                        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600 dark:border-white/10 dark:bg-white/10 dark:text-white/70">
                          typing…
                        </div>
                      </div>
                    ) : null}
                  </div>

                  {/* Quick actions */}
                  {step <= 3 ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {quickActions.map((a) => (
                        <button
                          key={a.id}
                          type="button"
                          className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-800 transition-all duration-200 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
                          onClick={() => {
                            // Jump to message step with a prefill
                            setMessages((prev) => [
                              ...prev,
                              { id: `u-${Date.now()}`, sender: 'user', text: a.label },
                            ])
                            setStep(3)
                            setQuestion('')
                            setDraft(a.preset)
                            pushBot('Nice. Drop the details below 👇')
                          }}
                        >
                          {a.label}
                        </button>
                      ))}
                    </div>
                  ) : null}

                  {/* Input bar */}
                  <form
                    className="mt-4 flex items-center gap-2"
                    onSubmit={(e) => {
                      e.preventDefault()
                      if (loading || sentOnce) return
                      handleUserSend(draft)
                    }}
                  >
                    <input
                      className="h-12 w-full rounded-xl border border-zinc-300 bg-white px-4 text-sm text-zinc-900 outline-none transition-all duration-200 placeholder:text-zinc-500 focus:border-zinc-400 focus:ring-2 focus:ring-orange-400/35 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/50 dark:focus:border-white/20 dark:focus:bg-white/10 dark:focus:ring-orange-400/30"
                      placeholder={
                        step === 1
                          ? 'Your name…'
                          : step === 2
                            ? 'Email you check…'
                            : step === 3
                              ? 'Type your message…'
                              : 'Type yes/no…'
                      }
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      disabled={loading || sentOnce}
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading || sentOnce || !draft.trim()}
                      className="h-12 rounded-xl bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 px-4 text-sm font-semibold text-white transition-all duration-200 disabled:opacity-50"
                    >
                      Send
                    </motion.button>
                  </form>

                  {status ? (
                    <div
                      className={
                        status.type === 'ok'
                          ? 'mt-3 text-sm text-emerald-700 dark:text-emerald-300'
                          : 'mt-3 text-sm text-red-600 dark:text-red-300'
                      }
                    >
                      {status.msg}
                    </div>
                  ) : null}

                  {sentOnce ? (
                    <motion.div
                      className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-50 p-3 text-sm text-emerald-900 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Message sent. You can refresh the page to send another.
                    </motion.div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

