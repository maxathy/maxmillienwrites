import { Container } from '../ui/Container'
import type { AuthorHero as AuthorHeroContent } from '../../content/author'

export function AuthorHero({ hero }: { hero: AuthorHeroContent }) {
  return (
    <section className="pt-[var(--space-16)] pb-[var(--space-12)]">
      <Container>
        <div className="grid gap-[var(--space-8)] md:grid-cols-[1.4fr_1fr] md:items-start">
          <div>
            <p className="mb-[var(--space-3)] font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
              Author · Engineer
            </p>
            <h1 className="mb-[var(--space-6)]">{hero.h1}</h1>
            <div className="space-y-[var(--space-3)] text-lg md:text-xl">
              {hero.bio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="mt-[var(--space-6)] flex flex-wrap gap-[var(--space-2)]">
              <a
                href={hero.primaryCta.href}
                target="_blank"
                rel="noreferrer"
                className="author-cta author-cta-primary"
              >
                {hero.primaryCta.label} →
              </a>
              <a
                href={hero.secondaryCta.href}
                target="_blank"
                rel="noreferrer"
                className="author-cta author-cta-secondary"
              >
                {hero.secondaryCta.label} →
              </a>
            </div>
          </div>
          <aside className="md:pt-[var(--space-6)]">
            <p className="pull-quote">{hero.tagline}</p>
          </aside>
        </div>
      </Container>
    </section>
  )
}
