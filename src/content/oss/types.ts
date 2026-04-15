import type { ReactNode } from 'react'

export type OssSection = {
  heading: string
  body: ReactNode
}

export type OssContent = {
  slug: string
  problem: ReactNode
  architecture: {
    walkthrough: ReactNode
    diagram: ReactNode
  }
  threatModel: ReactNode
  extractionNote: ReactNode
  additionalSections?: OssSection[]
}
