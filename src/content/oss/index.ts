import { agentNativeMonorepo } from './agent-native-monorepo'
import { realtimeVoiceInfra } from './realtime-voice-infra'
import { secureDataVault } from './secure-data-vault'
import type { OssContent } from './types'

export const ossContent: Record<string, OssContent> = {
  'agent-native-monorepo': agentNativeMonorepo,
  'realtime-voice-infra': realtimeVoiceInfra,
  'secure-data-vault': secureDataVault,
}

export type { OssContent } from './types'
