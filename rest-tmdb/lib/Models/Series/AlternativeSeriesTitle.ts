export interface AlternativeSeriesTitle {
  iso_3166_1: string
  title: string
  type: string
}

export interface AlternativeSeriesTitles {
  id: number
  results: AlternativeSeriesTitle[]
}
