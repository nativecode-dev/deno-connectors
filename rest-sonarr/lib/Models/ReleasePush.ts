import { ReleasePushProtocol } from './ReleasePushProtocol.ts'

export interface ReleasePush {
  title: string
  downloadUrl: string
  protocol: ReleasePushProtocol
  publishDate: string
}
