import { Bot, Send } from 'lucide-react'
import { useMemo, useState } from 'react'
import Reveal from '../components/Reveal.jsx'

function normalize(q) {
  return q.trim().toLowerCase()
}

export default function AIChat({ data }) {
  const suggestions = data?.suggestions ?? []
  const answers = data?.answers ?? {}

  const qa = useMemo(
    () => [
      { key: 'roles', match: ['role', 'roles', 'looking for'], answer: answers.roles },
      { key: 'skills', match: ['skills', 'stack', 'strongest'], answer: answers.skills },
      { key: 'project', match: ['project', 'case study', 'portfolio'], answer: answers.project },
    ].filter((x) => Boolean(x.answer)),
    [answers.project, answers.roles, answers.skills],
  )

  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Ask me about roles, skills, or a project. (Static placeholder — not a real AI yet.)' },
  ])

  function respond(text) {
    const q = normalize(text)
    const hit = qa.find((x) => x.match.some((m) => q.includes(m)))
    return hit?.answer ?? "I don't have that answer yet. Try asking about roles, skills, or a project."
  }

  function send(text) {
    const t = text.trim()
    if (!t) return
    setMessages((m) => [...m, { from: 'user', text: t }, { from: 'bot', text: respond(t) }])
    setInput('')
  }

  return (
    <section id="ai-chat" className="w-full border-t border-black/5 py-16 dark:border-white/10 md:py-20">
      <Reveal>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
          <div className="max-w-2xl">
            <div className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Q&amp;A</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
              Ask about me (placeholder)
            </h2>
            <p className="mt-3 text-base text-zinc-600 dark:text-zinc-300 md:text-lg">
              A simple chat UI with static answers — ready to be replaced by a real AI later.
            </p>
          </div>

          <div className="mt-10">
            <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                <Bot className="h-4 w-4" />
              </span>
              Professional Q&amp;A
            </div>

            <div className="mt-5 h-64 overflow-y-auto rounded-2xl border border-black/10 bg-white/50 p-4 backdrop-blur dark:border-white/10 dark:bg-white/5">
              <div className="space-y-3">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={[
                      'max-w-[85%] rounded-2xl px-3 py-2 text-sm',
                      m.from === 'user'
                        ? 'ml-auto bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                        : 'bg-black/5 text-zinc-900 dark:bg-white/10 dark:text-white',
                    ].join(' ')}
                  >
                    {m.text}
                  </div>
                ))}
              </div>
            </div>

            {suggestions.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button key={s} type="button" className="btn-ghost" onClick={() => send(s)}>
                    {s}
                  </button>
                ))}
              </div>
            ) : null}

            <form
              className="mt-4 flex flex-col gap-2 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
            >
              <input
                className="input"
                placeholder="Ask a question…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button className="btn-primary w-full sm:w-auto" type="submit">
                <Send className="h-4 w-4" /> Send
              </button>
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

