import type { CaseStudy } from '../../content/case-studies'

type Props = { study: CaseStudy; index: number }

export function CaseStudyCard({ study, index }: Props) {
  const accent = study.accent ?? 'var(--color-accent)'
  return (
    <a
      href={`/work/${study.slug}`}
      className="rail-card group relative flex shrink-0 snap-start flex-col overflow-hidden rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.02] transition-colors hover:border-white/25"
      style={{
        width: 'clamp(280px, 40vw, 480px)',
        scrollSnapAlign: 'start',
      }}
      aria-label={study.title}
    >
      <div
        aria-hidden
        className="relative h-[240px] overflow-hidden"
        style={{
          background: `radial-gradient(120% 120% at 10% 0%, ${accent}33 0%, transparent 60%), linear-gradient(180deg, #111114, #0A0A0B)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-40 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:opacity-70"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, ${accent}1A 0px, ${accent}1A 1px, transparent 1px, transparent 18px), repeating-linear-gradient(90deg, ${accent}1A 0px, ${accent}1A 1px, transparent 1px, transparent 18px)`,
          }}
        />
        <div className="absolute left-6 top-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-fg)]/70">
          <span>Case · {String(index + 1).padStart(2, '0')}</span>
          {study.status === 'coming-soon' && (
            <span className="rounded-full border border-white/15 px-2 py-0.5 text-[9px]">
              Coming soon
            </span>
          )}
        </div>
        <div
          className="absolute bottom-6 right-6 h-2 w-2 rounded-full transition-transform duration-500 group-hover:scale-[3]"
          style={{ backgroundColor: accent }}
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="text-[1.5rem] leading-tight">{study.title}</h3>
        <p className="text-sm text-[color:var(--color-fg)]/70">{study.blurb}</p>
        <ul className="mt-auto flex flex-wrap gap-2">
          {study.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg)]/70"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </a>
  )
}
