# maxmillienwrites.com — PRD & Rebuild Plan

## Context

maxmillienwrites.com is currently a Carrd site hosted as the "Living Epilogue" companion to the *Traffic Engineer* memoir. It is the **#1 Google result for "Max Millien"** — meaning every prospective C2C buyer (Series A/B CTO) lands on it during due diligence before signing a $125/hr contract with PureTome Labs.

The current framing (addiction, incarceration, redemption epilogue) creates a **disqualification risk** for the C2C pipeline that must hit $1,200/week baseline by July 2026 to support early probation termination and $135k arrears.

The memoir promised readers that the story continues at maxmillienwrites.com. That promise must be honored — but it cannot be the first thing a CTO sees.

**Intended outcome:** decommission the Carrd site; ship a React 19 / Firebase-hosted replacement that (a) presents Max as an elite Principal AI Architect to the C2C audience, (b) ranks #1 for "Max Millien" with professionally-safe SERP snippets, (c) preserves the memoir's Living Epilogue at a dedicated subpath for readers who seek it, and (d) demonstrates the craft of the developer through the site itself — Codrops-caliber interaction design, because the site *is* a portfolio piece.

This PRD is the final deliverable for this session. On approval, its contents will be written to `maxmillienwrites/PRD.md` in a new project folder.

---

## Strategic Positioning (The Dilemma, Resolved)

### Audience priority (hard-ordered)

1. **Primary — C2C Buyer (Series A/B CTO):** Looking for a consulting architect. Skim-reads. Needs: credibility, stack match, contract terms, fast path to a call.
2. **Secondary — Recruiter / W-2 prospect:** Might reach out for a FTE role. Not disqualified, but not the priority.
3. **Tertiary — Memoir reader / press / curious public:** Arrived via the book, a podcast, or search. Wants the Living Epilogue.
4. **Quaternary — Puretome product prospect:** Aspiring memoirist. Routed off-site to puretome.com.

### Resolution of the memoir dilemma

**Homepage is 100% CTO-facing.** No mention of memoir, album, addiction, recovery, or incarceration above the fold or in the primary nav. The word "author" does not appear on the homepage except inside a subtle footer element.

