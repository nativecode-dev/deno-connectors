import { Series } from './Series.ts'
import { Episode } from './Episode.ts'
import { RestResource } from './RestResource.ts'
import { EpisodeFileQuality } from './EpisodeFileQuality.ts'

export interface HistoryRecord extends RestResource {
  episodeId: number
  seriesId: number
  sourceTitle: string
  quality: EpisodeFileQuality
  qualityCutoffNotMet: boolean
  date: string
  downloadId: string
  eventType: string
  data: {
    droppedPath: string
    importedPath: string
    downloadClient: string
  }
  episode: Episode
  series: Series
}
