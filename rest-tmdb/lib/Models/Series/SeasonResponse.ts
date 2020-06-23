import { Episode } from './Episode.ts'

export interface SeasonResponse {
  _id: string
  air_date: string
  episodes: Episode[]
  name: string
  overview: string
  id: number
  poster_path: string | null
  season_number: number
}
