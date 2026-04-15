import { useState } from 'react'
import { stack, stackGroups, type StackEntry, type StackGroup } from '../../content/stack'

const byGroup: Record<StackGroup, StackEntry[]> = stackGroups.reduce(
  (acc, group) => {
    acc[group] = stack.filter((entry) => entry.group === group)
    return acc
  },
  {} as Record<StackGroup, StackEntry[]>,
)

export function StackGrid() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 gap-[var(--space-6)] md:grid-cols-5 md:gap-[var(--space-4)]">
      {stackGroups.map((group) => {
        const entries = byGroup[group]
        const expandedInColumn = entries.find((e) => e.name === expanded)
        return (
          <div key={group} className="flex flex-col">
            <h2 className="mb-[var(--space-3)] font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-fg)]/60">
              {group}
            </h2>
            <ul className="flex flex-col gap-2">
              {entries.map((entry) => {
                const isActive = expanded === entry.name
                return (
                  <li key={entry.name}>
                    <button
                      type="button"
                      aria-expanded={isActive}
                      aria-controls={`stack-note-${slugify(entry.name)}`}
                      onClick={() =>
                        setExpanded((prev) => (prev === entry.name ? null : entry.name))
                      }
                      className={`w-full rounded-[var(--radius-pill)] border px-3 py-1.5 text-left font-mono text-[11px] uppercase tracking-wider transition-[transform,border-color,background-color] duration-200 ${
                        isActive
                          ? 'border-[color:var(--color-accent)] bg-[color:var(--color-accent)]/10 text-[color:var(--color-fg)]'
                          : 'border-white/10 bg-transparent text-[color:var(--color-fg)]/75 hover:-translate-y-[1px] hover:border-[color:var(--color-accent)]/60 hover:text-[color:var(--color-fg)]'
                      }`}
                    >
                      {entry.name}
                    </button>
                  </li>
                )
              })}
            </ul>
            {expandedInColumn && (
              <div
                id={`stack-note-${slugify(expandedInColumn.name)}`}
                role="region"
                aria-label={`${expandedInColumn.name} operator note`}
                className="mt-[var(--space-3)] rounded-[var(--radius-md)] border border-white/10 bg-white/[0.02] p-[var(--space-3)] text-sm text-[color:var(--color-fg)]/80"
              >
                <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-accent)]">
                  {expandedInColumn.name}
                </p>
                {expandedInColumn.note}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}
