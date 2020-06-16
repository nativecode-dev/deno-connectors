import { SearchAttribute } from './SearchAttribute.ts'

export interface SearchResultItem {
  [key: string]: any
  title: string
  guid: string
  link: string
  comments: string
  pubDate: string
  category: string
  description: string
  enclosure: SearchAttribute
  attr: SearchAttribute[]
  id: string
}
