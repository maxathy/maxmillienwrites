import { Container } from '../ui/Container'
import type { AuthorBook } from '../../content/author'

export function BookSection({ book }: { book: AuthorBook }) {
  return (
    <section id="book" className="py-[var(--space-16)] scroll-mt-24">
      <Container>
        <p className="mb-[var(--space-4)] font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
          The Book
        </p>
        <div className="grid gap-[var(--space-8)] md:grid-cols-[minmax(240px,340px)_1fr] md:items-start">
          <div>
            <img
              src={book.coverSrc}
              alt={book.coverAlt}
              width={340}
              height={510}
              loading="lazy"
              className="w-full rounded-[var(--radius-md)] shadow-2xl"
            />
          </div>
          <div>
            <h2 className="mb-[var(--space-2)]">{book.title}</h2>
            {book.subtitle ? (
              <p className="mb-[var(--space-4)] text-[color:var(--color-muted)] italic">
                {book.subtitle}
              </p>
            ) : null}
            <div className="space-y-[var(--space-3)] text-lg">
              {book.summary.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="mt-[var(--space-6)] flex flex-wrap items-center gap-[var(--space-4)]">
              <a
                href={book.buyUrl}
                target="_blank"
                rel="noreferrer"
                className="author-cta author-cta-primary"
              >
                Buy on Amazon →
              </a>
              <span className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-muted)]">
                Published {book.publishedYear}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
