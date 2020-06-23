import { Credit } from '../Credit.ts'

export interface EpisodeResponse {
  air_date: string
  crew: Credit[]
  episode_number: number
  guest_stars: Credit[]
  name: string
  overview: string
  id: number
  production_code: string | null
  season_number: number
  still_path: string | null
  vote_average: number
  vote_count: number
}
