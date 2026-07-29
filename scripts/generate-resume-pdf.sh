#!/usr/bin/env bash
# Regenerate the hosted resume PDF from the built /resume page (dateless public variant).
# Run after any resume.ts change: npm run build && ./scripts/generate-resume-pdf.sh
#
# This is the PUBLIC presentation only. The dated resume Max actually submits to
# employers is the Google Doc in Drive (Millien-Max-2026) — not generated here.
set -euo pipefail
cd "$(dirname "$0")/.."

PORT="${PORT:-4199}"
OUT="public/resume/Millien-Max-2026.pdf"

npx vite preview --port "$PORT" >/dev/null 2>&1 &
PREVIEW_PID=$!
trap 'kill "$PREVIEW_PID" 2>/dev/null' EXIT
sleep 3

google-chrome --headless --disable-gpu --no-pdf-header-footer --virtual-time-budget=8000 \
  --print-to-pdf="$OUT" "http://localhost:$PORT/resume"

echo "Wrote $OUT — open it and eyeball it before committing."
