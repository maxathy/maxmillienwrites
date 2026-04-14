import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-6 py-[var(--space-16)] md:px-10">
      <p className="font-mono text-xs uppercase tracking-widest text-[color:var(--color-accent)]">
        Principal AI Architect
      </p>
      <h1 className="mt-4 max-w-[14ch]">
        Hybrid RAG. Agentic systems. Ship-grade.
      </h1>
      <p className="mt-6 max-w-[60ch] text-lg text-[color:var(--color-fg)]/75">
        Homepage sections (hero mesh, offer, case study rail) land in Phase 3.
        Phase 2 shell — nav, footer, tokens — is now in place.
      </p>
    </section>
  )
}
