import { BackupType } from './BackupType.ts'
import { RestResource } from './RestResource.ts'

export interface Backup extends RestResource {
  name: string
  path: string
  type: BackupType
  time: Date
}
