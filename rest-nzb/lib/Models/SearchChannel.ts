import { SearchAttribute } from './SearchAttribute.ts'
import { SearchResultItem } from './SearchResultItem.ts'

export interface SearchChannel {
  title: string
  link: string
  webMaster: string
  category: any
  response: SearchAttribute
  item: SearchResultItem[]
}
