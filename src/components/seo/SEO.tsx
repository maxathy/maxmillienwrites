import { buildMeta } from '../../lib/seo'

type SEOProps = {
  title?: string
  description?: string
  path?: string
}

const DEFAULT_TITLE = 'Max Millien — Principal AI Architect | PureTome Labs'
const DEFAULT_DESCRIPTION =
  'Boston-based full-stack architect specializing in hybrid RAG, agentic workflows, and HIPAA-compliant AI systems. Available for C2C engagements.'

export function SEO({ title, description, path = '/' }: SEOProps) {
  const meta = buildMeta({
    title: title ?? DEFAULT_TITLE,
    description: description ?? DEFAULT_DESCRIPTION,
    path,
  })

  return (
    <>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={meta.canonical} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={meta.canonical} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  )
}
