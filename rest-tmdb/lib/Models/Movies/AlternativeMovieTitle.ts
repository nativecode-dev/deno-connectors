export interface AlternativeMovieTitle {
  iso_3166_1: string
  title: string
  type: string
}

export interface AlternativeMovieTitles {
  id: number
  titles: AlternativeMovieTitle[]
}
