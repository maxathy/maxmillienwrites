import type { ClientCaseStudyContent } from './types'

function ThreeBrainDiagram() {
  return (
    <svg
      viewBox="0 0 680 320"
      className="w-full rounded-[var(--radius-md)] border border-white/10 bg-white/[0.02]"
      role="img"
      aria-label="PureTome three-brain memory topology: the web client calls the main API, which owns the MongoDB ground-truth store. On every request the main API assembles a briefing package and calls the stateless AI service, which reads from two further memory stores: pgvector (the Library, for semantic recall over manuscript chunks) and Neo4j (the Journal, for episodic memory and author identity)."
    >
      <defs>
        <marker id="arrow-pt-brain" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#D4FF4F" />
        </marker>
        <marker id="arrow-pt-brain-muted" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#F5F4F0" fillOpacity="0.5" />
        </marker>
      </defs>
      <g fontFamily="ui-monospace, SFMono-Regular, monospace" fontSize="11" fill="#F5F4F0">
        <rect x="20" y="20" width="120" height="56" rx="8" fill="none" stroke="#F5F4F0" strokeOpacity="0.3" />
        <text x="80" y="46" textAnchor="middle">Web</text>
        <text x="80" y="62" textAnchor="middle" fillOpacity="0.6">React 19</text>

        <rect x="200" y="20" width="160" height="56" rx="8" fill="none" stroke="#F5F4F0" strokeOpacity="0.3" />
        <text x="280" y="46" textAnchor="middle">Main API</text>
        <text x="280" y="62" textAnchor="middle" fillOpacity="0.6">Express · owns ground truth</text>

        <rect x="420" y="20" width="200" height="56" rx="8" fill="none" stroke="#F5F4F0" strokeOpacity="0.3" />
        <text x="520" y="46" textAnchor="middle">Ground Truth</text>
        <text x="520" y="62" textAnchor="middle" fillOpacity="0.6">MongoDB · memoir + profile</text>

        <line x1="140" y1="48" x2="200" y2="48" stroke="#F5F4F0" strokeOpacity="0.5" markerEnd="url(#arrow-pt-brain-muted)" />
        <line x1="360" y1="48" x2="420" y2="48" stroke="#F5F4F0" strokeOpacity="0.5" markerEnd="url(#arrow-pt-brain-muted)" />

        <rect x="200" y="140" width="240" height="64" rx="8" fill="none" stroke="#D4FF4F" strokeOpacity="0.6" />
        <text x="320" y="168" textAnchor="middle">AI Service (stateless)</text>
        <text x="320" y="186" textAnchor="middle" fillOpacity="0.6">NestJS · LangGraph</text>

        <line x1="280" y1="76" x2="280" y2="140" stroke="#D4FF4F" strokeOpacity="0.8" markerEnd="url(#arrow-pt-brain)" />
        <text x="292" y="112" fillOpacity="0.85">briefing package</text>

        <rect x="40" y="250" width="200" height="56" rx="8" fill="none" stroke="#F5F4F0" strokeOpacity="0.3" />
        <text x="140" y="276" textAnchor="middle">Library</text>
        <text x="140" y="292" textAnchor="middle" fillOpacity="0.6">pgvector · semantic recall</text>

        <rect x="400" y="250" width="200" height="56" rx="8" fill="none" stroke="#F5F4F0" strokeOpacity="0.3" />
        <text x="500" y="276" textAnchor="middle">Journal</text>
        <text x="500" y="292" textAnchor="middle" fillOpacity="0.6">Neo4j · episodic graph</text>

        <line x1="260" y1="204" x2="180" y2="250" stroke="#D4FF4F" strokeOpacity="0.6" markerEnd="url(#arrow-pt-brain)" />
        <line x1="380" y1="204" x2="460" y2="250" stroke="#D4FF4F" strokeOpacity="0.6" markerEnd="url(#arrow-pt-brain)" />
      </g>
    </svg>
  )
}

