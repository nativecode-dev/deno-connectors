import { SearchChannel } from './SearchChannel.ts'

export interface SearchResult {
  [key: string]: any
  channel: SearchChannel
}
