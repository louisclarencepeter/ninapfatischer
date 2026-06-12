import test, { afterEach } from 'node:test'
import assert from 'node:assert/strict'
import handler from '../netlify/functions/contact.mjs'

const originalFetch = globalThis.fetch
const EMAIL_ENV_KEYS = [
  'RESEND_API_KEY',
  'EMAIL_FROM',
  'EMAIL_REPLY_TO',
  'EMAIL_NOTIFICATION_TO',
  'EMAIL_NOTIFICATION_BCC',
  'EMAIL_CONFIRMATIONS_ENABLED',
]

const resetEmailEnv = () => {
  for (const key of EMAIL_ENV_KEYS) delete process.env[key]
  globalThis.fetch = originalFetch
}

const configureMail = (overrides = {}) => {
  resetEmailEnv()
  Object.assign(process.env, {
    RESEND_API_KEY: 'rk_test',
    EMAIL_FROM: 'Nina Pfatischer Yoga <nina@ninapfatischer.com>',
    EMAIL_REPLY_TO: 'nina@ninapfatischer.com',
    EMAIL_NOTIFICATION_TO: 'nina.receiving@example.com',
    EMAIL_NOTIFICATION_BCC: '',
    EMAIL_CONFIRMATIONS_ENABLED: 'true',
    ...overrides,
  })
}

const mockResend = ({ status = 200, body = { id: 'email_test' } } = {}) => {
  const calls = []
  globalThis.fetch = async (url, options) => {
    calls.push({
      url,
      method: options?.method,
      headers: options?.headers,
      body: JSON.parse(options?.body),
    })

    return new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  return calls
}

afterEach(resetEmailEnv)

const post = (body, ip) =>
  handler(
    new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }),
    { ip },
  )

test('valid submission succeeds', async () => {
  configureMail()
  const calls = mockResend()
  const res = await post({ name: 'Test', email: 'test@example.com', message: 'Hello' }, '10.0.0.1')
  assert.equal(res.status, 200)
  assert.deepEqual(await res.json(), { ok: true })
  assert.equal(calls.length, 2)
  assert.equal(calls[0].url, 'https://api.resend.com/emails')
  assert.equal(calls[0].body.from, 'Nina Pfatischer Yoga <nina@ninapfatischer.com>')
  assert.deepEqual(calls[0].body.to, ['nina.receiving@example.com'])
  assert.equal(calls[0].body.reply_to, 'test@example.com')
  assert.equal(calls[1].url, 'https://api.resend.com/emails')
  assert.deepEqual(calls[1].body.to, ['test@example.com'])
  assert.equal(calls[1].body.reply_to, 'nina@ninapfatischer.com')
  resetEmailEnv()
})

test('honeypot submissions are silently accepted', async () => {
  resetEmailEnv()
  const res = await post(
    { name: 'Bot', email: 'bot@spam.com', message: 'spam', website: 'spam.com' },
    '10.0.0.2',
  )
  assert.equal(res.status, 200)
})

test('invalid email is rejected', async () => {
  resetEmailEnv()
  const res = await post({ name: 'Test', email: 'not-an-email', message: 'Hello' }, '10.0.0.3')
  assert.equal(res.status, 400)
})

test('missing message is rejected', async () => {
  resetEmailEnv()
  const res = await post({ name: 'Test', email: 'test@example.com', message: '' }, '10.0.0.4')
  assert.equal(res.status, 400)
})

test('non-POST methods are rejected', async () => {
  resetEmailEnv()
  const res = await handler(new Request('http://localhost/api/contact', { method: 'GET' }), {
    ip: '10.0.0.5',
  })
  assert.equal(res.status, 405)
})

test('control characters are stripped from single-line fields', async () => {
  configureMail({ EMAIL_CONFIRMATIONS_ENABLED: 'false' })
  const calls = mockResend()
  const res = await post(
    { name: 'Eve\r\nBcc: x@y.z', email: 'eve@example.com', message: 'hi' },
    '10.0.0.6',
  )
  assert.equal(res.status, 200)
  assert.equal(calls.length, 1)
  assert.equal(calls[0].body.subject, 'New message from Eve Bcc: x@y.z')
  resetEmailEnv()
})

test('missing notification recipient is rejected instead of defaulting to the sender inbox', async () => {
  configureMail({ EMAIL_NOTIFICATION_TO: '' })
  const calls = mockResend()
  const originalConsoleError = console.error
  console.error = () => {}
  try {
    const res = await post({ name: 'Test', email: 'test@example.com', message: 'Hello' }, '10.0.0.7')
    assert.equal(res.status, 503)
    assert.equal(calls.length, 0)
  } finally {
    console.error = originalConsoleError
    resetEmailEnv()
  }
})

test('customer confirmation can be disabled while internal notification still sends', async () => {
  configureMail({ EMAIL_CONFIRMATIONS_ENABLED: 'false', EMAIL_NOTIFICATION_BCC: 'ops@example.com' })
  const calls = mockResend()
  const res = await post({ name: 'Test', email: 'test@example.com', message: 'Hello' }, '10.0.0.8')
  assert.equal(res.status, 200)
  assert.equal(calls.length, 1)
  assert.deepEqual(calls[0].body.to, ['nina.receiving@example.com'])
  assert.deepEqual(calls[0].body.bcc, ['ops@example.com'])
  resetEmailEnv()
})

test('customer confirmation failure does not fail an already delivered lead', async () => {
  configureMail()
  const calls = []
  const originalConsoleError = console.error
  console.error = () => {}
  globalThis.fetch = async (url, options) => {
    calls.push({
      url,
      body: JSON.parse(options?.body),
    })

    return new Response(JSON.stringify({ id: `email_${calls.length}` }), {
      status: calls.length === 1 ? 200 : 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const res = await post({ name: 'Test', email: 'test@example.com', message: 'Hello' }, '10.0.0.9')
    assert.equal(res.status, 200)
    assert.equal(calls.length, 2)
    assert.deepEqual(calls[0].body.to, ['nina.receiving@example.com'])
    assert.deepEqual(calls[1].body.to, ['test@example.com'])
  } finally {
    console.error = originalConsoleError
    resetEmailEnv()
  }
})

test('rate limit kicks in after 5 submissions from one IP', async () => {
  configureMail({ EMAIL_CONFIRMATIONS_ENABLED: 'false' })
  mockResend()
  const body = { name: 'Test', email: 'test@example.com', message: 'Hello' }
  for (let i = 0; i < 5; i++) {
    const res = await post(body, '10.0.0.99')
    assert.equal(res.status, 200, `submission ${i + 1} should pass`)
  }
  const res = await post(body, '10.0.0.99')
  assert.equal(res.status, 429)
  resetEmailEnv()
})
