import { Link } from '@tanstack/react-router'
import { Container } from '../ui/Container'
import type { AuthorPress } from '../../content/author'

export function PressSection({ press }: { press: AuthorPress }) {
  return (
    <section
      id="press"
      className="border-t border-[color:var(--color-muted)]/20 py-[var(--space-16)] scroll-mt-24"
    >
      <Container>
        <p className="mb-[var(--space-4)] font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
          Press & Connect
        </p>
        <h2 className="mb-[var(--space-4)]">Get in touch</h2>
        <p className="mb-[var(--space-8)] text-lg">
          Press and media inquiries:{' '}
          <a href={`mailto:${press.email}`} className="font-mono">
            {press.email}
          </a>
        </p>

        <ul className="grid gap-x-[var(--space-6)] gap-y-[var(--space-2)] font-mono text-sm sm:grid-cols-2 md:grid-cols-4">
          {press.socials.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noreferrer">
                {s.label} →
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-[var(--space-12)] text-sm text-[color:var(--color-muted)]">
          <Link to="/" className="font-mono">
            ← Back to professional home
          </Link>
        </div>
      </Container>
    </section>
  )
}
