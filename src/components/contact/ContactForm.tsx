import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { contactSchema, type ContactPayload } from '../../../shared/contact-schema'

type Status = 'idle' | 'submitting' | 'success' | 'error'

type FormValues = {
  name: string
  email: string
  company: string
  message: string
}

const ENDPOINT = '/api/contact'

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormValues>({
    mode: 'onTouched',
    defaultValues: { name: '', email: '', company: '', message: '' },
  })

  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onSubmit = async (values: FormValues) => {
    setStatus('submitting')
    setErrorMessage(null)

    const parsed = contactSchema.safeParse(values)
    if (!parsed.success) {
      setStatus('error')
      setErrorMessage('Please correct the highlighted fields.')
      return
    }

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data satisfies ContactPayload),
      })

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null
        setStatus('error')
        setErrorMessage(body?.error ?? 'Something went wrong. Please try again or email directly.')
        return
      }

      setStatus('success')
      reset()
    } catch {
      setStatus('error')
      setErrorMessage('Network error. Please try again or email directly.')
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="fade-slide-in rounded-[var(--radius-md)] border border-[color:var(--color-accent)]/40 bg-[color:var(--color-accent)]/5 p-[var(--space-4)]"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-accent)]">
          Message sent
        </p>
        <p className="mt-3 text-[color:var(--color-fg)]/90">
          I&rsquo;ll respond within 24 hours from{' '}
          <span className="font-mono">max.millien@puretome.com</span>.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-[var(--space-4)]">
      <Field
        label="Name"
        htmlFor="contact-name"
        hint="Your full name."
        error={errors.name?.message}
      >
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          className={inputClass(!!errors.name)}
          {...register('name', {
            required: 'Name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' },
            maxLength: { value: 80, message: 'Name must be 80 characters or fewer' },
          })}
        />
      </Field>

      <Field
        label="Email"
        htmlFor="contact-email"
        hint="I reply from max.millien@puretome.com."
        error={errors.email?.message}
      >
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          className={inputClass(!!errors.email)}
          {...register('email', {
            required: 'Email is required',
            maxLength: { value: 320, message: 'Email is too long' },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address',
            },
          })}
        />
      </Field>

      <Field
        label="Company"
        htmlFor="contact-company"
        hint="Optional."
        error={errors.company?.message}
      >
        <input
          id="contact-company"
          type="text"
          autoComplete="organization"
          className={inputClass(!!errors.company)}
          {...register('company', {
            maxLength: { value: 120, message: 'Company must be 120 characters or fewer' },
          })}
        />
      </Field>

      <Field
        label="Message"
        htmlFor="contact-message"
        hint="Context, constraints, timeline: whatever helps me reply well."
        error={errors.message?.message}
      >
        <textarea
          id="contact-message"
          rows={7}
          className={`${inputClass(!!errors.message)} resize-y`}
          {...register('message', {
            required: 'Message is required',
            minLength: { value: 20, message: 'Message must be at least 20 characters' },
            maxLength: { value: 4000, message: 'Message must be 4000 characters or fewer' },
          })}
        />
      </Field>

      {status === 'error' && errorMessage && (
        <div
          role="alert"
          className="fade-slide-in rounded-[var(--radius-md)] border border-red-500/40 bg-red-500/10 p-[var(--space-3)] text-sm text-red-200"
        >
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!isValid || status === 'submitting'}
        className="inline-flex w-fit items-center gap-2 rounded-[var(--radius-pill)] bg-[color:var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-[color:var(--color-bg)] transition-all duration-150 hover:bg-[color:var(--color-accent)]/90 hover:-translate-y-px active:translate-y-0 disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:bg-[color:var(--color-accent)]"
      >
        {status === 'submitting' ? (
          <>
            <span
              aria-hidden="true"
              className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-[color:var(--color-bg)]/30 border-t-[color:var(--color-bg)]"
            />
            Sending…
          </>
        ) : (
          'Send →'
        )}
      </button>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  hint,
  error,
  children,
}: {
  label: string
  htmlFor: string
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-fg)]/70"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-xs text-red-300 transition-colors duration-150">{error}</p>
      ) : hint ? (
        <p className="text-xs text-[color:var(--color-fg)]/50 transition-colors duration-150">{hint}</p>
      ) : null}
    </div>
  )
}

function inputClass(hasError: boolean) {
  return [
    'w-full rounded-[var(--radius-md)] border bg-white/[0.02] px-3 py-2 text-[color:var(--color-fg)]',
    'placeholder:text-[color:var(--color-fg)]/30',
    'transition-colors duration-150',
    'hover:bg-white/[0.04]',
    'focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]/60 focus:border-[color:var(--color-accent)]/40',
    hasError
      ? 'border-red-500/60 hover:border-red-500/80'
      : 'border-white/10 hover:border-white/25',
  ].join(' ')
}
