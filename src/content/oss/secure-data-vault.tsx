import type { OssContent } from './types'

function Diagram() {
  return (
    <svg
      viewBox="0 0 640 260"
      className="w-full rounded-[var(--radius-md)] border border-white/10 bg-white/[0.02]"
      role="img"
      aria-label="secure-data-vault architecture: application writes through Drizzle middleware, which uses a Tink keyset backed by GCP KMS envelope encryption before persisting AES-256-GCM ciphertext to Postgres."
    >
      <defs>
        <marker id="arrow-sdv" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#D4FF4F" />
        </marker>
      </defs>
      <g fontFamily="ui-monospace, SFMono-Regular, monospace" fontSize="11" fill="#F5F4F0">
        <rect x="20" y="100" width="120" height="60" rx="8" fill="none" stroke="#F5F4F0" strokeOpacity="0.3" />
        <text x="80" y="128" textAnchor="middle">Application</text>
        <text x="80" y="144" textAnchor="middle" fillOpacity="0.6">NestJS + DI</text>

        <rect x="180" y="100" width="140" height="60" rx="8" fill="none" stroke="#D4FF4F" strokeOpacity="0.5" />
        <text x="250" y="128" textAnchor="middle">Drizzle middleware</text>
        <text x="250" y="144" textAnchor="middle" fillOpacity="0.6">encrypt / decrypt</text>

        <rect x="360" y="20" width="140" height="60" rx="8" fill="none" stroke="#F5F4F0" strokeOpacity="0.3" />
        <text x="430" y="48" textAnchor="middle">Tink keyset</text>
        <text x="430" y="64" textAnchor="middle" fillOpacity="0.6">AEAD primitives</text>

        <rect x="360" y="180" width="140" height="60" rx="8" fill="none" stroke="#F5F4F0" strokeOpacity="0.3" />
        <text x="430" y="208" textAnchor="middle">GCP KMS</text>
        <text x="430" y="224" textAnchor="middle" fillOpacity="0.6">envelope KEK</text>

        <rect x="520" y="100" width="100" height="60" rx="8" fill="none" stroke="#F5F4F0" strokeOpacity="0.3" />
        <text x="570" y="128" textAnchor="middle">Postgres</text>
        <text x="570" y="144" textAnchor="middle" fillOpacity="0.6">ciphertext</text>

        <line x1="140" y1="130" x2="180" y2="130" stroke="#D4FF4F" strokeOpacity="0.6" markerEnd="url(#arrow-sdv)" />
        <line x1="320" y1="120" x2="360" y2="70" stroke="#F5F4F0" strokeOpacity="0.4" markerEnd="url(#arrow-sdv)" />
        <line x1="320" y1="140" x2="360" y2="200" stroke="#F5F4F0" strokeOpacity="0.4" markerEnd="url(#arrow-sdv)" />
        <line x1="320" y1="130" x2="520" y2="130" stroke="#D4FF4F" strokeOpacity="0.6" markerEnd="url(#arrow-sdv)" />
      </g>
    </svg>
  )
}

export const secureDataVault: OssContent = {
  slug: 'secure-data-vault',
  problem: (
    <>
      <p>
        Regulated workloads (HIPAA, SOC 2, state-level privacy regimes) demand column-level
        encryption for PHI and PII. The ecosystem answer is usually one of three bad options: a
        heavy enterprise key-management SDK that fights your ORM, application-level encryption
        scattered through service code with no audit trail, or the default posture of &ldquo;the
        database handles it&rdquo; (it doesn&rsquo;t, and your threat model is worse than you
        think).
      </p>
      <p className="mt-3">
        <span className="font-mono text-[color:var(--color-accent)]">secure-data-vault</span> is the
        drop-in layer that sits between Drizzle and Postgres: transparent AES-256-GCM at the
        column level, keys managed via Google Tink with envelope encryption against GCP KMS, and
        a deterministic-search variant so encrypted columns remain queryable without decrypting
        the full table.
      </p>
    </>
  ),
  architecture: {
    diagram: <Diagram />,
    walkthrough: (
      <>
        <p>
          The application writes typed data through Drizzle as usual. A middleware layer
          inspects the schema for <code>@encrypted</code>-annotated columns and intercepts the
          payload. For those columns, Tink&rsquo;s AEAD primitive encrypts the plaintext using a
          data encryption key (DEK); the DEK itself is sealed by a key encryption key (KEK) held
          in GCP KMS. Ciphertext hits Postgres; plaintext never leaves process memory.
        </p>
        <p className="mt-3">
          Reads reverse the flow: the sealed DEK travels with the row, KMS unseals it on
          demand, and Tink decrypts the column before Drizzle hands typed rows back to the
          application. Deterministic-search columns use a separate SIV-mode keyset so equality
          lookups work on ciphertext without leaking ordering.
        </p>
      </>
    ),
  },
  threatModel: (
    <>
      <p>
        <strong>Protects against:</strong> database dumps leaking plaintext PHI, backup-file
        exfiltration, compromised read-replica access, and the
        &ldquo;engineer-with-read-access-to-prod&rdquo; scenario. Adversaries with database
        credentials see only ciphertext and sealed DEKs.
      </p>
      <p className="mt-3">
        <strong>Does not protect against:</strong> a compromised application runtime. If an
        attacker has code execution in the service holding the KMS binding, they can decrypt
        what the service can decrypt. Mitigations (least-privilege IAM, short-lived tokens, and
        runtime attestation) live outside this library.
      </p>
    </>
  ),
  extractionNote: (
    <p>
      Extracted from Quiet Horizons&rsquo; encryption-at-rest layer per the Sanitization Rule.
      Skeleton, key-management conventions, and the deterministic-search pattern are real;
      domain-specific column schemas and rotation schedules are generic.
    </p>
  ),
}
