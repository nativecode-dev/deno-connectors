import { Quality } from './Quality.ts'
import { RestResource } from './RestResource.ts'
import { ProfileQuality } from './ProfileQuality.ts'

export interface Profile extends RestResource {
  name: string
  upgradeAllowed: boolean
  cutoff: Quality
  items: ProfileQuality
}
