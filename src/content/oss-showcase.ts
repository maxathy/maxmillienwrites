export type OssShowcase = {
  slug: string
  title: string
  blurb: string
  stack: string[]
  githubUrl: string
  detailHref: string
  extractedFrom?: string
}

export const ossShowcase: OssShowcase[] = [
  {
    slug: 'agent-native-monorepo',
    title: 'agent-native-monorepo',
    blurb:
      "A reference monorepo for building AI-native products without inheriting a stack you'll regret in six months. Yarn Berry workspaces, NestJS API, React 19 client, and a TypeScript AI engine package wired with LangGraph and Vertex AI. Demonstrates the Stateless Specialist Pattern: agents are pure functions over typed state, the orchestration graph is the only stateful surface, and every node is independently testable in isolation.",
    stack: [
      'Yarn Berry',
      'TypeScript',
      'NestJS',
      'React 19',
      'LangGraph',
      'Vertex AI',
      'GitHub Actions',
    ],
    githubUrl: 'https://github.com/maxathy/agent-native-monorepo',
    detailHref: '/work/oss/agent-native-monorepo',
    extractedFrom:
      "Extracted from PureTome's production monorepo. IP scrubbed per the Sanitization Rule: the skeleton, conventions, and orchestration patterns are real; the domain logic is generic.",
  },
  {
    slug: 'secure-data-vault',
    title: 'secure-data-vault',
    blurb:
      'A drop-in field-level encryption layer for Postgres + Drizzle ORM, designed for PHI/PII workloads under HIPAA or SOC 2. Transparent AES-256-GCM at the column level using Google Tink for key management, with envelope encryption against GCP KMS. Includes a deterministic-search variant for encrypted-column lookups without hauling the entire table into memory. The README includes the threat model, the audit-trail expectations, and what this doesn\u2019t protect against.',
    stack: ['TypeScript', 'NestJS', 'Drizzle', 'Postgres', 'Google Tink', 'GCP KMS'],
    githubUrl: 'https://github.com/maxathy/secure-data-vault',
    detailHref: '/work/oss/secure-data-vault',
    extractedFrom: "Extracted from Quiet Horizons' encryption-at-rest layer.",
  },
  {
    slug: 'realtime-voice-infra',
    title: 'realtime-voice-infra',
    blurb:
      'A production-grade pipeline for streaming audio dictation into structured AI output without buffering to disk. Browser captures audio → secure WebSocket → Google Speech-to-Text → Gemini for structured extraction → typed result back to the client. Includes back-pressure handling, reconnect semantics, and a stateless inference path that never persists draft transcripts (designed for regulated environments where draft-state writes are an audit liability).',
    stack: [
      'TypeScript',
      'NestJS',
      'WebSockets',
      'Google Speech-to-Text',
      'Vertex AI Gemini',
      'Cloud Run',
    ],
    githubUrl: 'https://github.com/maxathy/realtime-voice-infra',
    detailHref: '/work/oss/realtime-voice-infra',
    extractedFrom: "Extracted from Quiet Horizons' ambient scribe pipeline.",
  },
]
