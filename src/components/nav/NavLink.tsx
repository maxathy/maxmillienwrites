import { Link, useMatchRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'

type NavLinkProps = {
  to: string
  children: ReactNode
  exact?: boolean
}

export function NavLink({ to, children, exact = false }: NavLinkProps) {
  const matchRoute = useMatchRoute()
  const active = Boolean(matchRoute({ to, fuzzy: !exact }))

  return (
    <Link
      to={to}
      data-active={active ? 'true' : 'false'}
      className="group relative inline-flex items-center py-2 text-sm font-medium text-[color:var(--color-fg)]/80 transition-colors hover:text-[color:var(--color-fg)] data-[active=true]:text-[color:var(--color-fg)]"
    >
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-1 -bottom-0.5 h-px origin-left scale-x-0 bg-[color:var(--color-accent)] transition-transform duration-[400ms] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-x-100 group-data-[active=true]:scale-x-100"
      />
    </Link>
  )
}
