import { HistoryRecord } from './HistoryRecord.ts'

export interface History {
  page: number
  pageSize: number
  sortKey: string
  sortDirection: string
  totalRecords: number
  records: HistoryRecord[]
}
