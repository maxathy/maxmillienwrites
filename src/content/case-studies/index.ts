import type { ClientCaseStudyContent } from './types'
import { puretome } from './puretome'

export type { ClientCaseStudyContent, CaseStudySection } from './types'

export const clientCaseStudyContent: Record<string, ClientCaseStudyContent> = {
  puretome,
}
