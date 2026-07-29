export type Role = {
  company: string
  title: string
  start: string
  end: string
  bullets: string[]
  current?: boolean
  /**
   * Roles are dated here once, in one place, even though the public page
   * renders the curated dateless view. Set false to keep a short contract
   * stint out of that curated view. The dated chronology used for job
   * submissions lives in the Drive doc, not here.
   */
  inHighlights?: boolean
}

export type SkillGroup = {
  label: string
  items: string[]
}

export type Education = {
  institution: string
  degree: string
  start?: string
  end?: string
}

export type OpenSourceProject = {
  name: string
  href: string
  blurb: string
}

export type OpenSource = {
  contributionsPrefix: string
  contributionRepos: string[]
  projects: OpenSourceProject[]
}

export type Resume = {
  name: string
  location: string
  phone: string
  email: string
  github: string
  pdfHref: string
  summary: string
  skills: SkillGroup[]
  openSource: OpenSource
  experience: Role[]
  education: Education[]
}

export const resume: Resume = {
  name: 'Max Millien',
  location: 'Greater Boston Area',
  phone: '(617) 224-7372',
  email: 'max.millien@puretome.com',
  github: 'github.com/maxmillienjr',
  pdfHref: '/resume/Millien-Max-2026.pdf',
  summary:
    'Full-stack architect and product owner with experience in turning complex ideas into scalable, production-ready systems. Specialized in RAG architectures, agentic workflows, and high-performance frontend engineering. Expertise across backend infrastructure and UX/UI design, building systems that are technically robust and intuitively usable. Innovating at the intersection of engineering and product strategy: designing for scale, driving engagement, and shipping with speed.',
  skills: [
    {
      label: 'AI & Data Intelligence',
      items: [
        'Generative AI (GenAI)',
        'Hybrid RAG (Neo4j, PGVector)',
        'LangChain/LangGraph',
        'Agentic Workflows & Agentic IDEs (Claude Code)',
        'MCP',
        'Context Engineering',
        'Gemini API',
        'Vertex AI',
        'Ollama',
        'Weaviate',
      ],
    },
    {
      label: 'Backend & Databases',
      items: [
        'Node.js (NestJS, Express)',
        'C# (.NET Core, ASP.NET)',
        'Java (Spring Boot)',
        'Ruby on Rails',
        'PostgreSQL',
        'MongoDB',
        'Cloud SQL',
        'SQL Server',
      ],
    },
    {
      label: 'Compliance & Security',
      items: [
        'HIPAA/BAA Compliance',
        'Google DLP (PII De-identification)',
        'Secure WebSockets',
        'JWT/OAuth2',
        'AES-256 Encryption',
        'Stripe API',
      ],
    },
    {
      label: 'Infrastructure & Eventing',
      items: [
        'GCP',
        'AWS',
        'Azure',
        'Terraform',
        'Kubernetes',
        'Docker',
        'CI/CD',
        'Redis (Bull)',
        'Google Cloud Pub/Sub',
        'QStash',
        'RabbitMQ',
      ],
    },
    {
      label: 'Frontend & UX Engineering',
      items: [
        'React',
        'Next.js',
        'Angular',
        'TypeScript/ESNext',
        'Redux Toolkit',
        'Tailwind CSS',
        'shadcn/ui',
        'Spartan UI',
        'Material Design',
        'Slate.js',
        'SEO/GEO',
        'D3.js',
      ],
    },
  ],
  openSource: {
    contributionsPrefix: 'merged fixes to',
    contributionRepos: ['Angular (core)', 'claude-mem'],
    projects: [
      {
        name: 'realtime-voice-infra',
        href: 'https://github.com/maxmillienjr/realtime-voice-infra',
        blurb: 'voice-agent transport layer: AudioWorklet capture, backpressure-aware streaming',
      },
      {
        name: 'agent-native-monorepo',
        href: 'https://github.com/maxmillienjr/agent-native-monorepo',
        blurb: 'stateful LangGraph agent chassis with a three-tier memory architecture',
      },
      {
        name: 'secure-data-vault',
        href: 'https://github.com/maxmillienjr/secure-data-vault',
        blurb: 'regulated-data reference architecture: envelope encryption, tamper-evident audit trails',
      },
      {
        name: 'royalty-lookout',
        href: 'https://github.com/maxmillienjr/royalty-lookout',
        blurb: 'normalizes KDP, IngramSpark, and StreetLib royalty exports into one ledger',
      },
    ],
  },
  experience: [
    {
      company: 'Quiet Horizon PLLC',
      title: 'Principal Architect (C2C contract)',
      start: '2026',
      end: 'Present',
      current: true,
      bullets: [
        'Shipped a HIPAA-compliant telehealth and patient dossier management platform utilizing GCP, Google Workspace BAA (ADC), and strict AES-256-GCM encryption for all PHI at rest via NestJS and Drizzle ORM.',
        'Engineered an ambient AI medical scribe utilizing Vertex AI (Gemini 3). Designed a stateless inference pipeline that transforms raw WebSocket audio dictations into structured psychiatric notes dynamically in-memory, ensuring zero draft-state database writes to preserve strictly immutable medical audit trails.',
        'Developed a highly reactive clinical workspace using Angular 21 and Spartan UI, featuring a real-time secure dictation pipeline that streams live browser audio over WebSockets to Google Speech-to-Text, reducing provider charting time by synthesizing complex psychiatric evaluations in seconds.',
      ],
    },
    {
      company: 'PureTome',
      title: 'Principal Engineer & Product Owner',
      start: '2025',
      end: 'Present',
      current: true,
      bullets: [
        'Spearheaded the product development and UX design to launch an AI Biographer platform, empowering users to craft, publish, and distribute ebook/paperback memoirs and biographies.',
        'Built and deployed an LLM-agnostic stateless engine leveraging LangGraph, Neo4j, and PGVector, significantly improving large narrative coherence (500k words) over standard RAG implementations.',
        'Engineered a high-performance monorepo integrating a React 19 frontend with Node.js/NestJS microservices.',
        'Built an internal growth engine (Next.js, shadcn/ui) to monitor telemetry and orchestrate AI credit economies.',
        'Designed and shipped a "Hybrid Memory System" combining vector similarity search with graph-based causality mapping to execute multi-step AI workflows without hallucination.',
        'Orchestrated background job queues and asynchronous service communication using Redis (Bull), Google Cloud Pub/Sub, and QStash for reliable, heavy-workload AI processing.',
        'Implemented rigorous DevOps and testing standards, building a zero-downtime CI/CD pipeline via GitHub Actions, GCP, and Terraform, backed by comprehensive Playwright E2E and 85% Jest unit test coverage.',
      ],
    },
    {
      company: 'Altlending',
      title: 'Senior Consultant (W2 contract)',
      start: '2018',
      end: '2019',
      inHighlights: false,
      bullets: [
        'Developed an institutional crypto-lending platform issuing USD loans collateralized by digital assets (BTC/ETH).',
        'Migrated a Node.js/MongoDB prototype backend to .NET Core / PostgreSQL and refactored the React front end.',
        'Stood up AWS CI/CD (CodeStar) and established front-end patterns for long-term maintainability.',
      ],
    },
    {
      company: 'SBE Vision',
      title: 'Engineering Lead',
      start: '2016',
      end: '2018',
      bullets: [
        'Led a team of 11 developers (across 3 time zones), directed agile processes, and architected microservice infrastructure across GKE and on-prem Kubernetes clusters, integrating GitLab CI/Nexus pipelines.',
        'Designed and developed a modular Angular UI toolkit leveraging Material Design/Tachyons/D3.js, standardizing UX and cutting design-to-development time. The service layer consisted of 10+ microservices built with Spring Boot, Nest.js, and Koa.js, along with Postgres for persistence.',
        'Wrote an automation framework using Node/MongoDB that used Testcafe and Maven Surefire to provide nightly results on e2e testing of microservices. Service logging was performed using the ELK stack with Filebeat.',
        'Configured registries for Docker, npm, Helm, and Maven, streamlining DX and cutting build times.',
        'Implemented an out-of-stack identity provider/management service for authentication (OAuth2, JWT).',
      ],
    },
    {
      company: 'Intac International',
      title: 'Senior Software Engineer (W2 contract)',
      start: '2015',
      end: '2016',
      inHighlights: false,
      bullets: [
        'Created a large, data-driven toolkit of reusable/themeable web components for WintacOnline, a cross-device SaaS for mobile CRM, booking, dispatching, and billing automation; segmented the core app into market-specific interfaces: HVAC, Plumbing, Cleaning (EmberJS, Ruby on Rails, AWS, CircleCI, RDS).',
        'Authored the majority of the UI framework and established code-review standards while mentoring the team.',
      ],
    },
    {
      company: 'Verizon',
      title: 'Senior Software Engineer',
      start: '2014',
      end: '2015',
      bullets: [
        'Built web apps and RESTful web services to manage enterprise private cloud organizations and their associated accounts, virtual machines, storage, firewalls, billing, and usage (Dropwizard, Swagger, RabbitMQ, Angular, Express, Nginx, Postgres, CentOS).',
        'Championed best practices for Node.js, Angular, and Docker adoption, and standardized front-end workflows across teams.',
        'Designed cross-platform Vagrant/Docker dev clusters that reduced environment setup time from 2 days to under 2 hours, accelerating team onboarding and CI pipeline readiness.',
        'Built an automated OpenShift STI deployment pipeline for containerized microservices, enabling zero-downtime releases and reducing deployment errors.',
      ],
    },
    {
      company: 'G4S',
      title: 'Senior Software Engineer',
      start: '2012',
      end: '2014',
      bullets: [
        'Developed a configurable survey and incident reporting tool (Knockout.js, RavenDB, ASP.NET MVC) deployed across 17K+ security systems, improving data collection efficiency and UX consistency.',
        'Built SQL-to-RavenDB migration utilities and Excel importers supporting 100K+ system records.',
        'Enhanced Card Access Control app with 10+ new features and performance optimizations, reducing load times and improving system uptime.',
        'Developed recruitment workflow module (Angular, C#, RabbitMQ, Azure), implementing CQRS architecture, improving request processing speed, and reducing code complexity.',
      ],
    },
    {
      company: 'Partners Health',
      title: 'Senior Software Engineer (W2 contract)',
      start: '2011',
      end: '2012',
      bullets: [
        'Developed applications for the Acute Care Documentation team to provide real-time electronic medical record solutions, thereby replacing paper flow sheets, assessments, and clinical notes.',
        'Implemented a cost analysis tool for the Imaging Finance department that is used for tracking the usage of radiology resources owned by Massachusetts General Hospital.',
      ],
    },
  ],
  education: [
    {
      institution: 'Boston University',
      degree: 'Bachelor of Science, Electrical Engineering',
      start: '2003',
      end: '2007',
    },
  ],
}

export const PREVIOUS_ROLES_LABEL = 'Earlier Experience'
