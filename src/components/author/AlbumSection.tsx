import { useEffect, useRef, useState } from 'react'
import { Container } from '../ui/Container'
import type { AuthorAlbum } from '../../content/author'

export function AlbumSection({ album }: { album: AuthorAlbum }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true)
          io.disconnect()
        }
      },
      { rootMargin: '400px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      id="album"
      className="border-t border-[color:var(--color-muted)]/20 py-[var(--space-16)] scroll-mt-24"
    >
      <Container>
        <p className="mb-[var(--space-4)] font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
          The Soundtrack
        </p>
        <h2 className="mb-[var(--space-4)]">{album.title}</h2>
        <p className="mb-[var(--space-8)] text-lg">{album.intro}</p>

        <div
          ref={ref}
          className="overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--color-muted)]/20"
          style={{ minHeight: 352 }}
        >
          {visible ? (
            <iframe
              src={album.spotifyEmbedUrl}
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Max Millien on Spotify"
              className="block w-full"
              style={{ border: 0, minHeight: 352 }}
            />
          ) : (
            <div
              aria-hidden
              className="flex items-center justify-center font-mono text-xs uppercase tracking-wider text-[color:var(--color-muted)]"
              style={{ minHeight: 352 }}
            >
              Player loading…
            </div>
          )}
        </div>

        <div className="mt-[var(--space-6)] flex flex-wrap gap-[var(--space-6)] font-mono text-sm">
          <a href={album.appleUrl} target="_blank" rel="noreferrer">
            Listen on Apple Music →
          </a>
          <a href={album.youtubeUrl} target="_blank" rel="noreferrer">
            Watch on YouTube →
          </a>
        </div>
      </Container>
    </section>
  )
}
