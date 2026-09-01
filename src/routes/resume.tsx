import { useEffect } from 'react'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Container } from '../components/ui/Container'
import { SEO } from '../components/seo/SEO'
import { isLabs } from '../lib/tenant'
import {
  PREVIOUS_ROLES_LABEL,
  resume,
  type Role,
} from '../content/resume'

export const Route = createFileRoute('/resume')({
  beforeLoad: () => {
    if (isLabs()) throw redirect({ to: '/work' })
  },
  component: ResumePage,
})

const JSONLD_ID = 'resume-jsonld'
const PRINT_STYLE_ID = 'resume-print-styles'

function ResumePage() {
  const currentRoles = resume.experience.filter((r) => r.current)
  const previousRoles = resume.experience.filter(
    (r) => !r.current && r.inHighlights !== false,
  )

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
              <p className="mt-3 font-mono text-xs text-[color:var(--color-fg)]/70">
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

          <Section title="Open Source">
            <div className="flex flex-col gap-2">
              <p className="text-[color:var(--color-fg)]/80">
                <span className="font-semibold text-[color:var(--color-fg)]">Contributions:</span>{' '}
                {resume.openSource.contributionsPrefix}{' '}
                {resume.openSource.contributionRepos.map((r, i) => (
                  <span key={r}>
                    {i > 0 && ' and '}
                    <span className="font-semibold text-[color:var(--color-fg)]">{r}</span>
                  </span>
                ))}
              </p>
              <p className="font-semibold text-[color:var(--color-fg)]">Projects:</p>
              <ul className="flex flex-col gap-1">
                {resume.openSource.projects.map((p) => (
                  <li key={p.name} className="text-[color:var(--color-fg)]/80">
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[color:var(--color-fg)] underline-offset-4 hover:underline"
                    >
                      {p.name}
                    </a>
                    <span className="text-[color:var(--color-fg)]/50"> – </span>
                    {p.blurb}
                  </li>
                ))}
              </ul>
            </div>
          </Section>

          <Section title="Experience">
            <div className="flex flex-col gap-[var(--space-8)]">
              {currentRoles.map((role) => (
                <RoleBlock key={`${role.company}-${role.title}`} role={role} showDates />
              ))}

              <div className="mt-[var(--space-4)] border-t border-white/10 pt-[var(--space-6)]">
                <div className="mb-[var(--space-6)] flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-mono text-sm uppercase tracking-wider text-[color:var(--color-fg)]/70">
                    {PREVIOUS_ROLES_LABEL}
                  </h3>
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
                {/* Education dates live in resume.ts but stay off the public page. */}
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

// The page is the curated dateless presentation: only current roles show dates.
// resume.ts still carries the true dates for every role; they just aren't printed
// here. The dated chronology lives in the Drive doc used for submissions.
function RoleBlock({ role, showDates = false }: { role: Role; showDates?: boolean }) {
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg">
          <span className="font-semibold">{role.company}</span>
          <span className="text-[color:var(--color-fg)]/50"> · </span>
          <span className="text-[color:var(--color-fg)]/90">{role.title}</span>
        </h3>
        {showDates && (role.start || role.end) && (
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
  @page { margin: 0; }
  html, body { background: #fff !important; }
  * { background: transparent !important; box-shadow: none !important; text-shadow: none !important; }
  header.fixed, footer { display: none !important; }
  .resume-download { display: none !important; }
  body { color: #111 !important; }
  .pt-16 { padding-top: 0 !important; }
  .min-h-screen { min-height: 0 !important; }
  .resume-page {
    --space-2: 3pt;
    --space-4: 4pt;
    --space-6: 6pt;
    --space-8: 7pt;
    --space-10: 9pt;
    --space-16: 0pt;
    /* Density tuned so the page prints to 2 sheets; the Open Source blurbs
       cost ~4 lines. Re-check the page count after editing resume.ts. */
    padding: 10mm 14mm 5mm !important;
    font-size: 10pt;
    line-height: 1.28;
    color: #111;
  }
  .resume-page section:last-child { margin-bottom: 0 !important; }
  .resume-page dl > div { grid-template-columns: 16em 1fr !important; gap: 2pt 10pt !important; }
  .resume-page * { color: #111 !important; border-color: #ccc !important; }
  .resume-page h1 { font-size: 20pt !important; }
  .resume-header p { font-size: 8.5pt !important; white-space: nowrap; }
  .resume-page h2 { color: #333 !important; font-size: 11pt !important; margin-top: 8pt !important; margin-bottom: 4pt !important; }
  .resume-page h3, .resume-page .text-lg { font-size: 10.5pt !important; }
  .resume-page .mb-3 { margin-bottom: 2pt !important; }
  .resume-page ul, .resume-page dl { gap: 2pt !important; }
  .resume-page li { break-inside: avoid; }
  .resume-page h2, .resume-page h3 { break-after: avoid; }
  .resume-page a { color: #111 !important; text-decoration: none; }
  .resume-page .before\\:bg-\\[color\\:var\\(--color-accent\\)\\]::before { background: #111 !important; }
}
`
