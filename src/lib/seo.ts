export interface MetaInput {
  title: string
  description: string
  path: string
}

export interface MetaOutput {
  title: string
  description: string
  canonical: string
}

const SITE_ORIGIN = 'https://maxmillienwrites.com'

export function buildMeta({ title, description, path }: MetaInput): MetaOutput {
  const canonical = new URL(path, SITE_ORIGIN).toString()
  return { title, description, canonical }
}
