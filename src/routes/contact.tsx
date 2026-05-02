import { createFileRoute, Link } from '@tanstack/react-router'
import { Container } from '../components/ui/Container'
import { SEO } from '../components/seo/SEO'
import { ContactForm } from '../components/contact/ContactForm'
import { getLinkedInUrl, getLinkedInLabel } from '../lib/tenant'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

function ContactPage() {
  const linkedInUrl = getLinkedInUrl()
  const linkedInLabel = getLinkedInLabel()
  return (
    <>
      <SEO
        title="Contact | Max Millien"
        description="Send a note about an engagement, an architecture review, or a specific problem. Responses within 24 hours at max.millien@puretome.com."
        path="/contact"
      />
      <main className="pt-24 pb-[var(--space-16)]">
        <Container>
          <header className="mb-[var(--space-10)] max-w-[72ch]">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[color:var(--color-fg)]/60">
              Contact · direct line
            </p>
            <h1 className="mt-3 font-mono text-[2.25rem] leading-tight md:text-[3rem]">
              Start a conversation
            </h1>
            <p className="mt-6 text-lg text-[color:var(--color-fg)]/80">
              The more context you share up front, the better the first reply. Engagements,
              architecture reviews, or a specific problem: all land in the same inbox and get a
              response within 24 hours.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-[var(--space-8)] lg:grid-cols-[minmax(0,1fr)_320px]">
            <section aria-labelledby="contact-form-heading">
              <h2
                id="contact-form-heading"
                className="mb-[var(--space-4)] mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-fg)]/60"
              >
                Send a message
              </h2>
              <ContactForm />
            </section>

            <aside aria-labelledby="contact-direct-heading" className="flex flex-col gap-[var(--space-4)]">
              <h2
                id="contact-direct-heading"
                className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-fg)]/60"
              >
                Direct channels
              </h2>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-fg)]/50">
                  Email
                </p>
                <p className="mt-1 font-mono text-sm text-[color:var(--color-fg)]/90">
                  max.millien@puretome.com
                </p>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-fg)]/50">
                  Architecture call
                </p>
                <Link
                  to="/engage"
                  hash="book"
                  className="mt-1 inline-block text-sm text-[color:var(--color-fg)]/90 underline decoration-[color:var(--color-accent)] decoration-2 underline-offset-4"
                >
                  Book a 30-min architecture call →
                </Link>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-fg)]/50">
                  LinkedIn
                </p>
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm text-[color:var(--color-fg)]/90 underline decoration-[color:var(--color-fg)]/30 decoration-1 underline-offset-4 hover:decoration-[color:var(--color-accent)]"
                >
                  {linkedInLabel} →
                </a>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-fg)]/50">
                  Location
                </p>
                <p className="mt-1 text-sm text-[color:var(--color-fg)]/90">Greater Boston</p>
              </div>
            </aside>
          </div>

          <p className="mt-[var(--space-12)] max-w-[72ch] border-t border-white/10 pt-[var(--space-6)] text-sm italic text-[color:var(--color-fg)]/60">
            Press and media inquiries:{' '}
            <Link
              to="/author"
              hash="press"
              className="underline decoration-[color:var(--color-fg)]/30 underline-offset-4 hover:decoration-[color:var(--color-accent)]"
            >
              see the author page →
            </Link>
          </p>
        </Container>
      </main>
    </>
  )
}
