import { RestResource } from './RestResource.ts'
import { EpisodeDetails } from './EpisodeDetails.ts'
import { EpisodeFile } from './EpisodeFile.ts'

export interface Episode extends RestResource {
  seriesId: number
  episodeFile: EpisodeFile
  episodeFileId: number
  seasonNumber: number
  episodeNumber: number
  title: string
  airDate: string
  airDateUtc: Date
  overview: string
  hasFile: boolean
  monitored: boolean
  sceneEpisodeNumber: number
  sceneSeasonNumber: number
  tvDbEpisodeId: number
  series: EpisodeDetails
  downloading: boolean
}
