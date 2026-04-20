import { useEffect } from 'react'
import { buildMeta } from '../../lib/seo'

type SEOProps = {
  title?: string
  description?: string
  path?: string
}

const DEFAULT_TITLE = 'Max Millien | Principal AI Architect | PureTome Labs'
const DEFAULT_DESCRIPTION =
  'Boston-based full-stack architect specializing in hybrid RAG, agentic workflows, and HIPAA-compliant AI systems. Available for C2C engagements.'

function setMeta(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

export function SEO({ title, description, path = '/' }: SEOProps) {
  const meta = buildMeta({
    title: title ?? DEFAULT_TITLE,
    description: description ?? DEFAULT_DESCRIPTION,
    path,
  })

  useEffect(() => {
    document.title = meta.title
    setMeta(
      'meta[name="description"]',
      () => Object.assign(document.createElement('meta'), { name: 'description' }),
      'content',
      meta.description,
    )
    setMeta(
      'link[rel="canonical"]',
      () => Object.assign(document.createElement('link'), { rel: 'canonical' }),
      'href',
      meta.canonical,
    )
    setMeta(
      'meta[property="og:title"]',
      () => {
        const el = document.createElement('meta')
        el.setAttribute('property', 'og:title')
        return el
      },
      'content',
      meta.title,
    )
    setMeta(
      'meta[property="og:description"]',
      () => {
        const el = document.createElement('meta')
        el.setAttribute('property', 'og:description')
        return el
      },
      'content',
      meta.description,
    )
    setMeta(
      'meta[property="og:url"]',
      () => {
        const el = document.createElement('meta')
        el.setAttribute('property', 'og:url')
        return el
      },
      'content',
      meta.canonical,
    )
    setMeta(
      'meta[property="og:type"]',
      () => {
        const el = document.createElement('meta')
        el.setAttribute('property', 'og:type')
        return el
      },
      'content',
      'website',
    )
    setMeta(
      'meta[name="twitter:card"]',
      () => Object.assign(document.createElement('meta'), { name: 'twitter:card' }),
      'content',
      'summary_large_image',
    )
  }, [meta.title, meta.description, meta.canonical])

  return null
}