function OrchestrationDiagram() {
  return (
    <svg
      viewBox="0 0 680 260"
      className="w-full rounded-[var(--radius-md)] border border-white/10 bg-white/[0.02]"
      role="img"
      aria-label="PureTome chat orchestration flow: the conductor classifies intent and selects a persona, then fans out in parallel to load journal state and retrieve RAG context. Both feed a generate node that routes between discovery and synthesis modes based on conversation depth. The generate node then fans out in parallel to suggestion generation, PII deidentification, and asynchronous persistence to the journal."
    >
      <defs>
        <marker id="arrow-pt-flow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#D4FF4F" />
        </marker>
        <marker id="arrow-pt-flow-muted" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#F5F4F0" fillOpacity="0.5" />
        </marker>
      </defs>
      <g fontFamily="ui-monospace, SFMono-Regular, monospace" fontSize="11" fill="#F5F4F0">
        <rect x="20" y="100" width="120" height="60" rx="8" fill="none" stroke="#F5F4F0" strokeOpacity="0.3" />
        <text x="80" y="128" textAnchor="middle">Conductor</text>
        <text x="80" y="144" textAnchor="middle" fillOpacity="0.6">intent · persona</text>

        <rect x="180" y="24" width="160" height="52" rx="8" fill="none" stroke="#F5F4F0" strokeOpacity="0.3" />
        <text x="260" y="46" textAnchor="middle">loadAndTransform</text>
        <text x="260" y="62" textAnchor="middle" fillOpacity="0.6">journal · goals</text>

        <rect x="180" y="184" width="160" height="52" rx="8" fill="none" stroke="#F5F4F0" strokeOpacity="0.3" />
        <text x="260" y="206" textAnchor="middle">retrieveRagContext</text>
        <text x="260" y="222" textAnchor="middle" fillOpacity="0.6">library · semantic</text>

        <line x1="140" y1="118" x2="180" y2="50" stroke="#D4FF4F" strokeOpacity="0.6" markerEnd="url(#arrow-pt-flow)" />
        <line x1="140" y1="142" x2="180" y2="210" stroke="#D4FF4F" strokeOpacity="0.6" markerEnd="url(#arrow-pt-flow)" />

        <rect x="380" y="90" width="160" height="80" rx="8" fill="none" stroke="#D4FF4F" strokeOpacity="0.6" />
        <text x="460" y="118" textAnchor="middle">generate</text>
        <text x="460" y="136" textAnchor="middle" fillOpacity="0.6">discovery · synthesis</text>
        <text x="460" y="152" textAnchor="middle" fillOpacity="0.5">depth-gated</text>

        <line x1="340" y1="50" x2="380" y2="118" stroke="#F5F4F0" strokeOpacity="0.45" markerEnd="url(#arrow-pt-flow-muted)" />
        <line x1="340" y1="210" x2="380" y2="142" stroke="#F5F4F0" strokeOpacity="0.45" markerEnd="url(#arrow-pt-flow-muted)" />

        <rect x="580" y="20" width="80" height="48" rx="8" fill="none" stroke="#F5F4F0" strokeOpacity="0.3" />
        <text x="620" y="40" textAnchor="middle">suggest</text>
        <text x="620" y="56" textAnchor="middle" fillOpacity="0.6">fast tier</text>

        <rect x="580" y="106" width="80" height="48" rx="8" fill="none" stroke="#F5F4F0" strokeOpacity="0.3" />
        <text x="620" y="126" textAnchor="middle">deidentify</text>
        <text x="620" y="142" textAnchor="middle" fillOpacity="0.6">PII scan</text>

        <rect x="580" y="192" width="80" height="48" rx="8" fill="none" stroke="#F5F4F0" strokeOpacity="0.3" />
        <text x="620" y="212" textAnchor="middle">persist</text>
        <text x="620" y="228" textAnchor="middle" fillOpacity="0.6">journal · async</text>

        <line x1="540" y1="112" x2="580" y2="44" stroke="#D4FF4F" strokeOpacity="0.55" markerEnd="url(#arrow-pt-flow)" />
        <line x1="540" y1="130" x2="580" y2="130" stroke="#D4FF4F" strokeOpacity="0.7" markerEnd="url(#arrow-pt-flow)" />
        <line x1="540" y1="150" x2="580" y2="216" stroke="#D4FF4F" strokeOpacity="0.55" markerEnd="url(#arrow-pt-flow)" />
      </g>
    </svg>
  )
}

