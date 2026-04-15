import type { OssContent } from './types'

function Diagram() {
  return (
    <svg
      viewBox="0 0 680 240"
      className="w-full rounded-[var(--radius-md)] border border-white/10 bg-white/[0.02]"
      role="img"
      aria-label="realtime-voice-infra pipeline: browser audio capture over a secure WebSocket to Cloud Run, forwarded to Google Speech-to-Text, then to Vertex AI Gemini for structured extraction, with typed result returned to the client."
    >
      <defs>
        <marker id="arrow-rvi" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#D4FF4F" />
        </marker>
      </defs>
      <g fontFamily="ui-monospace, SFMono-Regular, monospace" fontSize="11" fill="#F5F4F0">
        {[
          { x: 10, label: 'Browser', sub: 'MediaRecorder' },
          { x: 150, label: 'WebSocket', sub: 'TLS · auth' },
          { x: 290, label: 'Cloud Run', sub: 'NestJS gateway' },
          { x: 430, label: 'Speech-to-Text', sub: 'streaming API' },
          { x: 570, label: 'Gemini', sub: 'structured JSON' },
        ].map((n) => (
          <g key={n.label}>
            <rect x={n.x} y="90" width="110" height="60" rx="8" fill="none" stroke="#F5F4F0" strokeOpacity="0.35" />
            <text x={n.x + 55} y="118" textAnchor="middle">{n.label}</text>
            <text x={n.x + 55} y="134" textAnchor="middle" fillOpacity="0.6">{n.sub}</text>
          </g>
        ))}
        {[120, 260, 400, 540].map((x) => (
          <line key={x} x1={x} y1="120" x2={x + 30} y2="120" stroke="#D4FF4F" strokeOpacity="0.6" markerEnd="url(#arrow-rvi)" />
        ))}
        <path d="M 625 150 Q 625 200 340 200 Q 65 200 65 150" fill="none" stroke="#F5F4F0" strokeOpacity="0.3" markerEnd="url(#arrow-rvi)" strokeDasharray="4 4" />
        <text x="340" y="218" textAnchor="middle" fillOpacity="0.55">typed result · no draft persistence</text>
      </g>
    </svg>
  )
}

export const realtimeVoiceInfra: OssContent = {
  slug: 'realtime-voice-infra',
  problem: (
    <>
      <p>
        Voice-to-structured-data pipelines in regulated environments usually fail the same way:
        engineers buffer audio to disk, write draft transcripts into the database for
        &ldquo;reliability,&rdquo; and quietly create an audit liability that compliance only
        notices during a SOC 2 walkthrough. Meanwhile every reconnect drops context, back-pressure
        is unhandled, and the first real failure mode is a wedged WebSocket with a silently
        growing buffer.
      </p>
      <p className="mt-3">
        <span className="font-mono text-[color:var(--color-accent)]">realtime-voice-infra</span>{' '}
        is a production-grade pipeline that streams browser audio through a secure WebSocket to
        Google Speech-to-Text, forwards the transcript to Vertex AI Gemini for structured
        extraction, and returns a typed result — all without persisting a draft transcript
        anywhere. Back-pressure is first-class, reconnect semantics are explicit, and the
        inference path is stateless by construction.
      </p>
    </>
  ),
  architecture: {
    diagram: <Diagram />,
    walkthrough: (
      <>
        <p>
          The browser captures audio via <code>MediaRecorder</code> and streams chunks over a
          TLS WebSocket to a NestJS gateway on Cloud Run. The gateway brokers two downstream
          connections: one to Google Speech-to-Text&rsquo;s streaming API for live transcription,
          and one to Vertex AI Gemini for structured extraction when the transcript reaches a
          semantic boundary. The final typed JSON returns to the client in a single frame —
          never written to disk, never cached, never logged in plaintext.
        </p>
        <p className="mt-3">
          Back-pressure is handled at two layers: the browser throttles{' '}
          <code>MediaRecorder</code> based on <code>bufferedAmount</code>, and the gateway applies
          a token-bucket rate limit per connection before fanning out to the inference tier.
          Reconnect semantics are idempotent — clients resume with a session token, the gateway
          re-establishes downstream streams, and in-flight audio chunks that failed to acknowledge
          are replayed in order.
        </p>
      </>
    ),
  },
  threatModel: (
    <>
      <p>
        <strong>Protects against:</strong> draft-state audit liability (no persisted transcripts),
        replay attacks on the WebSocket (per-session nonces), and accidental plaintext logging
        (structured logs redact transcript payloads by type).
      </p>
      <p className="mt-3">
        <strong>Does not protect against:</strong> a compromised browser runtime or a malicious
        extension with access to the audio device — these are endpoint-security problems that a
        streaming pipeline cannot solve. Organizations relying on this pattern for regulated
        workloads should pair it with managed-device enforcement.
      </p>
    </>
  ),
  extractionNote: (
    <p>
      Extracted from Quiet Horizons&rsquo; ambient scribe pipeline per the Sanitization Rule.
      Transport shape, back-pressure strategy, and the stateless inference contract are real;
      prompt templates and extraction schemas are generic.
    </p>
  ),
}
