import { onRequest } from 'firebase-functions/v2/https'
import { defineSecret } from 'firebase-functions/params'
import { Resend } from 'resend'
import { z } from 'zod'

const RESEND_API_KEY = defineSecret('RESEND_API_KEY')

const ALLOWED_ORIGINS = new Set([
  'https://maxmillienwrites.com',
  'https://www.maxmillienwrites.com',
  'http://localhost:5173',
])

const ContactPayload = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  message: z.string().min(1).max(5000),
  company: z.string().max(200).optional(),
})

export const contact = onRequest(
  { secrets: [RESEND_API_KEY], region: 'us-central1', cors: false },
  async (req, res) => {
    const origin = req.get('origin') ?? ''
    if (ALLOWED_ORIGINS.has(origin)) {
      res.set('Access-Control-Allow-Origin', origin)
      res.set('Vary', 'Origin')
      res.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
      res.set('Access-Control-Allow-Headers', 'Content-Type')
    }

    if (req.method === 'OPTIONS') {
      res.status(204).send('')
      return
    }

    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' })
      return
    }

    const parsed = ContactPayload.safeParse(req.body)
    if (!parsed.success) {
      res.status(400).json({ error: 'Invalid payload', issues: parsed.error.issues })
      return
    }

    const { name, email, message, company } = parsed.data
    const resend = new Resend(RESEND_API_KEY.value())

    try {
      const result = await resend.emails.send({
        from: 'contact@maxmillienwrites.com',
        to: 'max.millien@puretome.com',
        replyTo: email,
        subject: `maxmillienwrites.com — inquiry from ${name}`,
        text: [
          `From: ${name} <${email}>`,
          company ? `Company: ${company}` : null,
          '',
          message,
        ]
          .filter((line): line is string => line !== null)
          .join('\n'),
      })

      if (result.error) {
        res.status(502).json({ error: 'Email delivery failed' })
        return
      }

      res.status(200).json({ ok: true, id: result.data?.id })
    } catch {
      res.status(500).json({ error: 'Unexpected failure' })
    }
  },
)
