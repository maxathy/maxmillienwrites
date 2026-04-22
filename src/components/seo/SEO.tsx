import { useEffect } from 'react'
import { buildMeta } from '../../lib/seo'
import { getTenantMeta } from '../../lib/tenant'

type SEOProps = {
  title?: string
  description?: string
  path?: string
}

function setMeta(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

export function SEO({ title, description, path = '/' }: SEOProps) {
  const tenant = getTenantMeta()
  const meta = buildMeta({
    title: title ?? tenant.defaultTitle,
    description: description ?? tenant.defaultDescription,
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
      'meta[property="og:image"]',
      () => {
        const el = document.createElement('meta')
        el.setAttribute('property', 'og:image')
        return el
      },
      'content',
      meta.ogImage,
    )
    setMeta(
      'meta[property="og:site_name"]',
      () => {
        const el = document.createElement('meta')
        el.setAttribute('property', 'og:site_name')
        return el
      },
      'content',
      meta.siteName,
    )
    setMeta(
      'meta[name="twitter:card"]',
      () => Object.assign(document.createElement('meta'), { name: 'twitter:card' }),
      'content',
      'summary_large_image',
    )
    setMeta(
      'meta[name="twitter:image"]',
      () => Object.assign(document.createElement('meta'), { name: 'twitter:image' }),
      'content',
      meta.ogImage,
    )
  }, [meta.title, meta.description, meta.canonical, meta.ogImage, meta.siteName])

  return null
}
