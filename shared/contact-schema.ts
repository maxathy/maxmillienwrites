import { z } from 'zod'

// Canonical contact form schema.
// The Firebase function at functions/src/contact.ts duplicates these bounds
// (Firebase packages only the functions/ directory on deploy, so a shared
// import would not travel with the deployment). Keep both in lockstep.

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name must be 80 characters or fewer'),
  email: z
    .string()
    .trim()
    .email('Enter a valid email address')
    .max(320, 'Email must be 320 characters or fewer'),
  company: z
    .string()
    .trim()
    .max(120, 'Company must be 120 characters or fewer')
    .optional()
    .or(z.literal('').transform(() => undefined)),
  message: z
    .string()
    .trim()
    .min(20, 'Message must be at least 20 characters')
    .max(4000, 'Message must be 4000 characters or fewer'),
})

export type ContactPayload = z.infer<typeof contactSchema>
