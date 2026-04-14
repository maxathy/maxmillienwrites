import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { Container } from '../../components/ui/Container'
import { SEO } from '../../components/seo/SEO'
import { ossShowcase } from '../../content/oss-showcase'

export const Route = createFileRoute('/work/oss/$slug')({
  loader: ({ params }) => {
    const repo = ossShowcase.find((r) => r.slug === params.slug)
    if (!repo) throw notFound()
    return { repo }
  },
  component: OssDetailPage,
  notFoundComponent: () => (
    <main className="pt-24 pb-[var(--space-16)]">
      <Container>
        <h1 className="text-[2rem]">Repository not found.</h1>
        <Link to="/work" className="mt-4 inline-block underline">
          Back to Work
        </Link>
      </Container>
    </main>
  ),
})

function OssDetailPage() {
  const { repo } = Route.useLoaderData()

  return (
    <>
      <SEO
        title={`${repo.title} — Open source — Max Millien`}
        description={repo.blurb}
        path={repo.detailHref}
      />
      <main className="pt-24 pb-[var(--space-16)]">
        <Container>
          <Link
            to="/work"
            className="mb-[var(--space-6)] inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[color:var(--color-fg)]/60 hover:text-[color:var(--color-fg)]"
          >
            ← Back to Work
          </Link>
          <header className="mb-[var(--space-10)] max-w-[72ch]">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[color:var(--color-fg)]/60">
              Open source · auditable proof
            </p>
            <h1 className="mt-3 font-mono text-[2.25rem] leading-tight md:text-[3rem]">
              {repo.title}
            </h1>
            <p className="mt-6 text-lg text-[color:var(--color-fg)]/80">
              {repo.blurb}
            </p>
            {repo.extractedFrom && (
              <p className="mt-4 text-sm italic text-[color:var(--color-fg)]/55">
                {repo.extractedFrom}
              </p>
            )}
            <ul className="mt-6 flex flex-wrap gap-2">
              {repo.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg)]/70"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={repo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-[var(--radius-pill)] bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-[color:var(--color-bg)]"
              >
                View on GitHub →
              </a>
            </div>
          </header>

          <section className="max-w-[72ch] border-t border-white/10 pt-[var(--space-8)]">
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-[color:var(--color-fg)]/60">
              Architecture deep-dive
            </h2>
            <p className="text-[color:var(--color-fg)]/70">
              Threat model, design decisions, and the extraction note publish
              here in the next content pass. The README in the repo is the
              current source of truth.
            </p>
          </section>
        </Container>
      </main>
    </>
  )
}