**The memoir lives at `/author`** — a dedicated subpage presenting the Traffic Engineer memoir, album, and Living Epilogue. Reachable only by:
- Direct URL (the book's back matter, album liner notes, press)
- A single discreet footer link labeled **"Also an author →"**
- An SEO-isolated sitemap entry

This satisfies four constraints simultaneously:
- The book's promise (URL resolves, Living Epilogue exists)
- C2C safety (buyer never sees it on the skim path)
- Honesty (not hidden, just not headlined — if asked, the page exists and is linked)
- Narrative control (Max frames the story himself, on his page, in his voice)

### SERP strategy

Homepage `<title>` and meta-description contain **zero** memoir keywords. Target SERP snippet:

> **Max Millien — Principal AI Architect | PureTome Labs**
> Boston-based full-stack architect specializing in hybrid RAG, agentic workflows, and HIPAA-compliant AI systems. Available for C2C engagements.

This replaces the current memoir-forward snippet, immediately neutralizing the Google first-impression problem.

---

## Information Architecture

```
/                      Homepage (CTO-facing)
/work                  Case studies (Quiet Horizons, PureTome, showcase repos)
/stack                 Canonical tech stack, deep-dive per technology
/engage                C2C engagement model, rates, terms, call booking
/author                Memoir + album + Living Epilogue (segregated)
/author/epilogue       The Living Epilogue itself
/author/album          Traffic Engineer album player + liner notes
  robots: noindex on /author/* except the root /author page
/resume                Static PDF + parsed HTML version
/contact               Form → Firebase Function → email
```

**Nav (desktop, left-to-right):** Work · Stack · Engage · Resume · [Book a Call CTA]
**Footer:** three columns — Navigation / PureTome ecosystem links (puretome.com, blog.puretome.com, github.com/maxathy) / small "Also an author →" link to `/author`.

---

## Homepage — Section-by-Section Spec & Copy

### Section 1 — Hero (above the fold)

**Visual:** Full-viewport WebGL scene. A real, labeled knowledge-graph mesh (three.js + r3f) — nodes represent actual architectural primitives Max works with (`RAG`, `Agent`, `Memory`, `Graph`, `Vector`, `Tool`, `Context`, `Audit`, `Stream`), edges represent real relationships. Desaturated monochrome with one accent color. Cursor parallax tilts the scene. On load, nodes animate in from scatter, coalesce into the graph structure, then gently drift. This is the single "wow" moment — everything else is restrained. The literal labels are the point: a CTO who knows these terms immediately registers "this person works at the primitive level, not the vibes level."

**Headline (H1):**
> Principal AI Architect.
> Hybrid RAG. Agentic systems. Ship-grade.

**Subhead:**
> I build production AI infrastructure for companies that can't afford to ship a prototype. Ten years full-stack, a decade of platform engineering, and a current stack purpose-built for the agentic era.

**Primary CTA:** `Book a 30-min architecture call →` (links to /engage#book)
**Secondary CTA:** `See the work ↓` (scroll anchor)

**Trust row (below CTAs, small, horizontal):**
Logos/wordmarks: Puretome · Quiet Horizons TelePsychiatry · Verizon · Partners Health · Boston University

### Section 2 — The Offer (one-liner positioning)

Horizontal scroll-pinned section (GSAP ScrollTrigger). Three tiles reveal as the user scrolls:

- **The Problem** — "Most AI features never make it out of the demo. They hallucinate, drift, and don't survive contact with production."
- **The Work** — "I architect the backbone: hybrid RAG with Neo4j + pgvector, stateful agent graphs in LangGraph, and the observability to prove the system is actually thinking."
- **The Outcome** — "Features that your team can extend, your CFO can measure, and your compliance officer can sign off on."

### Section 3 — Selected Work (the Case Study Rail)

Horizontal drag-scroll gallery. Each card = one case study with a kinetic hover (Codrops-style image distortion or split-text reveal).

**Card 1 — Quiet Horizons TelePsychiatry**
> HIPAA-compliant Clinical OS. Ambient AI scribe that transforms raw WebSocket audio into signed SOAP notes with zero draft-state writes — immutable audit trail by design. Angular 21, NestJS, Drizzle, Vertex AI Gemini, GCP BAA.

**Card 2 — PureTome AI Biographer**
> Consumer platform that helps authors write memoirs with an adaptive AI partner. Three-brain memory architecture (RAG + episodic + author profile) achieving 40% narrative-coherence lift over baseline RAG. React 19, NestJS microservices, LangGraph, Neo4j, pgvector.

**Card 3 — Showcase repo #1 (Agentic Context System)** — *placeholder, fills in as repos ship*
**Card 4 — Showcase repo #2**
**Card 5 — Showcase repo #3**

Each card links to `/work/[slug]`.

### Section 4 — The Stack (interactive)

Radial or force-directed graph visualization (d3-force). Nodes are technologies grouped by layer: AI/Data · Backend · Frontend · Infra · Compliance. Clicking a node opens a side-drawer with a one-paragraph explainer of *how* Max uses it, not just that he knows it. This is the "prove you're not a buzzword résumé" section.

**Layers rendered:**
- **AI/Data Intelligence:** Hybrid RAG · Neo4j · pgvector · LangGraph · MCP · Vertex AI · Gemini · Claude Code
- **Backend:** NestJS 11 · Node.js · Drizzle · Postgres · Redis/Bull · QStash · Cloud Pub/Sub
- **Frontend:** Angular 21 · React 19 · Spartan UI · Tailwind v4 · TypeScript
- **Infrastructure:** GCP · Terraform · Kubernetes · Docker · GitHub Actions · Firebase
- **Compliance & Security:** HIPAA/BAA · AES-256-GCM · Google DLP · Tink · OAuth2/JWT

### Section 5 — Engagement Model (conversion section)

Two columns.

**Left — How we work:**
> **C2C through PureTome Labs (DBA).** Corp-to-corp contract, W-9, COI on request, NDA/MSA ready. I invoice weekly in arrears. No agency markup, no recruiter middleman — you're contracting with the architect directly.

> **Rate:** $125/hr, typical engagement 20–40 hrs/week, 8–16 week initial scope.

> **Fit:** Best when you have a concrete AI feature that's stuck between prototype and production, or a greenfield system where the architecture choices you make in month one will cost you for two years if you get them wrong.

**Right — What you get in the first week:**
- Day 1–2: Read your codebase, shadow a sprint, talk to the team.
- Day 3–4: Written architecture memo — what I'd keep, what I'd change, what I'd rip out.
- Day 5: 60-minute review with your CTO. If we don't both see value, engagement ends. No kill fee.

**CTA:** `Start a conversation →` (opens contact form, routes to `max.millien@puretome.com`) · `See my résumé →`

> Direct: `max.millien@puretome.com` — displayed as text, not a mailto link, to reduce scraper harvest.

### Section 6 — Footer

Three columns + a thin bottom bar.

- **Col 1 — Site:** Work · Stack · Engage · Résumé · Contact
- **Col 2 — Ecosystem:** PureTome (product, puretome.com) · Writing (blog.puretome.com) · GitHub (github.com/maxathy) · LinkedIn
- **Col 3 — Get in touch:** `max.millien@puretome.com` · Calendly · Greater Boston

**Social icons (below footer columns, muted, small):** three icons only — GitHub, LinkedIn, Medium. No Twitter/X, no Instagram, no TikTok. Three signals "professional"; eight signals "personal brand." The memoir-era Carrd footer's full social wall is intentionally not carried over.

**Bottom bar (smaller text, muted color):**
`© 2026 PureTome Labs · Also an author →` (the single memoir entry point)

---

## `/author` — The Memoir Subpage

A visually distinct page, warmer palette, serif typography, slower pacing. Treated as a separate brand experience so a CTO who accidentally lands on it can immediately tell this is a different surface — not Max's professional page.

### Structure

1. **Header:** "Max Millien — Author of *Traffic Engineer*" with breadcrumb back to the professional home.
2. **The Book:** cover art, three-paragraph summary, buy links (Amazon, Apple Books, etc.), sample chapter.
3. **The Album:** embedded player (Spotify / CDBaby / Apple Music), track list with the four-act structure from the blueprint, liner notes.
4. **The Living Epilogue** (`/author/epilogue`): the promise kept. A dated, prose-form continuation of the memoir's final chapter — Max's ongoing reflections on recovery, rebuilding, and the work of Puretome. Updated periodically. First entry: the founding of PureTome Labs and the C2C mission.
5. **Press & Contact:** one-line press inquiry route, separate from the C2C contact.

### SEO posture for /author

- `/author` is `index, follow` (so memoir searchers can find it)
- `/author/epilogue` and `/author/album` are `index, follow`
- But homepage does NOT link to `/author` except in the muted footer line, so Google's link-graph signal keeps the professional home dominant for "Max Millien" queries
- Distinct OpenGraph tags, distinct Twitter card, distinct schema.org `Person` with `@type: Author` (vs. homepage's `Person` with `jobTitle: Principal AI Architect`)

---

## Visual & Interaction Design

**Design philosophy:** the site is a portfolio piece. Every interaction is evidence of craft. But restraint is the discipline — one marquee moment (the hero mesh), one kinetic moment per section, nothing more. A CTO's patience for a dev portfolio is about 8 seconds; we earn each additional second.

### Design tokens

- **Palette:** near-black background (`#0A0A0B`), off-white foreground (`#F5F4F0`), one accent. Proposed accent: `#D4FF4F` (electric lime — signals "technical", differentiates from the sea of indigo devfolios). Secondary muted: `#4A4A52`.
- **Typography:**
  - Display: **Söhne** or **Inter Display** (tight tracking, -0.02em on large sizes)
  - Body: **Inter** variable
  - Mono (for code/stack callouts): **JetBrains Mono**
  - `/author` override: **Canela** or **GT Sectra** serif for warmth
- **Spacing:** 8px base grid. Vertical rhythm tuned to 1.5× line-height.
- **Motion primitives:** 400ms default, `cubic-bezier(0.22, 1, 0.36, 1)` easing (Codrops staple). Scroll-driven animation via native `ScrollTimeline` where supported, GSAP ScrollTrigger fallback.

### Interaction catalogue

| Surface | Interaction |
|---|---|
| Hero | three.js knowledge-graph mesh, cursor-parallax tilt, scatter-to-coalesce on mount |
| Nav | morph-style active indicator, magnetic hover on CTA |
| Offer section | horizontal scroll-pinned reveal, split-text per tile |
| Case study rail | drag-scroll gallery, image distortion on hover (displacement shader), card lift 3D transform |
| Stack graph | d3-force simulation, drag-to-reposition, node-click opens side drawer |
| Engagement section | sticky column behavior, subtle number count-up on scroll |
| Page transitions | View Transitions API (native), crossfade + slight scale |
| Cursor | custom cursor that morphs over interactive elements (desktop only, respects prefers-reduced-motion) |
| Reduced motion | every one of the above has a respectful static fallback |

### Accessibility

- WCAG AA contrast on all text (the lime-on-black combo is tested)
- Full keyboard nav; focus ring is accent-colored and thick
- All motion wrapped in `prefers-reduced-motion: reduce` guards
- Screen-reader labels on every iconographic element
- Lighthouse target: Performance 95+, Accessibility 100, Best Practices 100, SEO 100

---

## Technical Architecture

### Stack

- **Framework:** React 19 (concurrent features, `use` hook, transitions)
- **Build:** Vite 6
- **Routing:** TanStack Router (type-safe, file-based)
- **Styling:** Tailwind CSS v4 (aligns with canonical stack) + CSS Modules for component-scoped bespoke styles
- **Animation:** GSAP + ScrollTrigger (Club GSAP license under `maxmillienjr@gmail.com` — use premium plugins: SplitText, ScrollSmoother, MorphSVG where they earn their place), Framer Motion for component-level transitions
- **3D:** three.js via `@react-three/fiber` + `@react-three/drei`
- **Data viz:** d3 (force simulation for stack graph)
- **Forms:** React Hook Form + Zod validation
- **Typography loading:** `next/font`-equivalent via Fontsource with subsetting
- **Analytics:** Plausible (privacy-friendly, no cookie banner needed)
- **Error tracking:** Sentry (free tier)
- **SEO:** react-helmet-async for dynamic meta, static sitemap.xml + robots.txt generated at build
- **Hosting:** Firebase Hosting (free Spark plan sufficient — static SPA)
- **Contact form backend:** Firebase Cloud Function (Node 24) → Resend API for email delivery
- **CI/CD:** GitHub Actions → `firebase deploy` on merge to `main`
- **Domain:** `maxmillienwrites.com` (existing, currently pointed at Carrd — cutover via DNS)

### Why React 19 + Firebase specifically

- React 19 aligns with the PureTome frontend stack (consistency for recruiters inspecting GitHub)
- Firebase Hosting: free, global CDN, SSL automatic, atomic deploys with instant rollback, preview channels for PR reviews
- No Next.js / SSR overhead needed — this is a content site, not an app; static SPA with pre-rendered critical routes is sufficient
- Firebase Functions give us one secure contact endpoint without spinning up a server

### Project structure (monorepo-lite, single package)

```
maxmillienwrites/
├── PRD.md                         ← this document, committed at project root
├── README.md
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── firebase.json
├── .firebaserc
├── .github/workflows/deploy.yml
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   └── og/                        ← OG images per route
├── functions/                     ← Firebase Cloud Functions
│   └── src/contact.ts
└── src/
    ├── main.tsx
    ├── routes/
    │   ├── __root.tsx
    │   ├── index.tsx              ← homepage
    │   ├── work/
    │   ├── stack.tsx
    │   ├── engage.tsx
    │   ├── resume.tsx
    │   ├── contact.tsx
    │   └── author/
    │       ├── index.tsx
    │       ├── epilogue.tsx
    │       └── album.tsx
    ├── components/
    │   ├── hero/
    │   │   ├── HeroMesh.tsx       ← three.js scene
    │   │   └── HeroCopy.tsx
    │   ├── stack-graph/
    │   ├── case-study-rail/
    │   ├── nav/
    │   └── ui/                    ← shared primitives
    ├── content/                   ← MDX-based content
    │   ├── case-studies/
    │   └── epilogue/
    ├── lib/
    │   ├── seo.ts
    │   ├── analytics.ts
    │   └── motion.ts
    └── styles/
        └── globals.css
```

---

## SEO & Discoverability Plan

### Target queries & intent

| Query | Intent | Target page | Priority |
|---|---|---|---|
| `max millien` | navigational / vetting | `/` homepage | **#1 critical** |
| `max millien architect` | vetting / C2C | `/` | high |
| `max millien puretome` | product | `/` (with outbound to puretome.com) | high |
| `puretome labs c2c` | buyer | `/engage` | medium |
| `max millien traffic engineer` | memoir readers | `/author` | medium |
| `traffic engineer memoir` | book discovery | `/author` | medium |

### On-page SEO

- Homepage `<title>`: `Max Millien — Principal AI Architect | PureTome Labs`
- Homepage meta description: C2C-focused, zero memoir content (see Strategic Positioning)
- schema.org Person + ProfessionalService markup on homepage
- schema.org Book + MusicAlbum markup on `/author`
- OpenGraph images generated per-route (satori or static PNGs)
- Canonical URLs on every route
- `sitemap.xml` generated at build, submitted to Google Search Console
- `llms.txt` at root advertising Max as AI-specialized consultant (future-proofing for AI-crawler-driven discovery)

### Off-page / authority

- Link from puretome.com → maxmillienwrites.com (founder bio)
- Link from blog.puretome.com → maxmillienwrites.com (author bio on each post)
- Link from GitHub profile README → maxmillienwrites.com
- LinkedIn featured section → maxmillienwrites.com

---

## Carrd Decommission Plan

The current Carrd is a single-page site on a custom domain. No deep links to preserve (Google only indexes `/`, anchor fragments aren't separate URLs). Cutover is a DNS flip at Squarespace, not a redirect engineering exercise.

1. **Pre-launch:** build new site on a Firebase preview channel (e.g., `preview--maxmillienwrites.web.app`). Full QA against Lighthouse, real-device testing.
2. **Cutover (Squarespace DNS):** update the A/AAAA (or CNAME) records for `maxmillienwrites.com` from Carrd's IPs to Firebase Hosting's values. Firebase auto-provisions SSL once DNS propagates.
3. **Re-index:** submit updated sitemap in Google Search Console, request re-indexing of `/` and `/author`.
4. **Verify & delete Carrd:** confirm the live site is serving from Firebase (`curl -I maxmillienwrites.com` response headers should show Firebase), then delete the Carrd site and cancel the paid plan.

No `firebase.json` redirect rules needed — nothing to redirect from.

---

## Milestones

| Phase | Scope | Duration |
|---|---|---|
| **0. PRD approval** (this session) | finalize PRD, commit to repo | — |
| **1. Scaffold** | Vite + React 19 + Tailwind + TanStack Router + Firebase init, CI/CD green | 1 day |
| **2. Design system** | tokens, typography, motion primitives, nav shell, footer | 1 day |
| **3. Homepage sections 1–3** | hero mesh, offer section, case study rail | 2–3 days |
| **4. Homepage sections 4–6** | stack graph, engagement, footer + contact | 2 days |
| **5. /work, /stack, /engage, /resume** | secondary routes | 2 days |
| **6. /author suite** | memoir, album, living epilogue with distinct design treatment | 2 days |
| **7. SEO + perf pass** | Lighthouse ≥95, schema, sitemap, OG images | 1 day |
| **8. Preview review** | stakeholder review, final copy edits | 1 day |
| **9. Cutover** | DNS switch, re-index, monitor | 1 day |

**Total: ~13 working days to full cutover.** Compatible with the July 2026 deadline (this is an April 2026 start).

---

## Resolved Decisions (from PRD review session)

1. **Animation stack:** Club GSAP license confirmed (`maxmillienjr@gmail.com`) — use premium plugins where they earn their place.
2. **Hero mesh:** real labeled knowledge graph with actual architectural terms as node labels, not abstract mesh. The literal labels are the proof.
3. **Living Epilogue cadence:** no fixed cadence required — promise is fulfilled by the page existing under Max Millien's ownership. Ship as plain MDX files, no CMS.
4. **Primary contact email:** `max.millien@puretome.com`. Matching-domain email reinforces the "real company, not a side hustle" signal for C2C buyers. Gmail relegated to résumé PDF footer only.
5. **Footer social icons:** curated to three — GitHub, LinkedIn, Medium (blog.puretome.com). The memoir-era Carrd social wall is not carried over.
6. **/now page:** not in scope for v1.

---

## Verification

End-to-end test plan for the final implementation (not this session):

- **Functional:** every route renders, every link resolves, contact form submits and emails land
- **Visual:** pixel parity between design tokens and implementation on Chrome / Safari / Firefox, desktop + mobile
- **Performance:** Lighthouse ≥95 across all categories on `/` and `/author`; LCP <1.5s on 4G throttle; no CLS
- **Accessibility:** axe-core clean; keyboard-only traversal of every interactive element; `prefers-reduced-motion` disables all non-essential motion
- **SEO:** Google's Rich Results Test passes on all schema; sitemap submits cleanly; SERP preview (via rank tracker or manual incognito search) shows the architect snippet, not a memoir snippet
- **Cutover:** `curl -I maxmillienwrites.com` returns 200 with Firebase response headers; Carrd site subsequently deleted

---

## Critical files to create on implementation

- `maxmillienwrites/PRD.md` — this document, committed at root as the source of truth
- `maxmillienwrites/src/routes/index.tsx` — homepage composition
- `maxmillienwrites/src/components/hero/HeroMesh.tsx` — the signature interaction
- `maxmillienwrites/src/routes/author/index.tsx` — memoir landing (segregated design)
- `maxmillienwrites/src/lib/seo.ts` — schema + meta generation
- `maxmillienwrites/firebase.json` — hosting config (SPA rewrite to `index.html`, caching headers)
- `maxmillienwrites/functions/src/contact.ts` — contact form handler
