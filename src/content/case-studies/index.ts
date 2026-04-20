import type { ClientCaseStudyContent } from './types'
import { puretome } from './puretome'
import { quietHorizons } from './quiet-horizons'

export type { ClientCaseStudyContent, CaseStudySection } from './types'

export const clientCaseStudyContent: Record<string, ClientCaseStudyContent> = {
  puretome,
  'quiet-horizons': quietHorizons,
}
