export type Role = {
  company: string
  title: string
  start: string
  end: string
  bullets: string[]
  current?: boolean
}

export type SkillGroup = {
  label: string
  items: string[]
}

export type Education = {
  institution: string
  degree: string
  start: string
  end: string
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
  experience: Role[]
  education: Education[]
}

export const resume: Resume = {
  name: 'Max Millien',
  location: 'Greater Boston Area',
  phone: '(617) 224-7372',
  email: 'max.millien@puretome.com',
  github: 'github.com/maxathy',
  pdfHref: '/resume/Millien-Max-2026.pdf',
  summary:
    'Elite full-stack architect and product owner with 10+ years of experience turning complex ideas into scalable, production-ready systems. Specialized in advanced RAG architectures, agentic workflows, and high-performance frontend engineering. Deep expertise across backend infrastructure and UX/UI design, building systems that are technically robust and intuitively usable. Innovating at the intersection of engineering depth and product strategy: designing for scale, driving engagement, and shipping with speed.',
  skills: [
    {
      label: 'AI & Data Intelligence',
      items: [
        'Hybrid RAG (Neo4j, PGVector)',
        'LangGraph',
        'Agentic Workflows',
        'MCP',
        'Context Engineering',
        'Gemini API',
        'Vertex AI',
        'Ollama',
        'Weaviate',
        'Claude Code',
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
  experience: [
    {
      company: 'PureTome',
      title: 'Principal Engineer & Product Owner',
      start: '2025',
      end: 'Present',
      current: true,
      bullets: [
        'Spearheaded the product development and UX design to launch an AI Biographer platform empowering users to craft and publish memoirs, achieving a 17% beta signups conversion rate.',
        'Architected and deployed an LLM-agnostic "Stateless Specialist Pattern" engine leveraging LangGraph, Neo4j, and PGVector, achieving a 40% improvement in narrative coherence over standard RAG implementations.',
        'Engineered a high-performance monorepo integrating a React 19 frontend with Node.js/NestJS microservices.',
        'Built a custom Next.js "Command Center" utilizing shadcn/ui: a dedicated internal growth engine designed to monitor telemetry, enforce licensing models, and orchestrate complex AI credit economies.',
        'Designed a "Hybrid Memory System" combining vector similarity search with graph-based causality mapping to execute multi-step AI workflows without hallucination.',
        'Orchestrated background job queues and asynchronous service communication using Redis (Bull), Google Cloud Pub/Sub, and QStash for reliable, heavy-workload AI processing.',
        'Implemented rigorous DevOps and testing standards, building a zero-downtime CI/CD pipeline via GitHub Actions, GCP, and Terraform, backed by comprehensive Playwright E2E and Jest unit test coverage (85%).',
      ],
    },
    {
      company: 'PureTome Labs',
      title: 'Lead Consulting Architect (C2C)',
      start: '',
      end: '',
      current: true,
      bullets: [
        'Architected Quiet Horizons TelePsychiatry, a HIPAA-compliant telehealth and patient dossier management platform utilizing GCP, Google Workspace BAA (ADC), and strict AES-256-GCM encryption for all PHI at rest via NestJS and Drizzle ORM.',
        'Engineered an ambient AI medical scribe utilizing Vertex AI (Gemini 3). Designed a stateless inference pipeline that transforms raw WebSocket audio dictations into structured clinical SOAP notes dynamically in-memory, ensuring zero draft-state database writes to preserve strictly immutable medical audit trails.',
        'Developed a highly reactive clinical workspace using Angular 21 and Spartan UI, featuring a real-time secure dictation pipeline streaming live audio to Google Speech-to-Text, reducing provider charting time by synthesizing complex psychiatric evaluations in seconds.',
      ],
    },
    {
      company: 'SBE Vision',
      title: 'Engineering Lead',
      start: '',
      end: '',
      bullets: [
        'Architected hybrid microservice infrastructure across GKE and on-prem Kubernetes clusters, integrating GitLab CI/Nexus pipelines to accelerate deployment throughput by over 50%.',
        'Led a team of 11 developers (across 3 time zones), directed agile processes that improved delivery velocity by 35% and reduced cross-team communication delays.',
        'Designed and developed a modular Angular UI toolkit leveraging Material Design/Tachyons/D3.js, standardizing UX and cutting design-to-development time. Service layer consisted of 10+ Spring Boot, Nest.js, and Koa.js microservices along with Postgres for persistence.',
        'Wrote an automation framework using Node/MongoDB that used Testcafe and Maven Surefire to provide nightly results on e2e testing of microservices. Service logging was performed using the ELK stack with Filebeat.',
        'Configured registries for Docker, npm, Helm, and Maven, streamlining DX and cutting build times by 30%.',
        'Implemented an out-of-stack identity provider/management service for authentication (OAuth2, JWT).',
      ],
    },
    {
      company: 'Verizon',
      title: 'Senior Software Engineer',
      start: '',
      end: '',
      bullets: [
        'Built web apps and RESTful web services for creating private cloud organizations and managing their associated accounts, virtual machines, storage, firewalls, billing, and usage (Dropwizard, Swagger, RabbitMQ, Angular, Express, Nginx, Postgres, CentOS).',
        'Championed best practices for Node.js, Angular, and Docker adoption, standardizing front-end workflows and increasing developer output by 25%.',
        'Designed cross-platform Vagrant/Docker dev clusters that reduced environment setup time from 2 days to under 2 hours, accelerating team onboarding and CI pipeline readiness.',
        'Built an automated OpenShift STI deployment pipeline for containerized microservices, enabling zero-downtime releases and reducing manual deployment errors by 80%.',
      ],
    },
    {
      company: 'G4S',
      title: 'Senior Software Engineer',
      start: '',
      end: '',
      bullets: [
        'Developed a configurable survey and incident reporting tool (Knockout.js, RavenDB, ASP.NET MVC) deployed across 17K+ security systems, improving data collection efficiency and UX consistency.',
        'Built SQL-to-RavenDB migration utilities and Excel importers supporting 100K+ system records, enabling seamless legacy-to-modern data transition.',
        'Enhanced Card Access Control app with 10+ new features and performance optimizations, reducing load times by 35% and improving system uptime.',
        'Developed recruitment workflow module (Angular, C#, RabbitMQ), implementing CQRS architecture, improving request processing speed, and reducing code complexity by 20%.',
      ],
    },
    {
      company: 'Partners Health',
      title: 'Senior Software Engineer',
      start: '',
      end: '',
      bullets: [
        'Developed applications for the Acute Care Documentation team to provide real-time electronic medical record solutions, thereby replacing paper flow sheets, assessments, and clinical notes.',
        'Implemented a cost analysis tool for the Imaging Finance department used for tracking the usage of radiology resources owned by Massachusetts General Hospital.',
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

export const PREVIOUS_ROLES_LABEL = 'Notable Previous Engineering Leadership & Full-Stack Roles'
export const PREVIOUS_ROLES_RANGE = '2007 – 2019'
