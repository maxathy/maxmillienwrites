import type { ClientCaseStudyContent } from './types'

function ScribePipelineDiagram() {
  return (
    <svg
      viewBox="0 0 680 320"
      className="w-full rounded-[var(--radius-md)] border border-white/10 bg-white/[0.02]"
      role="img"
      aria-label="Quiet Horizons ambient scribe pipeline: the clinician speaks; a browser AudioWorklet encodes PCM16 audio at 16 kHz; Socket.IO streams chunks to the backend over a Firebase-authenticated namespace; Google Cloud Speech produces a streaming transcript, which is encrypted and persisted as an immutable row; Vertex AI Gemini formats the transcript into a SOAP note on a stateless call; the clinician reviews in a Tiptap editor and saves, which writes a single immutable encrypted note row and appends an audit-log entry."
    >
      <defs>
        <marker id="arrow-qh-scribe" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#8EE6C8" />
        </marker>
        <marker id="arrow-qh-scribe-muted" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#F5F4F0" fillOpacity="0.5" />
        </marker>
      </defs>
      <g fontFamily="ui-monospace, SFMono-Regular, monospace" fontSize="11" fill="#F5F4F0">
        <rect x="20" y="20" width="110" height="56" rx="8" fill="none" stroke="#F5F4F0" strokeOpacity="0.3" />
        <text x="75" y="46" textAnchor="middle">Clinician</text>
        <text x="75" y="62" textAnchor="middle" fillOpacity="0.6">mic · browser</text>

        <rect x="170" y="20" width="120" height="56" rx="8" fill="none" stroke="#F5F4F0" strokeOpacity="0.3" />
        <text x="230" y="46" textAnchor="middle">AudioWorklet</text>
        <text x="230" y="62" textAnchor="middle" fillOpacity="0.6">PCM16 · 16 kHz</text>

        <rect x="330" y="20" width="130" height="56" rx="8" fill="none" stroke="#F5F4F0" strokeOpacity="0.3" />
        <text x="395" y="46" textAnchor="middle">Socket.IO</text>
        <text x="395" y="62" textAnchor="middle" fillOpacity="0.6">Firebase-auth</text>

        <rect x="500" y="20" width="160" height="56" rx="8" fill="none" stroke="#8EE6C8" strokeOpacity="0.6" />
        <text x="580" y="46" textAnchor="middle">Cloud Speech</text>
        <text x="580" y="62" textAnchor="middle" fillOpacity="0.6">streaming · interim + final</text>

        <line x1="130" y1="48" x2="170" y2="48" stroke="#F5F4F0" strokeOpacity="0.45" markerEnd="url(#arrow-qh-scribe-muted)" />
        <line x1="290" y1="48" x2="330" y2="48" stroke="#F5F4F0" strokeOpacity="0.45" markerEnd="url(#arrow-qh-scribe-muted)" />
        <line x1="460" y1="48" x2="500" y2="48" stroke="#8EE6C8" strokeOpacity="0.65" markerEnd="url(#arrow-qh-scribe)" />

        <line x1="580" y1="76" x2="580" y2="150" stroke="#8EE6C8" strokeOpacity="0.7" markerEnd="url(#arrow-qh-scribe)" />

        <rect x="500" y="150" width="160" height="56" rx="8" fill="none" stroke="#F5F4F0" strokeOpacity="0.3" />
        <text x="580" y="176" textAnchor="middle">Transcript</text>
        <text x="580" y="192" textAnchor="middle" fillOpacity="0.6">encrypted · immutable</text>

        <rect x="290" y="150" width="160" height="56" rx="8" fill="none" stroke="#8EE6C8" strokeOpacity="0.6" />
        <text x="370" y="176" textAnchor="middle">Vertex AI Gemini</text>
        <text x="370" y="192" textAnchor="middle" fillOpacity="0.6">SOAP format · stateless</text>

        <rect x="80" y="150" width="160" height="56" rx="8" fill="none" stroke="#F5F4F0" strokeOpacity="0.3" />
        <text x="160" y="176" textAnchor="middle">Tiptap editor</text>
        <text x="160" y="192" textAnchor="middle" fillOpacity="0.6">clinician review</text>

        <line x1="500" y1="178" x2="450" y2="178" stroke="#8EE6C8" strokeOpacity="0.6" markerEnd="url(#arrow-qh-scribe)" />
        <line x1="290" y1="178" x2="240" y2="178" stroke="#8EE6C8" strokeOpacity="0.6" markerEnd="url(#arrow-qh-scribe)" />

        <line x1="160" y1="206" x2="300" y2="254" stroke="#8EE6C8" strokeOpacity="0.75" markerEnd="url(#arrow-qh-scribe)" />

        <rect x="210" y="254" width="260" height="56" rx="8" fill="none" stroke="#8EE6C8" strokeOpacity="0.7" />
        <text x="340" y="280" textAnchor="middle">Signed note</text>
        <text x="340" y="296" textAnchor="middle" fillOpacity="0.6">immutable INSERT · audit appended</text>
      </g>
    </svg>
  )
}

