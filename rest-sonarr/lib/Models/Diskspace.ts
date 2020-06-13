import { RestResource } from './RestResource.ts'

export interface Diskspace extends RestResource {
  path: string
  label: string
  freeSpace: number
  totalSpace: number
}
