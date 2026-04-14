import { Link } from '@tanstack/react-router'
import { Container } from '../ui/Container'

export function Footer() {
  return (
    <footer className="mt-[var(--space-16)] border-t border-white/5 bg-[color:var(--color-bg)] py-[var(--space-12)] text-sm text-[color:var(--color-fg)]/75">
      <Container>
        <div className="grid gap-[var(--space-8)] md:grid-cols-3">
          <div>
            <h4 className="mb-3 font-mono text-xs uppercase tracking-wider text-[color:var(--color-muted)]">
              Site
            </h4>
            <ul className="space-y-2">
              <li><Link to="/work" className="hover:text-[color:var(--color-fg)]">Work</Link></li>
              <li><Link to="/stack" className="hover:text-[color:var(--color-fg)]">Stack</Link></li>
              <li><Link to="/engage" className="hover:text-[color:var(--color-fg)]">Engage</Link></li>
              <li><Link to="/resume" className="hover:text-[color:var(--color-fg)]">Résumé</Link></li>
              <li><Link to="/contact" className="hover:text-[color:var(--color-fg)]">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-mono text-xs uppercase tracking-wider text-[color:var(--color-muted)]">
              Ecosystem
            </h4>
            <ul className="space-y-2">
              <li><a href="https://puretome.com" className="hover:text-[color:var(--color-fg)]" target="_blank" rel="noreferrer">PureTome</a></li>
              <li><a href="https://blog.puretome.com" className="hover:text-[color:var(--color-fg)]" target="_blank" rel="noreferrer">Writing</a></li>
              <li><a href="https://github.com/maxathy" className="hover:text-[color:var(--color-fg)]" target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a href="https://linkedin.com/in/maxmillien" className="hover:text-[color:var(--color-fg)]" target="_blank" rel="noreferrer">LinkedIn</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-mono text-xs uppercase tracking-wider text-[color:var(--color-muted)]">
              Get in touch
            </h4>
            <ul className="space-y-2">
              <li className="font-mono text-[color:var(--color-fg)]">max.millien@puretome.com</li>
              <li>Greater Boston</li>
              <li><Link to="/engage" hash="book" className="hover:text-[color:var(--color-fg)]">Book a 30-min call →</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-[var(--space-8)] flex items-center gap-5" aria-label="Social">
          <a href="https://github.com/maxathy" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-[color:var(--color-muted)] hover:text-[color:var(--color-fg)]">GitHub</a>
          <a href="https://linkedin.com/in/maxmillien" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-[color:var(--color-muted)] hover:text-[color:var(--color-fg)]">LinkedIn</a>
          <a href="https://blog.puretome.com" target="_blank" rel="noreferrer" aria-label="Medium" className="text-[color:var(--color-muted)] hover:text-[color:var(--color-fg)]">Medium</a>
        </div>

        <div className="mt-[var(--space-6)] flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-[color:var(--color-muted)]">
          <span>© 2026 PureTome Labs</span>
          <Link to="/author" className="hover:text-[color:var(--color-fg)]">
            Also an author →
          </Link>
        </div>
      </Container>
    </footer>
  )
}
