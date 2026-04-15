export type StackGroup =
  | 'AI & Data Intelligence'
  | 'Backend'
  | 'Frontend'
  | 'Infrastructure'
  | 'Compliance & Security'

export type StackEntry = {
  group: StackGroup
  name: string
  note: string
}

export const stackGroups: StackGroup[] = [
  'AI & Data Intelligence',
  'Backend',
  'Frontend',
  'Infrastructure',
  'Compliance & Security',
]

export const stack: StackEntry[] = [
  // AI & Data Intelligence
  {
    group: 'AI & Data Intelligence',
    name: 'Hybrid RAG',
    note: 'Graph + vector retrieval fused at inference time — Neo4j supplies causal structure, pgvector supplies semantic recall, and a reranker resolves disagreements before the model ever sees the context.',
  },
  {
    group: 'AI & Data Intelligence',
    name: 'Neo4j',
    note: 'Narrative causality graphs for memoir structure — nodes are story beats, edges are causal relationships, queried at inference time to keep AI suggestions internally consistent.',
  },
  {
    group: 'AI & Data Intelligence',
    name: 'pgvector',
    note: 'Semantic recall layer for manuscript chunks — IVFFlat index at 1536 dimensions, queried alongside Neo4j for hybrid retrieval that beats either in isolation.',
  },
  {
    group: 'AI & Data Intelligence',
    name: 'LangGraph',
    note: 'Stateful agent orchestration — pure-function nodes over typed state, deterministic transitions, and every edge independently replayable for debugging agent behavior.',
  },
  {
    group: 'AI & Data Intelligence',
    name: 'MCP',
    note: 'Model Context Protocol servers expose internal tools to Claude and other agents — typed boundaries replace prompt-engineered tool use, and permissions live in the server, not the prompt.',
  },
  {
    group: 'AI & Data Intelligence',
    name: 'Vertex AI',
    note: 'Managed inference for production workloads — model endpoints isolated per tenant, with region pinning and VPC-SC for regulated data paths.',
  },
  {
    group: 'AI & Data Intelligence',
    name: 'Gemini',
    note: 'Primary long-context model for structured extraction — 1M-token window used for whole-document reasoning without chunking compromises.',
  },
  {
    group: 'AI & Data Intelligence',
    name: 'Claude Code',
    note: 'Development loop itself — subagents for research, skills for repeatable workflows, and hooks for guardrails. The CI of the editor.',
  },

  // Backend
  {
    group: 'Backend',
    name: 'NestJS 11',
    note: 'Dependency-injected modular monolith — same decorators scale from a single Cloud Run service to a federated graph without rewriting boundaries.',
  },
  {
    group: 'Backend',
    name: 'Node.js',
    note: 'Runtime baseline — LTS-pinned, tuned with --max-old-space-size for the worker tier and AbortController-aware for every outbound call.',
  },
  {
    group: 'Backend',
    name: 'Drizzle',
    note: 'Type-safe SQL without the ORM abstraction tax — migrations generated from schema, relations inferred, raw SQL still a first-class citizen when the query planner disagrees.',
  },
  {
    group: 'Backend',
    name: 'Postgres',
    note: 'Source of truth for everything transactional — JSONB for flexible fields, pgvector for embeddings, row-level security for tenant isolation.',
  },
  {
    group: 'Backend',
    name: 'Redis/Bull',
    note: 'In-process job queues for bounded workloads — delayed jobs, priority lanes, and a dashboard that tells the on-call what the queue is actually doing.',
  },
  {
    group: 'Backend',
    name: 'QStash',
    note: 'Durable HTTP-based queue for cross-service fan-out — retries, DLQ, and signed requests that survive regional failover without sticky state.',
  },
  {
    group: 'Backend',
    name: 'Cloud Pub/Sub',
    note: 'Backbone for event-driven pipelines — at-least-once delivery, dead-letter topics, and per-subscription concurrency limits tuned for the downstream\'s throughput.',
  },

  // Frontend
  {
    group: 'Frontend',
    name: 'Angular 21',
    note: 'Signals-based reactivity for the enterprise product surface — strict templates, standalone components, and deferrable views for slow-path panels.',
  },
  {
    group: 'Frontend',
    name: 'React 19',
    note: 'Server components + suspense for marketing and content surfaces — lower TTI than Angular for the public-facing cuts where first paint matters most.',
  },
  {
    group: 'Frontend',
    name: 'Spartan UI',
    note: 'Headless component primitives for Angular — the shadcn of the Angular world, so design-system tokens flow from Figma to Tailwind to runtime without a component library fighting back.',
  },
  {
    group: 'Frontend',
    name: 'Tailwind v4',
    note: 'CSS-first config via @theme — design tokens live in one stylesheet, no JS config file, and the compiler only emits what the markup uses.',
  },
  {
    group: 'Frontend',
    name: 'TypeScript',
    note: 'Strict mode across every workspace — no implicit any, exhaustive switch on discriminated unions, and zod at every I/O boundary so runtime types match compile-time ones.',
  },

  // Infrastructure
  {
    group: 'Infrastructure',
    name: 'GCP',
    note: 'Primary cloud — Cloud Run for stateless services, GKE for anything with persistent connections, and VPC-SC perimeters around every HIPAA-scoped project.',
  },
  {
    group: 'Infrastructure',
    name: 'Terraform',
    note: 'Infrastructure-as-code across all environments — modules versioned per team, state in GCS with object-level locking, and a CI gate that blocks plans with destructive diffs.',
  },
  {
    group: 'Infrastructure',
    name: 'Kubernetes',
    note: 'GKE Autopilot for stateful workloads — HPA on custom metrics, PodDisruptionBudgets tuned to SLO, and Istio for mTLS between namespaces.',
  },
  {
    group: 'Infrastructure',
    name: 'Docker',
    note: 'Multi-stage builds with distroless base images — <80MB images, no shell in production, and SBOMs generated at build time for the compliance trail.',
  },
  {
    group: 'Infrastructure',
    name: 'GitHub Actions',
    note: 'CI/CD for every repo — reusable workflows for the standard paths, Workload Identity Federation for GCP auth (no long-lived keys), and required checks enforced on main.',
  },
  {
    group: 'Infrastructure',
    name: 'Firebase',
    note: 'Hosting + Functions for marketing surfaces and lightweight handlers — SPA rewrites, long-cache headers on /assets/*, and a deploy pipeline that fits in a single workflow file.',
  },

  // Compliance & Security
  {
    group: 'Compliance & Security',
    name: 'HIPAA/BAA',
    note: 'Every vendor in the data path signs a BAA before PHI crosses the boundary — GCP, Resend, Sentry, all of it. No exceptions, no "low-risk" dispensations.',
  },
  {
    group: 'Compliance & Security',
    name: 'AES-256-GCM',
    note: 'Column-level PHI encryption via Drizzle middleware, keys rotated via GCP KMS with envelope encryption. Ciphertext never leaves the database; plaintext never leaves memory.',
  },
  {
    group: 'Compliance & Security',
    name: 'Google DLP',
    note: 'PII/PHI scanning on every inbound document — inferred types surfaced to the user for confirmation, and an audit trail of what was detected where.',
  },
  {
    group: 'Compliance & Security',
    name: 'Tink',
    note: 'Google\'s cryptographic library — opinionated APIs that make the insecure choice hard, keysets versioned and rotated without downtime.',
  },
  {
    group: 'Compliance & Security',
    name: 'OAuth2/JWT',
    note: 'Short-lived access tokens, refresh rotation, and a revocation list for the sensitive scopes. No cookies crossing the tenant boundary.',
  },
]
