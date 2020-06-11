import { RestResource } from './RestResource.ts'
import { IndexerField } from './IndexerField.ts'

export interface Indexer extends RestResource {
  enableRss: boolean
  enableSearch: boolean
  supportsRss: boolean
  supportsSearch: boolean
  protocol: string
  name: string
  fields: IndexerField[]
  implementationName: string
  implementation: string
  configContract: string
  infoLink: string
}