export const puretome: ClientCaseStudyContent = {
  slug: 'puretome',
  problem: (
    <>
      <p>
        Consumer AI writing partners that lean on baseline RAG hit the same wall: the model
        recalls what the author wrote in chunks but forgets <em>who the author is</em> across
        sessions. It drifts off the stated narrative arc, invents continuity the user never
        established (&ldquo;as you mentioned earlier&hellip;&rdquo; when they hadn&rsquo;t), and
        loses the thread of long-running identity facts (names, dates, places, relationships)
        the second the conversation rolls past the context window. For a memoir platform,
        that&rsquo;s a trust failure. The author stops believing the partner is listening.
      </p>
      <p className="mt-3">
        <span className="font-mono text-[color:var(--color-accent)]">PureTome</span> is the
        correction: three memory stores, each doing what it&rsquo;s best at, reconciled into a
        single briefing package the LLM sees on every turn. Vector retrieval over manuscript
        text answers <em>what has this author written</em>. A property graph answers{' '}
        <em>who this author is and where they are in their arc</em>. An authoritative document
        store (owned by the main API, never by the AI service) answers{' '}
        <em>what the true state of the work is</em>. The combination measured a 40% narrative-coherence
        lift over a plain-RAG baseline in blind evaluation.
      </p>
    </>
  ),
  architecture: {
    diagrams: [<ThreeBrainDiagram key="three-brain" />, <OrchestrationDiagram key="orchestration" />],
    walkthrough: (
      <>
        <p>
          <strong>Three-Brain Memory.</strong> The{' '}
          <span className="font-mono text-[color:var(--color-accent)]">Library</span> is Postgres
          with pgvector: chunked manuscript text embedded and indexed for semantic recall. The{' '}
          <span className="font-mono text-[color:var(--color-accent)]">Journal</span> is Neo4j: a
          typed graph of users, memoirs, sessions, interactions, extracted author facts, and
          journey milestones: the episodic memory and identity model. The{' '}
          <span className="font-mono text-[color:var(--color-accent)]">Ground Truth</span> is
          MongoDB behind the main API: the canonical memoir document, author profile, and account
          state.
        </p>
        <p className="mt-3">
          Why three: vector alone hallucinates continuity because it has no identity model. Every
          chunk is a stranger. Graph alone is blind to semantic similarity; it can tell you that
          the author mentioned a sister named Clara, but not that the paragraph they&rsquo;re
          writing now is really about Clara under a different frame. Documents alone can&rsquo;t
          reason over relationships between people, places, and themes across years of material.
          Each brain covers the other two&rsquo;s failure modes.
        </p>

        <p className="mt-6">
          <strong>Stateless AI service.</strong> The AI service holds zero persistent user state.
          On every request the main API assembles a briefing package (persona instructions,
          memoir object, journey summary, recent conversation) and ships it as the request body.
          The AI service reads from the Library and Journal, calls the model, returns, and
          forgets.
        </p>
        <p className="mt-3">
          The payload is larger than you&rsquo;d see in a session-affinity design, and that&rsquo;s
          the trade. In exchange: horizontal scale without sticky sessions, trivially testable
          requests (the brief <em>is</em> the fixture), a clean audit story for where user data
          lives, and a hard trust boundary. The AI service cannot leak what was never stored
          there.
        </p>

        <p className="mt-6">
          <strong>LangGraph orchestration with context budgeting.</strong> Chat is a stateful
          graph, not a script. The entry node (<code>conductor</code>) classifies user intent
          and selects the persona. Two nodes then run in parallel:{' '}
          <code>loadAndTransform</code> pulls journal state and the user&rsquo;s stated goals;{' '}
          <code>retrieveRagContext</code> executes semantic search against the Library. Both feed
          a <code>generate</code> node that routes between <em>discovery</em> mode (open
          interviewing, early in a conversation) and <em>synthesis</em> mode (reflective, after
          enough depth has accumulated) via a guard on conversation depth. Post-processing fans
          out in parallel: suggestion generation on a fast model tier, PII deidentification, and a
          fire-and-forget write back to the journal. Failure in any post-process branch cannot
          fail the user-facing response.
        </p>
        <p className="mt-3">
          The context window is a contested resource. Five sources compete for it (system prompt,
          conversation history, journey summary, the live memoir object, and RAG context),
          and they&rsquo;re budgeted explicitly. Conversation history and the journey summary are{' '}
          <em>protected</em>: they cannot be truncated, because losing them is the exact failure
          mode the architecture exists to prevent. RAG context and the memoir object are{' '}
          <em>truncatable</em>: they take the hit when the window tightens, in that order. A
          300-page manuscript can never silently push the system prompt out of context.
        </p>

        <p className="mt-6">
          <strong>Async pipeline.</strong> Anything that doesn&rsquo;t have to happen in the
          request path doesn&rsquo;t. New manuscript ingestion, embedding generation, causality
          extraction between past events, and long-conversation summarization all run behind
          Pub/Sub topics with their own retry and dead-letter semantics.
        </p>
        <p className="mt-3">
          The operational payoff is backpressure you can see. When the embedding service is
          degraded, new chunks land in the Library later than they otherwise would. A chat
          turn never fails on it. When the summarization worker is slow, the journal&rsquo;s
          crystallized summaries lag, but the protected conversation-history slot still carries
          the freshest N turns. Synchronous request-path code stays small and easy to reason
          about.
        </p>
      </>
    ),
  },
  additionalSections: [
    {
      heading: 'Data-handling posture',
      body: (
        <>
          <p>
            Ground truth lives in the main API. The AI service receives only what the briefing
            package includes for a given request, and scrubs responses through PII
            deidentification before any persistence to the journal. The model provider is
            swappable per environment (a local provider in development, managed inference in
            production) behind a single interface, so a tenant that requires region-pinned
            inference or a specific model family is a config change, not a rewrite.
          </p>
          <p className="mt-3">
            <strong>Does not protect against:</strong> a compromised model provider seeing the
            briefing content during inference. That&rsquo;s a contractual and region-selection
            problem, not an architectural one. Same for a compromised main API, which holds the
            keys to ground truth; the split trust boundary narrows the blast radius without
            pretending to eliminate it.
          </p>
        </>
      ),
    },
  ],
  impact: (
    <>
      <p>
        <strong>40% narrative-coherence lift</strong> over a plain-RAG baseline in blind
        evaluation. Underneath the headline number: fewer cross-session continuity breaks,
        higher retention of stated timeline facts across long gaps, and a near-elimination of
        the &ldquo;as you mentioned earlier&rdquo; hallucination when the user had not in fact
        mentioned it earlier.
      </p>
      <p className="mt-3">
        Operationally, the three-brain split paid off in ways that weren&rsquo;t the original
        goal: the Journal turned into a product surface (journey progress, author facts the
        user can correct), the Library became reusable for editorial features outside chat,
        and the stateless AI service scaled independently of the main API during usage
        spikes.
      </p>
    </>
  ),
  engagementNote: (
    <p>
      PureTome was designed and built under PureTome Labs (an independent architecture-and-build
      practice, C2C, one architect doing the work, not a staffing layer). If you&rsquo;re
      building AI product around long-form user content and want a memory system that doesn&rsquo;t
      hallucinate continuity, a 30-minute architecture call is a reasonable first move.
    </p>
  ),
}
