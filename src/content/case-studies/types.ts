import type { ReactNode } from 'react'

export type CaseStudySection = {
  heading: string
  body: ReactNode
}

export type ClientCaseStudyContent = {
  slug: string
  problem: ReactNode
  architecture: {
    walkthrough: ReactNode
    diagrams: ReactNode[]
  }
  impact: ReactNode
  engagementNote: ReactNode
  additionalSections?: CaseStudySection[]
}
