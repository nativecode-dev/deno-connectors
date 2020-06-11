import { QualityProper } from './QualityProper.ts'

export interface Release {
  guid: string
  quality: QualityProper
  age: number
  size: number
  indexerId: number
  indexer: string
  releaseGroup: string
  title: string
  fullSeason: boolean
  sceneSource: boolean
  seasonNumber: number
  language: string
  seriesTitle: string
  episodeNumbers: number[]
  approved: boolean
  tvRageId: number
  rejections: string[]
  publishDate: string
  downloadUrl: string
  downloadAllowed: boolean
}
