import { Statistics } from './Statistics.ts'

export interface Season {
  seasonNumber: number
  monitored: boolean
  statistics: Statistics
}