function AuditDiagram() {
  return (
    <svg
      viewBox="0 0 680 280"
      className="w-full rounded-[var(--radius-md)] border border-white/10 bg-white/[0.02]"
      role="img"
      aria-label="Quiet Horizons atomic-write and addendum-chain pattern: a POST to /notes flows through the application crypto boundary, which produces a single ciphertext payload; that payload is inserted into an append-only notes table (no updatedAt column), the paired appointment row has its status updated, and a global audit interceptor appends an entry to the audit log. Below, the addendum chain shows that corrections never mutate the original. Each addendum is a new row that links to its parent note via parentNoteId."
    >
      <defs>
        <marker id="arrow-qh-audit" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#8EE6C8" />
        </marker>
        <marker id="arrow-qh-audit-muted" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#F5F4F0" fillOpacity="0.5" />
        </marker>
      </defs>
      <g fontFamily="ui-monospace, SFMono-Regular, monospace" fontSize="11" fill="#F5F4F0">
        <rect x="20" y="56" width="120" height="56" rx="8" fill="none" stroke="#F5F4F0" strokeOpacity="0.3" />
        <text x="80" y="82" textAnchor="middle">POST /notes</text>
        <text x="80" y="98" textAnchor="middle" fillOpacity="0.6">clinician save</text>

        <rect x="180" y="56" width="140" height="56" rx="8" fill="none" stroke="#8EE6C8" strokeOpacity="0.6" />
        <text x="250" y="82" textAnchor="middle">CryptoService</text>
        <text x="250" y="98" textAnchor="middle" fillOpacity="0.6">AES-256-GCM</text>

        <rect x="360" y="20" width="170" height="48" rx="8" fill="none" stroke="#8EE6C8" strokeOpacity="0.6" />
        <text x="445" y="40" textAnchor="middle">notes (append-only)</text>
        <text x="445" y="56" textAnchor="middle" fillOpacity="0.6">no updatedAt</text>

        <rect x="360" y="80" width="170" height="40" rx="8" fill="none" stroke="#F5F4F0" strokeOpacity="0.3" />
        <text x="445" y="96" textAnchor="middle">appointments</text>
        <text x="445" y="110" textAnchor="middle" fillOpacity="0.6">status update</text>

        <rect x="550" y="56" width="110" height="56" rx="8" fill="none" stroke="#F5F4F0" strokeOpacity="0.3" />
        <text x="605" y="82" textAnchor="middle">audit_logs</text>
        <text x="605" y="98" textAnchor="middle" fillOpacity="0.6">append-only</text>

        <line x1="140" y1="84" x2="180" y2="84" stroke="#8EE6C8" strokeOpacity="0.7" markerEnd="url(#arrow-qh-audit)" />
        <line x1="320" y1="72" x2="360" y2="44" stroke="#8EE6C8" strokeOpacity="0.7" markerEnd="url(#arrow-qh-audit)" />
        <line x1="320" y1="96" x2="360" y2="100" stroke="#F5F4F0" strokeOpacity="0.45" markerEnd="url(#arrow-qh-audit-muted)" />
        <line x1="320" y1="84" x2="550" y2="84" stroke="#F5F4F0" strokeOpacity="0.35" strokeDasharray="4 4" markerEnd="url(#arrow-qh-audit-muted)" />
        <text x="430" y="78" textAnchor="middle" fillOpacity="0.55">fire-and-forget</text>

        <text x="20" y="170" fillOpacity="0.55">Corrections never mutate. Each addendum is a new row linked to its parent.</text>

        <rect x="20" y="194" width="170" height="56" rx="8" fill="none" stroke="#F5F4F0" strokeOpacity="0.3" />
        <text x="105" y="220" textAnchor="middle">note v1</text>
        <text x="105" y="236" textAnchor="middle" fillOpacity="0.6">immutable</text>

        <rect x="260" y="194" width="170" height="56" rx="8" fill="none" stroke="#F5F4F0" strokeOpacity="0.3" />
        <text x="345" y="220" textAnchor="middle">addendum</text>
        <text x="345" y="236" textAnchor="middle" fillOpacity="0.6">parentNoteId → v1</text>

        <rect x="500" y="194" width="160" height="56" rx="8" fill="none" stroke="#F5F4F0" strokeOpacity="0.3" />
        <text x="580" y="220" textAnchor="middle">addendum 2</text>
        <text x="580" y="236" textAnchor="middle" fillOpacity="0.6">parentNoteId → prev</text>

        <line x1="260" y1="222" x2="190" y2="222" stroke="#8EE6C8" strokeOpacity="0.6" markerEnd="url(#arrow-qh-audit)" />
        <line x1="500" y1="222" x2="430" y2="222" stroke="#8EE6C8" strokeOpacity="0.6" markerEnd="url(#arrow-qh-audit)" />
      </g>
    </svg>
  )
}

