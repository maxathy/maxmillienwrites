import type { OssContent } from './types'

function Diagram() {
  return (
    <svg
      viewBox="0 0 660 280"
      className="w-full rounded-[var(--radius-md)] border border-white/10 bg-white/[0.02]"
      role="img"
      aria-label="agent-native-monorepo layout: Yarn Berry workspaces containing an api package (NestJS), web package (React 19), and ai-engine package (LangGraph + Vertex AI), with a shared types package all consumed by CI via GitHub Actions."
    >
      <defs>
        <marker id="arrow-anm" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#D4FF4F" />
        </marker>
      </defs>
      <g fontFamily="ui-monospace, SFMono-Regular, monospace" fontSize="11" fill="#F5F4F0">
        <rect x="240" y="20" width="180" height="50" rx="8" fill="none" stroke="#D4FF4F" strokeOpacity="0.5" />
        <text x="330" y="42" textAnchor="middle">packages/shared</text>
        <text x="330" y="58" textAnchor="middle" fillOpacity="0.6">zod · types · utils</text>

        {[
          { x: 30, label: 'packages/api', sub: 'NestJS 11 · DI modules' },
          { x: 240, label: 'packages/web', sub: 'React 19 · server comp.' },
          { x: 450, label: 'packages/ai-engine', sub: 'LangGraph · Vertex AI' },
        ].map((n) => (
          <g key={n.label}>
            <rect x={n.x} y="130" width="180" height="60" rx="8" fill="none" stroke="#F5F4F0" strokeOpacity="0.35" />
            <text x={n.x + 90} y="156" textAnchor="middle">{n.label}</text>
            <text x={n.x + 90} y="172" textAnchor="middle" fillOpacity="0.6">{n.sub}</text>
          </g>
        ))}

        <line x1="280" y1="70" x2="120" y2="130" stroke="#D4FF4F" strokeOpacity="0.5" markerEnd="url(#arrow-anm)" />
        <line x1="330" y1="70" x2="330" y2="130" stroke="#D4FF4F" strokeOpacity="0.5" markerEnd="url(#arrow-anm)" />
        <line x1="380" y1="70" x2="540" y2="130" stroke="#D4FF4F" strokeOpacity="0.5" markerEnd="url(#arrow-anm)" />

        <rect x="180" y="230" width="300" height="40" rx="8" fill="none" stroke="#F5F4F0" strokeOpacity="0.35" />
        <text x="330" y="255" textAnchor="middle">GitHub Actions · affected-graph builds</text>
      </g>
    </svg>
  )
}

export const agentNativeMonorepo: OssContent = {
  slug: 'agent-native-monorepo',
  problem: (
    <>
      <p>
        Most AI-native products start in a single Next.js app, grow a Python sidecar for model
        code, accumulate a Cloud Function or three, and by month six the team is shipping across
        four repos with mismatched TypeScript versions and no way to test an agent change without
        deploying three services. The alternative — a heavyweight polyrepo with a platform team —
        is overkill before you have the engineers to staff it.
      </p>
      <p className="mt-3">
        <span className="font-mono text-[color:var(--color-accent)]">agent-native-monorepo</span>{' '}
        is a reference layout for building an AI product in a single repo without inheriting the
        stack you&rsquo;ll regret in six months. Yarn Berry workspaces, typed boundaries between
        packages, a shared schema package, and a LangGraph-based AI engine exposed as a typed
        package consumable from both API and web tiers. CI builds only the affected graph; local
        dev is one <code>yarn install</code>.
      </p>
    </>
  ),
  architecture: {
    diagram: <Diagram />,
    walkthrough: (
      <>
        <p>
          The repo is four packages. <code>packages/shared</code> holds Zod schemas and
          TypeScript types — every cross-package call is typed end-to-end. <code>packages/api</code>{' '}
          is a NestJS 11 service with dependency-injected modules. <code>packages/web</code> is a
          React 19 app using server components for the public surface. <code>packages/ai-engine</code>{' '}
          is the agent tier: LangGraph orchestration, Vertex AI inference, and the{' '}
          <em>Stateless Specialist Pattern</em> — agents are pure functions over typed state, the
          orchestration graph is the only stateful surface, and every node is independently
          testable.
        </p>
        <p className="mt-3">
          GitHub Actions uses the affected-graph pattern: a change to <code>packages/shared</code>{' '}
          rebuilds everything; a change to <code>packages/web</code> runs only web tests and
          deploys. Workload Identity Federation binds the runner to GCP without long-lived keys.
        </p>
      </>
    ),
  },
  threatModel: (
    <>
      <p>
        <strong>Constraints this enforces:</strong> no package reaches into another&rsquo;s
        internals — only the published interface. Agents cannot be stateful. Side effects live at
        the orchestration boundary, not inside specialist nodes. Shared schemas are the only
        legal cross-package type transport.
      </p>
      <p className="mt-3">
        <strong>What this explicitly does not do:</strong> it is not a platform. There is no
        admin surface, no feature-flag plane, no multi-tenant primitive. The layout scales with
        the team for the first 50 engineers; beyond that, the conventions here are the
        starting point for a platform team, not a substitute for one.
      </p>
    </>
  ),
  extractionNote: (
    <p>
      Extracted from PureTome&rsquo;s production monorepo per the Sanitization Rule. Skeleton,
      workspace conventions, and the Stateless Specialist Pattern are real; domain logic, prompt
      templates, and tenant-specific wiring are generic.
    </p>
  ),
}
