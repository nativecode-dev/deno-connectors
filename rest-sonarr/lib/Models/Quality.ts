import { RestResource } from './RestResource.ts'

export interface Quality extends RestResource {
  name: string
  source: string
  resolution: number
}
