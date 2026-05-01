import { useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Container } from '../components/ui/Container'
import { SEO } from '../components/seo/SEO'
import {
  PREVIOUS_ROLES_LABEL,
  PREVIOUS_ROLES_RANGE,
  resume,
  type Role,
} from '../content/resume'

export const Route = createFileRoute('/resume')({
  component: ResumePage,
})

const JSONLD_ID = 'resume-jsonld'
const PRINT_STYLE_ID = 'resume-print-styles'

function ResumePage() {
  const currentRoles = resume.experience.filter((r) => r.current)
  const previousRoles = resume.experience.filter((r) => !r.current)

  useEffect(() => {
    const jsonld = document.createElement('script')
    jsonld.id = JSONLD_ID
    jsonld.type = 'application/ld+json'
    jsonld.textContent = JSON.stringify(buildJsonResume(resume))
    document.head.appendChild(jsonld)

    const style = document.createElement('style')
    style.id = PRINT_STYLE_ID
    style.textContent = PRINT_STYLES
    document.head.appendChild(style)

    return () => {
      jsonld.remove()
      style.remove()
    }
  }, [])

  return (
    <>
      <SEO
        title={`${resume.name} | Résumé`}
        description={`Résumé of ${resume.name}: ${resume.experience[0]?.title} at ${resume.experience[0]?.company}. ${resume.skills[0]?.label} and full-stack architecture.`}
        path="/resume"
      />

      <main className="resume-page pt-24 pb-[var(--space-16)]">
        <Container>
          <header className="resume-header mb-[var(--space-10)] flex flex-wrap items-start justify-between gap-6 border-b border-white/10 pb-[var(--space-8)]">
            <div>
              <h1 className="text-[3rem] leading-none md:text-[3.75rem]">
                {resume.name}
              </h1>
              <p className="mt-3 font-mono text-sm text-[color:var(--color-fg)]/70">
                {resume.location} · {resume.phone} ·{' '}
                <a href={`mailto:${resume.email}`} className="underline-offset-4 hover:underline">
                  {resume.email}
                </a>{' '}
                ·{' '}
                <a
                  href={`https://${resume.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 hover:underline"
                >
                  {resume.github}
                </a>
              </p>
            </div>
            <a
              href={resume.pdfHref}
              download
              className="resume-download inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-[color:var(--color-accent)] px-4 py-2 font-mono text-xs uppercase tracking-wider text-[color:var(--color-accent)] hover:bg-[color:var(--color-accent)] hover:text-[color:var(--color-bg)]"
            >
              Download PDF ↓
            </a>
          </header>

          <Section title="Summary">
            <p className="max-w-[72ch] text-[color:var(--color-fg)]/80">
              {resume.summary}
            </p>
          </Section>

          <Section title="Skills">
            <dl className="grid gap-4">
              {resume.skills.map((g) => (
                <div key={g.label} className="grid gap-2 md:grid-cols-[18rem_1fr] md:gap-6">
                  <dt className="font-mono text-sm uppercase tracking-wider text-[color:var(--color-fg)]/60">
                    {g.label}
                  </dt>
                  <dd className="text-[color:var(--color-fg)]/80">
                    {g.items.join(' · ')}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section title="Experience">
            <div className="flex flex-col gap-[var(--space-8)]">
              {currentRoles.map((role) => (
                <RoleBlock key={`${role.company}-${role.title}`} role={role} />
              ))}

              <div className="mt-[var(--space-4)] border-t border-white/10 pt-[var(--space-6)]">
                <div className="mb-[var(--space-6)] flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-mono text-sm uppercase tracking-wider text-[color:var(--color-fg)]/70">
                    {PREVIOUS_ROLES_LABEL}
                  </h3>
                  <span className="font-mono text-xs text-[color:var(--color-fg)]/50">
                    {PREVIOUS_ROLES_RANGE}
                  </span>
                </div>
                <div className="flex flex-col gap-[var(--space-8)]">
                  {previousRoles.map((role) => (
                    <RoleBlock key={`${role.company}-${role.title}`} role={role} />
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Section title="Education">
            {resume.education.map((ed) => (
              <div
                key={ed.institution}
                className="flex flex-wrap items-baseline justify-between gap-2"
              >
                <div>
                  <p className="text-lg">{ed.institution}</p>
                  <p className="text-[color:var(--color-fg)]/70">{ed.degree}</p>
                </div>
                <p className="font-mono text-sm text-[color:var(--color-fg)]/60">
                  {ed.start} – {ed.end}
                </p>
              </div>
            ))}
          </Section>
        </Container>
      </main>
    </>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-[var(--space-10)]">
      <h2 className="mt-8 mb-[var(--space-4)] font-mono text-xs uppercase tracking-[0.25em] text-[color:var(--color-accent)]">
        {title}
      </h2>
      {children}
    </section>
  )
}

function RoleBlock({ role }: { role: Role }) {
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg">
          <span className="font-semibold">{role.company}</span>
          <span className="text-[color:var(--color-fg)]/50"> · </span>
          <span className="text-[color:var(--color-fg)]/90">{role.title}</span>
        </h3>
        {(role.start || role.end) && (
          <span className="font-mono text-sm text-[color:var(--color-fg)]/60">
            {role.start} {role.end && `– ${role.end}`}
          </span>
        )}
      </div>
      <ul className="flex flex-col gap-2 pl-5">
        {role.bullets.map((b, i) => (
          <li
            key={i}
            className="relative text-[color:var(--color-fg)]/80 before:absolute before:-left-4 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-[color:var(--color-accent)]"
          >
            {b}
          </li>
        ))}
      </ul>
    </div>
  )
}

function buildJsonResume(r: typeof resume) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: r.name,
    email: r.email,
    telephone: r.phone,
    address: { '@type': 'PostalAddress', addressLocality: r.location },
    url: `https://${r.github}`,
    description: r.summary,
    knowsAbout: r.skills.flatMap((s) => s.items),
    alumniOf: r.education.map((e) => ({
      '@type': 'CollegeOrUniversity',
      name: e.institution,
    })),
    hasOccupation: r.experience.map((role) => ({
      '@type': 'Occupation',
      name: role.title,
      occupationLocation: { '@type': 'Organization', name: role.company },
      description: role.bullets.join(' '),
    })),
  }
}

const PRINT_STYLES = `
@media print {
  header.fixed, footer { display: none !important; }
  .resume-download { display: none !important; }
  body { background: #fff !important; color: #111 !important; }
  .resume-page { padding: 0 !important; font-size: 11pt; color: #111; }
  .resume-page * { color: #111 !important; border-color: #ccc !important; }
  .resume-page h1 { font-size: 24pt; }
  .resume-page h2 { color: #333 !important; }
  .resume-page a { color: #111 !important; text-decoration: none; }
  .resume-page .before\\:bg-\\[color\\:var\\(--color-accent\\)\\]::before { background: #111 !important; }
}
`
