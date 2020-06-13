import { RestResource } from './RestResource.ts'

export interface Allowed extends RestResource {
  name: string
  weight: number
}
