import { Quality } from './Quality.ts'
import { MediaInfo } from './MediaInfo.ts'
import { RestResource } from './RestResource.ts'

export interface MovieFile extends RestResource {
  movieId: number
  relativePath: string
  size: number
  dateAdded: Date
  quality: Quality
  edition: string
  mediaInfo: MediaInfo
}
