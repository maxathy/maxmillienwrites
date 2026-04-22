import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Container } from '../ui/Container'
import { NavLink } from './NavLink'
import { isLabs } from '../../lib/tenant'

const LINKS = [
  { to: '/work', label: 'Work' },
  { to: '/stack', label: 'Stack' },
  { to: '/engage', label: 'Engage' },
  { to: '/resume', label: 'Résumé' },
  { to: '/contact', label: 'Contact' },
] as const

export function Nav() {
  const [open, setOpen] = useState(false)
  const labs = isLabs()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[color:var(--color-bg)]/70 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-[color:var(--color-fg)]"
          aria-label={labs ? 'PureTome Labs: home' : 'Max Millien: home'}
        >
          {labs ? (
            <>
              <img
                src="/ptl-logo-small.png"
                alt=""
                width={40}
                height={40}
                className="h-10 w-auto mix-blend-screen"
              />
              <span className="font-mono text-sm tracking-wider">PureTome Labs</span>
            </>
          ) : (
            <span className="font-mono text-sm tracking-wider">
              MM<span className="text-[color:var(--color-accent)]">.</span>
            </span>
          )}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[color:var(--color-fg)] md:hidden"
        >
          <span className="sr-only">Menu</span>
          <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden>
            <rect width="20" height="1.5" y={open ? 6 : 0} fill="currentColor" />
            <rect width="20" height="1.5" y="6" fill="currentColor" opacity={open ? 0 : 1} />
            <rect width="20" height="1.5" y={open ? 6 : 12} fill="currentColor" />
          </svg>
        </button>
      </Container>

      {open && (
        <div className="border-t border-white/5 bg-[color:var(--color-bg)] md:hidden">
          <Container className="flex flex-col gap-4 py-6">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-lg font-medium"
              >
                {l.label}
              </Link>
            ))}
          </Container>
        </div>
      )}
    </header>
  )
}
