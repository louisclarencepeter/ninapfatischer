// Contact form handler — Netlify Function (v2 API).
// Validates the submission and sends outbound email through Resend's
// /emails API. Resend is used only for sending; EMAIL_NOTIFICATION_TO must be
// a real receiving mailbox hosted through normal MX records.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Best-effort rate limit. State is per function instance, so a cold start
// resets it — good enough to stop casual flooding without a datastore.
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map()

function rateLimited(ip) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 1000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key)
    }
  }
  return recent.length > MAX_PER_WINDOW
}

// Single-line fields: collapse whitespace (including CR/LF) so nothing
// odd reaches the email subject.
const line = (value, max) =>
  String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max)

const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  })

const getEnv = (key) => String(process.env[key] ?? '').trim()

const isTruthy = (value) => ['1', 'true', 'yes', 'on'].includes(String(value ?? '').trim().toLowerCase())

const parseEmailList = (value) =>
  String(value ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

const sendWithResend = async ({ apiKey, from, to, subject, text, replyTo, bcc }) => {
  const payload = {
    from,
    to,
    subject,
    text,
    reply_to: replyTo || undefined,
    bcc: bcc?.length ? bcc : undefined,
  }

  // Bounded so a hung Resend request cannot ride into the platform's
  // function timeout and report a delivered lead as failed.
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(8000),
  })

  if (!res.ok) {
    throw new Error(`Resend error ${res.status}: ${await res.text()}`)
  }

  return res.json()
}

const getMailConfig = () => {
  const config = {
    apiKey: getEnv('RESEND_API_KEY'),
    from: getEnv('EMAIL_FROM'),
    replyTo: getEnv('EMAIL_REPLY_TO'),
    notificationTo: getEnv('EMAIL_NOTIFICATION_TO'),
    notificationBcc: parseEmailList(getEnv('EMAIL_NOTIFICATION_BCC')),
    confirmationsEnabled: isTruthy(getEnv('EMAIL_CONFIRMATIONS_ENABLED')),
  }

  if (!config.apiKey) return { ok: false, reason: 'RESEND_API_KEY is missing.', ...config }
  if (!config.from) return { ok: false, reason: 'EMAIL_FROM is missing.', ...config }
  if (!config.notificationTo) return { ok: false, reason: 'EMAIL_NOTIFICATION_TO is missing.', ...config }

  return { ok: true, reason: '', ...config }
}

// The customer confirmation deliberately does not echo the submitted message
// or practice: anyone can POST here, and echoing free text in mail sent from
// the verified domain would make the form a spam relay.
const CONFIRMATION_COPY = {
  de: {
    subject: 'Danke für deine Nachricht',
    body: (name) =>
      [
        `Hallo ${name},`,
        '',
        'danke für deine Nachricht über ninapfatischer.com. Nina meldet sich so bald wie möglich persönlich bei dir.',
        '',
        'Falls du diese Anfrage nicht selbst gestellt hast, kannst du diese E-Mail einfach ignorieren.',
        '',
        'Nina Pfatischer Yoga',
      ].join('\n'),
  },
  en: {
    subject: 'Thanks for your message',
    body: (name) =>
      [
        `Hi ${name},`,
        '',
        'thank you for your message via ninapfatischer.com. Nina will get back to you personally as soon as possible.',
        '',
        'If you did not submit this request, you can simply ignore this email.',
        '',
        'Nina Pfatischer Yoga',
      ].join('\n'),
  },
}

export default async (req, context) => {
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405, { Allow: 'POST' })
  }

  const ip = context?.ip ?? req.headers.get('x-nf-client-connection-ip') ?? 'unknown'
  if (rateLimited(ip)) {
    return json({ error: 'Too many messages — please try again a little later.' }, 429, {
      'Retry-After': String(WINDOW_MS / 1000),
    })
  }

  let data
  try {
    data = await req.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }

  // req.json() accepts any JSON value, including null and arrays.
  if (data === null || typeof data !== 'object' || Array.isArray(data)) {
    return json({ error: 'Invalid JSON body' }, 400)
  }

  // Honeypot: real visitors never fill this field.
  if (data.website) {
    return json({ ok: true })
  }

  const name = line(data.name, 200)
  const email = line(data.email, 200)
  const practice = line(data.practice, 200)
  const lang = data.lang === 'en' ? 'en' : 'de'
  const message = String(data.message ?? '')
    .replace(/\r/g, '')
    .trim()
    .slice(0, 5000)

  if (!name || !message || !EMAIL_RE.test(email)) {
    return json({ error: 'Please provide your name, a valid email, and a message.' }, 400)
  }

  const mailConfig = getMailConfig()
  if (!mailConfig.ok) {
    console.error('Contact email delivery is not configured:', mailConfig.reason)
    return json({ error: 'Could not deliver the message. Please try again later.' }, 503)
  }

  const internalText = [
    'New website contact form submission',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    practice && `Practice: ${practice}`,
    '',
    message,
  ]
    .filter(Boolean)
    .join('\n')

  try {
    await sendWithResend({
      apiKey: mailConfig.apiKey,
      from: mailConfig.from,
      to: [mailConfig.notificationTo],
      replyTo: email,
      bcc: mailConfig.notificationBcc,
      subject: `New message from ${name}${practice ? ` — ${practice}` : ''}`,
      text: internalText,
    })
  } catch (error) {
    console.error('Contact email delivery failed:', error)
    return json({ error: 'Could not deliver the message. Please try again later.' }, 502)
  }

  if (mailConfig.confirmationsEnabled) {
    try {
      const confirmation = CONFIRMATION_COPY[lang]
      await sendWithResend({
        apiKey: mailConfig.apiKey,
        from: mailConfig.from,
        to: [email],
        replyTo: mailConfig.replyTo || undefined,
        subject: confirmation.subject,
        text: confirmation.body(name),
      })
    } catch (error) {
      console.error('Customer confirmation email failed:', error)
    }
  }

  return json({ ok: true })
}

export const config = {
  path: '/api/contact',
}
