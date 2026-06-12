import test from 'node:test'
import assert from 'node:assert/strict'
import handler from '../netlify/functions/contact.mjs'

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
  const res = await post({ name: 'Test', email: 'test@example.com', message: 'Hello' }, '10.0.0.1')
  assert.equal(res.status, 200)
  assert.deepEqual(await res.json(), { ok: true })
})

test('honeypot submissions are silently accepted', async () => {
  const res = await post(
    { name: 'Bot', email: 'bot@spam.com', message: 'spam', website: 'spam.com' },
    '10.0.0.2',
  )
  assert.equal(res.status, 200)
})

test('invalid email is rejected', async () => {
  const res = await post({ name: 'Test', email: 'not-an-email', message: 'Hello' }, '10.0.0.3')
  assert.equal(res.status, 400)
})

test('missing message is rejected', async () => {
  const res = await post({ name: 'Test', email: 'test@example.com', message: '' }, '10.0.0.4')
  assert.equal(res.status, 400)
})

test('non-POST methods are rejected', async () => {
  const res = await handler(new Request('http://localhost/api/contact', { method: 'GET' }), {
    ip: '10.0.0.5',
  })
  assert.equal(res.status, 405)
})

test('control characters are stripped from single-line fields', async () => {
  const res = await post(
    { name: 'Eve\r\nBcc: x@y.z', email: 'eve@example.com', message: 'hi' },
    '10.0.0.6',
  )
  assert.equal(res.status, 200)
})

test('rate limit kicks in after 5 submissions from one IP', async () => {
  const body = { name: 'Test', email: 'test@example.com', message: 'Hello' }
  for (let i = 0; i < 5; i++) {
    const res = await post(body, '10.0.0.99')
    assert.equal(res.status, 200, `submission ${i + 1} should pass`)
  }
  const res = await post(body, '10.0.0.99')
  assert.equal(res.status, 429)
})
