import { Language } from './Language.ts'
import { MediaInfo } from './MediaInfo.ts'
import { RestResource } from './RestResource.ts'
import { EpisodeFileQuality } from './EpisodeFileQuality.ts'

export interface EpisodeFile extends RestResource {
  seriesId: number
  seasonNumber: number
  relativePath: string
  path: string
  size: number
  dataAdded: string
  sceneName: string
  quality: EpisodeFileQuality
  language: Language
  mediaInfo: MediaInfo
  originalFilePath: string
  qualityCutoffNotMet: boolean
}
