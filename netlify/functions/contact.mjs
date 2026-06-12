// Contact form handler — Netlify Function (v2 API).
// Validates the submission and forwards it by email via Resend when
// RESEND_API_KEY is configured. Delivery goes to nina@ninapfatischer.com
// unless CONTACT_TO_EMAIL overrides it; the sender address requires the
// ninapfatischer.com domain to be verified in Resend. Without an API key
// submissions are logged and the form still succeeds.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })

export default async (req) => {
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405)
  }

  let data
  try {
    data = await req.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }

  // Honeypot: real visitors never fill this field.
  if (data.website) {
    return json({ ok: true })
  }

  const name = String(data.name ?? '').trim().slice(0, 200)
  const email = String(data.email ?? '').trim().slice(0, 200)
  const practice = String(data.practice ?? '').trim().slice(0, 200)
  const message = String(data.message ?? '').trim().slice(0, 5000)

  if (!name || !message || !EMAIL_RE.test(email)) {
    return json({ error: 'Please provide your name, a valid email, and a message.' }, 400)
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL || 'nina@ninapfatischer.com'

  if (apiKey) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || 'Nina Pfatischer Yoga <nina@ninapfatischer.com>',
        to: [to],
        reply_to: email,
        subject: `New message from ${name}${practice ? ` — ${practice}` : ''}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          practice && `Practice: ${practice}`,
          '',
          message,
        ]
          .filter(Boolean)
          .join('\n'),
      }),
    })

    if (!res.ok) {
      console.error('Resend error', res.status, await res.text())
      return json({ error: 'Could not deliver the message. Please try again later.' }, 502)
    }
  } else {
    console.log('Contact submission (email delivery not configured):', {
      name,
      email,
      practice,
      message,
    })
  }

  return json({ ok: true })
}

export const config = {
  path: '/api/contact',
}
