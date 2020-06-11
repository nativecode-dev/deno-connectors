import { Cutoff } from './Cutoff.ts'
import { FormatItem } from './FormatItem.ts'
import { FormatCutoff } from './FormatCutoff.ts'
import { RestResource } from './RestResource.ts'
import { ProfileQuality } from './ProfileQuality.ts'

export interface Profile extends RestResource {
  name: string
  cutoff: Cutoff
  prefereredTags: string
  items: ProfileQuality[]
  formatCutoff: FormatCutoff
  formatItems: FormatItem[]
  language: string
}
