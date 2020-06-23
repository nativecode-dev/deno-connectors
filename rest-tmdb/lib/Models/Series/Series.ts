import { Credit } from '../Credit.ts'
import { Genres } from '../Genre.ts'
import { Company } from '../Company.ts'

import { Episode } from './Episode.ts'
import { Season } from './Season.ts'

export interface Series {
  backdrop_path: string | null
  created_by: Credit[]
  episode_run_time: number[]
  first_air_date: string
  genres: Genres
  homepage: string
  id: number
  in_production: boolean
  languages: string[]
  last_air_date: string
  last_episode_to_air: Episode | null
  name: string
  next_episode_to_air: Episode | null
  networks: Company[]
  number_of_episodes: number
  number_of_seasons: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string | null
  production_companies: Company[]
  seasons: Season[]
  status: string
  type: string
  vote_average: number
  vote_count: number
}
