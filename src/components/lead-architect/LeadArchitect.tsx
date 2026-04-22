import { Link } from '@tanstack/react-router'
import { Container } from '../ui/Container'

export function LeadArchitect() {
  return (
    <section
      aria-label="The Lead Architect"
      className="relative border-t border-white/5 py-[var(--space-16)]"
    >
      <Container>
        <div className="grid items-start gap-[var(--space-8)] md:grid-cols-[auto_1fr]">
          <img
            src="/headshot.jpeg"
            alt="Max Millien"
            width={220}
            height={220}
            loading="lazy"
            className="h-[180px] w-[180px] rounded-full object-cover md:h-[220px] md:w-[220px]"
            style={{
              outline: '1px solid var(--color-accent)',
              outlineOffset: '4px',
            }}
          />
          <div className="max-w-[60ch]">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-accent)]">
              Max Millien · Principal AI Architect
            </p>
            <p className="mt-[var(--space-2)] text-lg text-[color:var(--color-fg)]/80">
              Max leads PureTome Labs. Over a decade of full-stack experience and platform engineering refined into a single mission: building high-performance, robust AI infrastructure that remembers what others forget.
              Max specializes in hybrid RAG and agentic workflows, engineering the "Armory" that empowers authors to own their legacy. Systems built on honesty, accountability, and technical depth.
            </p>
            <div className="mt-[var(--space-4)] flex flex-wrap items-center gap-4">
              <Link
                to="/engage"
                hash="book"
                className="inline-flex items-center rounded-[var(--radius-pill)] bg-[color:var(--color-accent)] px-5 py-3 text-sm font-semibold text-[color:var(--color-bg)] transition-shadow hover:shadow-[0_0_0_6px_color-mix(in_oklab,var(--color-accent)_18%,transparent)]"
              >
                Book a 30-min architecture call →
              </Link>
              <Link
                to="/resume"
                className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-white/15 px-5 py-3 text-sm font-medium text-[color:var(--color-fg)] hover:border-[color:var(--color-accent)]"
              >
                Read the résumé ↗
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
