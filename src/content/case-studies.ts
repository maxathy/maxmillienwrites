export type CaseStudy = {
  slug: string
  title: string
  blurb: string
  stack: string[]
  status: 'live' | 'coming-soon'
  accent?: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'quiet-horizons',
    title: 'Quiet Horizons TelePsychiatry',
    blurb:
      'HIPAA-compliant Clinical OS. Ambient AI scribe transforms raw WebSocket audio into signed SOAP notes with zero draft-state writes — immutable audit trail by design.',
    stack: ['Angular 21', 'NestJS', 'Drizzle', 'Vertex AI Gemini', 'GCP BAA'],
    status: 'live',
    accent: '#8EE6C8',
  },
  {
    slug: 'puretome',
    title: 'PureTome AI Biographer',
    blurb:
      'Consumer platform that helps authors write memoirs with an adaptive AI partner. Three-brain memory architecture achieving 40% narrative-coherence lift over baseline RAG.',
    stack: ['React 19', 'NestJS', 'LangGraph', 'Neo4j', 'pgvector'],
    status: 'live',
    accent: '#D4FF4F',
  },
  {
    slug: 'agentic-context-system',
    title: 'Agentic Context System',
    blurb:
      'Open-source reference implementation of a layered agent context graph — scope-aware memory, tool affordances, and audit streams.',
    stack: ['TypeScript', 'LangGraph', 'Neo4j', 'MCP'],
    status: 'coming-soon',
    accent: '#7AA7FF',
  },
  {
    slug: 'showcase-02',
    title: 'Showcase Repo #2',
    blurb: 'In progress. Drops with the v1.1 launch of the site.',
    stack: ['TBD'],
    status: 'coming-soon',
    accent: '#E8A2FF',
  },
  {
    slug: 'showcase-03',
    title: 'Showcase Repo #3',
    blurb: 'In progress. Drops with the v1.1 launch of the site.',
    stack: ['TBD'],
    status: 'coming-soon',
    accent: '#FFB86B',
  },
]
