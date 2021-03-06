import { Image } from './Image.ts'
import { Season } from './Season.ts'
import { Rating } from './Rating.ts'
import { AlternateTitle } from './AlternateTitle.ts'
import { RestResource } from './RestResource.ts'

export interface Series extends RestResource {
  title: string
  alternateTitles: AlternateTitle[]
  sortTitle: string
  seasonCount: number
  totalEpisodeCount: number
  episodeCount: number
  episodeFileCount: number
  sizeOnDisk: number
  status: string
  overview: string
  previousAiring: Date
  network: string
  airTime: string
  images: Image[]
  seasons: Season[]
  year: number
  path: string
  profileId: number
  seasonFolder: boolean
  monitored: boolean
  useSceneNumbering: boolean
  runtime: number
  tvdbId: number
  tvRageId: number
  tvMazeId: number
  firstAired: Date
  lastInfoSync: Date
  seriesType: string
  cleanTitle: string
  imdbId: string
  titleSlug: string
  certification: string
  genres: string[]
  tags: any[]
  added: Date
  ratings: Rating
  qualityProfileId: number
}
