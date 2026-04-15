import {
  stackGroupMeta,
  stackNodes,
  type StackGroupKey,
} from '../../content/stack'

export function StackGraphFallback() {
  const ordered = (Object.keys(stackGroupMeta) as StackGroupKey[]).sort(
    (a, b) => stackGroupMeta[a].order - stackGroupMeta[b].order,
  )
  return (
    <div className="flex flex-col gap-6">
      {ordered.map((k) => {
        const groupNodes = stackNodes.filter((n) => n.group === k)
        const color = `var(${stackGroupMeta[k].colorVar})`
        return (
          <section key={k} aria-label={stackGroupMeta[k].label}>
            <div className="mb-3 flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: color }}
                aria-hidden
              />
              <span
                className="font-mono text-xs uppercase tracking-[0.25em]"
                style={{ color }}
              >
                {stackGroupMeta[k].label}
              </span>
            </div>
            <div
              className="flex snap-x gap-3 overflow-x-auto pb-2"
              style={{
                maskImage:
                  'linear-gradient(to right, black 92%, transparent 100%)',
                WebkitMaskImage:
                  'linear-gradient(to right, black 92%, transparent 100%)',
              }}
            >
              {groupNodes.map((n) => (
                <article
                  key={n.id}
                  className="min-w-[260px] max-w-[260px] snap-start rounded-[var(--radius-md)] border border-white/10 bg-white/[0.02] p-3"
                >
                  <div className="font-mono text-sm text-[color:var(--color-fg)]">
                    {n.name}
                  </div>
                  <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-[color:var(--color-fg)]/70">
                    {n.note}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}

export default StackGraphFallback
