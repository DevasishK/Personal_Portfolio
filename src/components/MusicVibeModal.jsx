import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Modal from './Modal.jsx'
import { isEmailConfigured, sendRelationshipRequest } from '../services/email.js'

const RESPONSES = [
  'hmm… this better be good 👀',
  'ok ok… brave choice 😌',
  'judging your music taste already 🎧',
  'respect if this slaps 🔥',
]

function Bubble({ children, tone = 'bot', emphasis = 'normal' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={[
        'max-w-[92%] rounded-2xl px-4 py-3 leading-relaxed',
        tone === 'bot'
          ? 'border border-white/10 bg-white/10 text-white/90 backdrop-blur-xl'
          : 'ml-auto border border-white/10 bg-white/10 text-white',
        emphasis === 'primary' ? 'text-lg font-semibold' : emphasis === 'secondary' ? 'text-sm text-white/80' : 'text-sm',
      ].join(' ')}
    >
      {children}
    </motion.div>
  )
}

export default function MusicVibeModal({ open, onClose }) {
  const [messages, setMessages] = useState([])
  const [song, setSong] = useState('')
  const [typingDone, setTypingDone] = useState(false)
  const [typed, setTyped] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const songRef = useRef(null)

  const canSubmitSong = song.trim().length > 1 && typingDone && !sending

  const [response, setResponse] = useState(() => RESPONSES[0])

  useEffect(() => {
    if (!open) return

    /* eslint-disable react-hooks/set-state-in-effect -- reset chat when modal opens */
    setResponse(RESPONSES[Math.floor(Math.random() * RESPONSES.length)])
    setMessages([])
    setSong('')
    setTypingDone(false)
    setTyped('')
    setSending(false)
    setError(null)
    /* eslint-enable react-hooks/set-state-in-effect */

    const full = 'Wait… you got good taste? 👀'
    let i = 0
    const t = window.setInterval(() => {
      i += 1
      setTyped(full.slice(0, i))
      if (i >= full.length) {
        window.clearInterval(t)
        setTypingDone(true)
        window.setTimeout(() => songRef.current?.focus(), 40)
        setMessages([
          { id: 'm1', tone: 'bot', emphasis: 'primary', text: full },
          { id: 'm2', tone: 'bot', emphasis: 'secondary', text: 'Alright… impress me 😌' },
          { id: 'm3', tone: 'bot', emphasis: 'secondary', text: 'What should I listen to? 🎧' },
        ])
      }
    }, 22)
    return () => window.clearInterval(t)
  }, [open])

  async function submitSong(e) {
    e?.preventDefault?.()
    if (!canSubmitSong) return
    const userText = song.trim()
    setSong('')
    setError(null)
    setSending(true)

    const now = Date.now()
    setMessages((prev) => [...prev, { id: `u-${now}`, tone: 'user', text: userText }])

    try {
      if (!isEmailConfigured()) {
        throw new Error('Email could not be sent from this site right now.')
      }

      await sendRelationshipRequest({
        name: 'Anonymous',
        type: 'music_suggestion',
        statusAtTime: 'Music Vibe',
        message: userText,
        date: '',
        createdAt: new Date().toISOString(),
      })

      setMessages((prev) => [
        ...prev,
        { id: `r-${now + 1}`, tone: 'bot', text: response },
        { id: `ok-${now + 2}`, tone: 'bot', emphasis: 'secondary', text: 'Sent to my inbox. Respect. 🎧' },
      ])
    } catch (err) {
      setError(err?.message || 'Failed to send.')
      setMessages((prev) => [
        ...prev,
        { id: `err-${now + 3}`, tone: 'bot', emphasis: 'secondary', text: 'Didn’t go through. Try again in a sec.' },
      ])
    } finally {
      setSending(false)
      window.setTimeout(() => songRef.current?.focus(), 40)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={null} maxWidthClass="max-w-[480px]">
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="text-xs font-medium text-white/70">Devasish is testing your vibe 👀</div>
        </div>

        {/* Chat */}
        <div className="mt-5 space-y-3">
          {!typingDone ? (
            <Bubble emphasis="primary">{typed || ' '}</Bubble>
          ) : (
            <>
              {messages.map((m) => (
                <Bubble key={m.id} tone={m.tone} emphasis={m.emphasis}>
                  {m.text}
                </Bubble>
              ))}
            </>
          )}
        </div>

        {/* Input bar */}
        <form onSubmit={submitSong} className="mt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              ref={songRef}
              className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition-all duration-200 placeholder:text-white/50 focus:border-white/20 focus:bg-white/10 focus:ring-2 focus:ring-orange-400/30"
              placeholder="Drop a song + artist… don’t gatekeep 😤"
              value={song}
              onChange={(e) => setSong(e.target.value)}
              disabled={!typingDone || sending}
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              disabled={!canSubmitSong}
              className="h-12 w-full rounded-xl bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 disabled:opacity-50 sm:w-auto"
            >
              {sending ? 'Sending…' : 'Send it 🎧'}
            </motion.button>
          </div>
          {error ? <div className="mt-3 text-xs font-medium text-red-200">{error}</div> : null}
        </form>
      </div>
    </Modal>
  )
}

