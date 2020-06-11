import { Series } from './Series.ts'
import { Episode } from './Episode.ts'
import { RestResource } from './RestResource.ts'
import { QualityProfile } from './QualityProfile.ts'

export interface Queue extends RestResource {
  episode: Episode
  quality: QualityProfile
  series: Series
  size: number
  title: string
  sizeleft: number
  timeleft: string
  estimatedCompletionTime: string
  status: string
  trackedDownloadStatus: string
  statusMessages: string[]
  downloadId: string
  protocol: string
}
