import type { OssShowcase } from '../../content/oss-showcase'

type Props = { repo: OssShowcase; index: number }

export function OssCard({ repo, index }: Props) {
  return (
    <article
      className="oss-card group relative flex shrink-0 snap-start flex-col overflow-hidden rounded-[var(--radius-lg)] border border-white/10 bg-[#0A0A0B] transition-colors hover:border-white/30"
      style={{
        width: 'clamp(300px, 42vw, 520px)',
        scrollSnapAlign: 'start',
      }}
      aria-label={repo.title}
    >
      <div
        aria-hidden
        className="relative h-[160px] overflow-hidden border-b border-white/10"
        style={{
          background:
            'linear-gradient(180deg, #0E0E12 0%, #0A0A0B 100%)',
        }}
      >
        <div
          className="absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-60"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 22px), repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 22px)',
          }}
        />
        <div className="absolute left-6 top-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-fg)]/60">
          <span>OSS · {String(index + 1).padStart(2, '0')}</span>
          <span className="rounded-full border border-white/15 px-2 py-0.5 text-[9px] normal-case tracking-normal">
            Auditable
          </span>
        </div>
        <div className="absolute bottom-6 left-6 font-mono text-xs text-[color:var(--color-fg)]/70">
          <span className="text-[color:var(--color-fg)]/40">$ </span>
          git clone {repo.title}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="font-mono text-[1.125rem] leading-tight text-[color:var(--color-fg)]">
          {repo.title}
        </h3>
        <p className="text-sm text-[color:var(--color-fg)]/70">{repo.blurb}</p>
        <ul className="flex flex-wrap gap-2">
          {repo.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg)]/60"
            >
              {tech}
            </li>
          ))}
        </ul>
        {repo.extractedFrom && (
          <p className="text-[11px] italic text-[color:var(--color-fg)]/45">
            {repo.extractedFrom}
          </p>
        )}
        <div className="mt-auto flex flex-wrap items-center gap-4 pt-2">
          <a
            href={repo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[color:var(--color-fg)] hover:text-[color:var(--color-accent)]"
          >
            View on GitHub →
          </a>
          <a
            href={repo.detailHref}
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[color:var(--color-fg)]/60 hover:text-[color:var(--color-fg)]"
          >
            Read the architecture →
          </a>
        </div>
      </div>
    </article>
  )
}
