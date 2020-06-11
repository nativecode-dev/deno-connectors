import { Movie } from './Movie.ts'
import { Quality } from './Quality.ts'
import { HistoryData } from './HistoryData.ts'
import { RestResource } from './RestResource.ts'

export interface HistoryRecord extends RestResource {
  episodeId: number
  movieId: number
  seriesId: number
  sourceTitle: string
  quality: Quality
  qualityCutoffNotMet: boolean
  date: Date
  downloadId: string
  eventType: string
  data: HistoryData
  movie: Movie
}
