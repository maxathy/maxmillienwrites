import { getTenantMeta } from './tenant'

export interface MetaInput {
  title: string
  description: string
  path: string
}

export interface MetaOutput {
  title: string
  description: string
  canonical: string
  ogImage: string
  siteName: string
}

export function buildMeta({ title, description, path }: MetaInput): MetaOutput {
  const tenant = getTenantMeta()
  const canonical = new URL(path, tenant.origin).toString()
  const ogImage = new URL(tenant.ogImage, tenant.origin).toString()
  return {
    title,
    description,
    canonical,
    ogImage,
    siteName: tenant.siteName,
  }
}
