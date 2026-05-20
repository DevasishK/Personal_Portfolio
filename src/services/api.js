import { useCallback, useEffect, useState } from 'react'
import { isSupabaseConfigured, supabase } from './supabaseClient.js'

/** Suppresses a second `increment_visit_count` RPC when React Strict Mode re-runs effects in dev (full reload resets this). */
let visitIncrementDedupeUntil = 0

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw == null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore
  }
}

function normalizeCount(value) {
  if (value == null) return null
  if (typeof value === 'bigint') return Number(value)
  const n = Number(value)
  return Number.isFinite(n) ? n : null
}

export async function incrementVisitCount() {
  if (!isSupabaseConfigured || !supabase) return null

  const now = Date.now()
  if (now < visitIncrementDedupeUntil) {
    return getVisitCount()
  }

  const { data, error } = await supabase.rpc('increment_visit_count')
  if (error) throw error
  visitIncrementDedupeUntil = Date.now() + 1200
  return normalizeCount(data)
}

export async function getVisitCount() {
  if (!isSupabaseConfigured || !supabase) return null

  const { data, error } = await supabase.from('visits').select('count').single()
  if (error) throw error
  return normalizeCount(data?.count)
}

export async function submitQuestion(payload) {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('questions').insert({
      name: payload.name,
      email: payload.email,
      question: payload.question,
      source: payload.source ?? null,
    })
    if (error) throw error
    return true
  }
  const current = readJson('mock_questions', [])
  current.unshift({ id: crypto.randomUUID(), ...payload, created_at: new Date().toISOString() })
  writeJson('mock_questions', current)
  return true
}

export async function listMessages({ limit = 20 } = {}) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('messages')
      .select('id,name,message,created_at')
      .order('created_at', { ascending: false })
      .limit(limit)
    if (error) throw error
    return data
  }

  const current = readJson('mock_messages', [])
  return current.slice(0, limit)
}

export async function postMessage({ name, message }) {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('messages').insert({ name, message })
    if (error) throw error
    return true
  }

  const current = readJson('mock_messages', [])
  current.unshift({ id: crypto.randomUUID(), name, message, created_at: new Date().toISOString() })
  writeJson('mock_messages', current)
  return true
}

export function useMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const data = await listMessages({ limit: 20 })
      setMessages(data ?? [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- initial fetch for message wall */
    refresh()
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [refresh])

  return { messages, loading, refresh }
}

export function useVisitorCount({ autoIncrement = true } = {}) {
  const [count, setCount] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function run() {
      setLoading(true)
      try {
        const next = autoIncrement ? await incrementVisitCount() : await getVisitCount()
        if (!cancelled) setCount(next)
      } catch {
        if (!cancelled) setCount(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [autoIncrement])

  return { count, loading }
}

