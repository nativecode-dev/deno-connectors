import { Allowed } from './Allowed.ts'
import { RestResource } from './RestResource.ts'
import { Profile } from './Profile.ts'

export interface Value extends RestResource {
  name: string
  allowed: Allowed[]
  cutoff: Profile
}
