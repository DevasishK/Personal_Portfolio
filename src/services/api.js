import { useCallback, useEffect, useState } from 'react'
import { isSupabaseConfigured, supabase } from './supabaseClient.js'

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

export async function incrementVisitCount() {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.rpc('increment_visit_count')
    if (error) throw error
    return data
  }
  const current = readJson('mock_visit_count', 0)
  const next = current + 1
  writeJson('mock_visit_count', next)
  return next
}

export async function getVisitCount() {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('visits').select('count').single()
    if (error) throw error
    return data.count
  }
  return readJson('mock_visit_count', 0)
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
    refresh()
  }, [refresh])

  return { messages, loading, refresh, configured: isSupabaseConfigured }
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
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [autoIncrement])

  return { count, loading, configured: isSupabaseConfigured }
}

