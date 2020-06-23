import { Genres } from '../Genre.ts'
import { Company } from '../Company.ts'
import { Country } from '../Country.ts'
import { SpokenLanguage } from '../SpokenLanguage.ts'

export interface Movie {
  adult: boolean
  backdrop_path: string | null
  belonds_to_collection: object | null
  budget: number
  id: number
  imdb_id: string | null
  genres: Genres
  homepage: string | null
  original_language: string
  original_title: string
  overview: string | null
  popularity: number
  poster_path: string | null
  _companies: Company[]
  _countries: Country[]
  spoken_languages: SpokenLanguage[]
  status: 'Rumored' | 'Planned' | 'In ' | 'Post ' | 'Released' | 'Cancelled'
  tagline: string | null
  video: boolean
  vote_average: number
  vote_count: number
}
