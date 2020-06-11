import { RestResource } from './RestResource.ts'

export interface Quality2 extends RestResource {
  name: string
  source: string
  resolution: string
  modifier: string
}
