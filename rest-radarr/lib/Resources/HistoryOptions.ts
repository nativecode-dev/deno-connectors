import { HistorySortKey } from './HistorySortKey.ts'
import { SortDirection } from '../Models/SortDirection.ts'

export interface HistoryOptions {
  pageSize: number
  sortDir?: SortDirection
  sortKey?: HistorySortKey
}
