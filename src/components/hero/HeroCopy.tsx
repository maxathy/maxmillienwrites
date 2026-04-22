import { Link } from '@tanstack/react-router'
import { useRef } from 'react'
import { Container } from '../ui/Container'
import { useMagneticHover } from '../../lib/motion'
import { isLabs } from '../../lib/tenant'

const TRUST = [
  'PureTome',
  'Quiet Horizons',
  'SBE Vision',
  'Verizon',
  'G4S',
  'Partners Health',
]

export function HeroCopy() {
  const ctaRef = useRef<HTMLAnchorElement>(null)
  useMagneticHover(ctaRef, 0.25)
  const showHeadshot = !isLabs()

  return (
    <Container className="relative z-10 flex min-h-[calc(100svh-4rem)] flex-col justify-center py-[var(--space-12)]">
      <div className="max-w-[56ch]">
        <div className="mb-6 flex items-center gap-4">
          {showHeadshot && (
            <img
              src="/headshot.jpeg"
              alt="Max Millien"
              width={72}
              height={72}
              loading="eager"
              fetchPriority="high"
              className="h-[72px] w-[72px] rounded-full object-cover"
              style={{
                outline: '1px solid var(--color-accent)',
                outlineOffset: '3px',
              }}
            />
          )}
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-accent)]">
            {showHeadshot ? 'Principal AI Architect' : 'AI Architecture Consultancy'}
          </p>
        </div>

        <h1 className="text-balance">
          Hybrid RAG. Agentic systems.
          <br />
          <span className="text-[color:var(--color-fg)]/70">Ship-grade.</span>
        </h1>

        <p className="mt-6 max-w-[52ch] text-lg text-[color:var(--color-fg)]/75">
          I build production AI infrastructure for companies that can't afford
          to ship a prototype. Ten years full-stack, a decade of platform
          engineering, and a current stack purpose-built for the agentic era.
        </p>

        <div className="mt-[var(--space-4)] flex flex-wrap items-center gap-4">
          <Link
            ref={ctaRef}
            to="/engage"
            hash="book"
            className="inline-flex items-center rounded-[var(--radius-pill)] bg-[color:var(--color-accent)] px-5 py-3 text-sm font-semibold text-[color:var(--color-bg)] transition-shadow hover:shadow-[0_0_0_6px_color-mix(in_oklab,var(--color-accent)_18%,transparent)] will-change-transform"
          >
            Book a 30-min architecture call →
          </Link>
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-white/15 px-5 py-3 text-sm font-medium text-[color:var(--color-fg)] hover:border-[color:var(--color-accent)]"
          >
            See the work ↓
          </a>
        </div>
      </div>

      <div className="mt-[var(--space-8)]" aria-label="Trusted by">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
          Architected for
        </p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[color:var(--color-fg)]/70">
          {TRUST.map((name, i) => (
            <li key={name} className="flex items-center gap-6">
              <span>{name}</span>
              {i < TRUST.length - 1 && (
                <span aria-hidden className="text-[color:var(--color-muted)]">
                  ·
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Container>
  )
}
