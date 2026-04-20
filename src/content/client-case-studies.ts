export type ClientCaseStudy = {
  slug: string
  title: string
  blurb: string
  stack: string[]
  detailHref: string
  accent?: string
}

export const clientCaseStudies: ClientCaseStudy[] = [
  {
    slug: 'quiet-horizons',
    title: 'Quiet Horizons TelePsychiatry',
    blurb:
      'HIPAA-compliant Clinical OS for a concierge psychiatric practice. Ambient AI scribe transforms raw WebSocket audio into signed SOAP notes with zero draft-state writes; immutable audit trail enforced at the schema layer.',
    stack: ['Angular 21', 'NestJS', 'Drizzle', 'Vertex AI Gemini', 'GCP BAA'],
    detailHref: '/work/quiet-horizons',
    accent: '#8EE6C8',
  },
  {
    slug: 'puretome',
    title: 'PureTome AI Biographer',
    blurb:
      'Consumer platform that helps authors write memoirs with an adaptive AI partner. Three-brain memory architecture (RAG + episodic + author profile) achieved a 40% narrative-coherence lift over baseline RAG.',
    stack: ['React 19', 'NestJS', 'LangGraph', 'Neo4j', 'pgvector'],
    detailHref: '/work/puretome',
    accent: '#D4FF4F',
  },
]
