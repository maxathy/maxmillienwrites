import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { SEO } from '../../components/seo/SEO'
import { AuthorHero } from '../../components/author/AuthorHero'
import { BookSection } from '../../components/author/BookSection'
import { AlbumSection } from '../../components/author/AlbumSection'
import { PressSection } from '../../components/author/PressSection'
import { authorContent } from '../../content/author'

const SCHEMA_ID = 'schema-author-book'

function AuthorPage() {
  const { hero, book, album, press } = authorContent

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Book',
      name: book.title,
      author: { '@type': 'Person', name: 'Max Millien' },
      bookFormat: 'https://schema.org/Paperback',
      datePublished: String(book.publishedYear),
      image: book.coverSrc,
      url: book.buyUrl,
      identifier: book.asin,
    }
    let el = document.getElementById(SCHEMA_ID) as HTMLScriptElement | null
    if (!el) {
      el = document.createElement('script')
      el.id = SCHEMA_ID
      el.type = 'application/ld+json'
      document.head.appendChild(el)
    }
    el.textContent = JSON.stringify(schema)
    return () => {
      el?.remove()
    }
  }, [book])

  return (
    <main className="author-surface">
      <SEO
        title="Max Millien — Author of Traffic Engineer"
        description="Memoir, album, and the story behind PureTome. Traffic Engineer is the unflinching account of a systems engineer who had to debug his own life."
        path="/author"
      />
      <AuthorHero hero={hero} />
      <BookSection book={book} />
      <AlbumSection album={album} />
      <PressSection press={press} />
    </main>
  )
}

export const Route = createFileRoute('/author/')({
  component: AuthorPage,
})