export const quietHorizons: ClientCaseStudyContent = {
  slug: 'quiet-horizons',
  problem: (
    <>
      <p>
        A concierge psychiatric practice has two constraints no general EHR respects. First, the
        clinician&rsquo;s attention during session belongs to the patient, not to a keyboard.
        Second, the regulatory surface for behavioral health is unforgiving: the record has to be
        complete, tamper-evident, and defensible years later, and the data handling has to stand
        up to a HIPAA audit without a dozen vendor BAAs to reconcile. Most ambient-scribe tools
        optimize for the first constraint and quietly make the second worse: draft states that
        blur authorship, AI formatting that smuggles hallucinations into the medical record,
        compliance footprints fanned out across every SaaS in the stack.
      </p>
      <p className="mt-3">
        <span className="font-mono text-[color:var(--color-accent)]">Quiet Horizons</span> is a
        clinical operating system for that practice: an ambient scribe that captures session
        audio, produces a SOAP-structured draft, and lets the clinician review and sign it off
        before anything hits the record. Under the hood, every clinical write is encrypted at the
        application boundary, every table that holds PHI is append-only by schema, every
        correction becomes a linked addendum instead of a mutation, and every service in the
        stack sits under a single Business Associate Agreement. The ambient part is the feature
        the clinician sees; the rest is what makes it safe to ship.
      </p>
    </>
  ),
  architecture: {
    diagrams: [
      <ScribePipelineDiagram key="scribe-pipeline" />,
      <AuditDiagram key="audit-pattern" />,
    ],
    walkthrough: (
      <>
        <p>
          <strong>Ciphertext-only PHI at the database edge.</strong> Clinical notes, session
          transcripts, and intake submissions are all encrypted with AES-256-GCM at the
          application layer before Drizzle ever sees them. A single{' '}
          <code>CryptoService</code> is the only code path that handles plaintext; everything
          else downstream (ORM, Postgres, backups, read replicas) operates on ciphertext
          plus an IV and auth tag. Plaintext exists only in process memory during a request, and
          only long enough to serialize an authenticated response.
        </p>
        <p className="mt-3">
          The trade-off: encrypted columns aren&rsquo;t searchable. We pay that cost
          deliberately. Metadata stays structured and indexable (patient, appointment, provider,
          timestamps), but the clinical content itself is opaque to any threat actor who makes it
          past the application layer.
        </p>

        <p className="mt-6">
          <strong>Ambient scribe pipeline.</strong> The clinician starts a dictation from the
          workspace. A browser <code>AudioWorklet</code> resamples microphone input to
          16&nbsp;kHz PCM16 (the format Cloud Speech expects), and a Socket.IO namespace
          streams chunks to the backend under a per-socket Firebase-token check. Cloud Speech
          returns interim and final transcript segments in real time; the final transcript is
          encrypted and persisted as an immutable row keyed to the appointment.
        </p>
        <p className="mt-3">
          Formatting is a separate, <em>stateless</em> call. The transcript goes to Vertex AI
          Gemini with a locked-down system prompt (two templates, one for evaluations, one for
          follow-ups) and a hard rule against paraphrasing anything that looks like a clinical
          fact. The model returns a SOAP-structured Markdown note, which is rendered into the
          clinician&rsquo;s Tiptap editor for review. Nothing has been written to the clinical
          record yet.
        </p>

        <p className="mt-6">
          <strong>Zero-draft writes, immutable by schema.</strong> There is no drafts table. The
          AI-formatted note lives in browser session storage only; if the tab closes, the draft
          is gone, and the encrypted transcript remains as the source of truth. A note exists in
          the clinical record only after the clinician saves, and at that moment the save is
          atomic: encrypt the payload, INSERT into an append-only notes table that has no{' '}
          <code>updatedAt</code> column, update the paired appointment&rsquo;s status, and
          append an audit-log row for the action. SQL-level immutability, not policy-level
          immutability: there is no code path that could modify a persisted note even if
          someone asked for one.
        </p>
        <p className="mt-3">
          Corrections use the addendum pattern. A new row, same table, typed as an addendum,
          with a <code>parentNoteId</code> link to the original. The original stays intact as
          evidence of what was signed at the time; the chain of addenda is the public history of
          revisions. Disputes about what a clinician documented when become a simple read of an
          append-only table, not a forensic reconstruction from backups.
        </p>

        <p className="mt-6">
          <strong>Single-BAA compliance surface.</strong> The entire stack sits under one
          Business Associate Agreement with Google: Firebase Auth for clinician identity, Cloud
          Speech for transcription, Vertex AI for SOAP formatting, Google Meet for the telehealth
          session itself, Google Calendar for scheduling. A global authentication guard on the
          NestJS backend enforces the boundary; an <em>audit interceptor</em> sits above every
          HTTP controller and emits an append-only log entry on each request, fire-and-forget so
          audit failures never degrade the user-facing response. One annual BAA review,
          not a matrix of vendor compliance tickets.
        </p>
        <p className="mt-3">
          The payoff is a compliance posture a practice owner can actually explain. PHI lives
          only in the application database, encrypted. Every touch is in the audit log. Every
          covered service vendor is the same vendor.
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
            The current encryption model uses a single application-wide key held in Secret
            Manager and injected at runtime. That&rsquo;s the right posture for a single-practice
            deployment and the wrong one for a multi-tenant future, so the upgrade path is
            deliberate. The encryption boundary has been pulled out into the public{' '}
            <span className="font-mono text-[color:var(--color-accent)]">secure-data-vault</span>{' '}
            repo as a reference for envelope encryption with per-record DEKs wrapped by a Cloud
            KMS KEK, hash-chained audit logs, and AAD binding between ciphertext and record
            identity. Migrating Quiet Horizons onto that shape is a contained, reversible project
            when the practice needs it.
          </p>
          <p className="mt-3">
            <strong>Protects against:</strong> database dumps, stolen backups, and
            read-replica compromise (attackers see ciphertext, metadata, and nothing else
            useful). <strong>Does not protect against:</strong> a compromised application
            runtime (the service with the key can decrypt what the service can decrypt), or a
            subpoena to the model provider during inference. Runtime attestation, least-privilege
            IAM, and contractual controls on the provider sit outside this architecture on
            purpose.
          </p>
        </>
      ),
    },
  ],
  impact: (
    <>
      <p>
        <strong>In-session charting replaces after-hours pajama time.</strong> The clinician
        ends the appointment with a reviewable SOAP draft already on screen; the review-and-sign
        step takes minutes instead of the hour-plus of post-hoc dictation most psychiatric
        practices quietly absorb. That shift is the product; everything else supports it.
      </p>
      <p className="mt-3">
        The schema-level immutability eliminates an entire class of chart-tamper disputes: there
        is no &ldquo;who edited this, when&rdquo; question because the SQL layer does not permit
        the edit. The single-BAA posture collapses annual compliance from a multi-vendor audit
        into a single one. And the extracted <code>secure-data-vault</code> layer keeps the door
        open to multi-tenant or multi-region deployment without touching the rest of the system.
      </p>
    </>
  ),
  engagementNote: (
    <p>
      Quiet Horizons was architected and built under PureTome Labs (a C2C engagement, one
      architect-builder, not a staffing layer). If you&rsquo;re operating a clinical or
      otherwise-regulated practice and want an ambient AI workflow that treats the compliance
      surface as a first-class constraint, not a retrofit, a 30-minute architecture call
      is a reasonable first move.
    </p>
  ),
}
