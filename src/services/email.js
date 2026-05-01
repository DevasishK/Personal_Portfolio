import emailjs from '@emailjs/browser'

function getEmailJsConfig() {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  return { serviceId, templateId, publicKey }
}

export function isEmailConfigured() {
  const { serviceId, templateId, publicKey } = getEmailJsConfig()
  return Boolean(serviceId && templateId && publicKey)
}

export async function sendRelationshipRequest(payload) {
  const { serviceId, templateId, publicKey } = getEmailJsConfig()
  if (!serviceId || !templateId || !publicKey) {
    throw new Error('Email is not configured. Set EmailJS env vars and try again.')
  }

  // EmailJS template variables should match these keys.
  const templateParams = {
    name: payload.name,
    type: payload.type,
    statusAtTime: payload.statusAtTime,
    message: payload.message ?? '',
    date: payload.date ?? '',
    createdAt: payload.createdAt,
  }

  try {
    await emailjs.send(serviceId, templateId, templateParams, { publicKey })
    return true
  } catch (err) {
    // EmailJS errors usually include status + text; surface them for debugging.
    const status = err?.status
    const text = err?.text || err?.message || 'Unknown error'
    // eslint-disable-next-line no-console
    console.error('EmailJS send failed:', err)
    throw new Error(status ? `EmailJS failed (${status}): ${text}` : `EmailJS failed: ${text}`)
  }
}

