export interface FindResults {
  movie_results: [
    {
      adult: boolean
      backdrop_path: string | null
      genre_ids: number[]
      id: number
      original_language: string | null
      original_title: string | null
      overview: string | null
      release_date: string | null
      poster_path: string | null
      popularity: number | null
      title: string | null
      video: boolean
      vote_average: number | null
      vote_count: number
    },
  ]
  person_results: any[]
  tv_results: any[]
  tv_episode_results: any[]
  tv_season_results: any[]
}
