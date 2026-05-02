export type Tenant = 'labs' | 'personal'

export interface TenantMeta {
  tenant: Tenant
  origin: string
  siteName: string
  defaultTitle: string
  defaultDescription: string
  ogImage: string
}

const LABS_HOSTNAME = 'labs.puretome.com'

const PERSONAL_LINKEDIN_URL = 'https://www.linkedin.com/in/maxmill/'
const LABS_LINKEDIN_URL = 'https://www.linkedin.com/company/puretome-labs/'
const PERSONAL_LINKEDIN_LABEL = 'linkedin.com/in/maxmill'
const LABS_LINKEDIN_LABEL = 'linkedin.com/company/puretome-labs'

export function isLabs(): boolean {
  if (typeof window === 'undefined') return false
  return window.location.hostname.includes(LABS_HOSTNAME)
}

export function getTenant(): Tenant {
  return isLabs() ? 'labs' : 'personal'
}

export function getLinkedInUrl(): string {
  return isLabs() ? LABS_LINKEDIN_URL : PERSONAL_LINKEDIN_URL
}

export function getLinkedInLabel(): string {
  return isLabs() ? LABS_LINKEDIN_LABEL : PERSONAL_LINKEDIN_LABEL
}

const PERSONAL_META: TenantMeta = {
  tenant: 'personal',
  origin: 'https://maxmillienwrites.com',
  siteName: 'Max Millien',
  defaultTitle: 'Max Millien | Principal AI Architect | PureTome Labs',
  defaultDescription:
    'Boston-based full-stack architect specializing in hybrid RAG, agentic workflows, and HIPAA-compliant AI systems. Available for C2C engagements.',
  ogImage: '/headshot.jpeg',
}

const LABS_META: TenantMeta = {
  tenant: 'labs',
  origin: 'https://labs.puretome.com',
  siteName: 'PureTome Labs',
  defaultTitle: 'PureTome Labs — AI Architecture, Hybrid RAG, Agentic Systems',
  defaultDescription:
    'Production AI infrastructure: hybrid RAG, agentic systems, and HIPAA-compliant builds. PureTome Labs is the consultancy arm led by Max Millien.',
  ogImage: '/ptl-social.png',
}

export function getTenantMeta(): TenantMeta {
  return isLabs() ? LABS_META : PERSONAL_META
}
