import { Quality2 } from './Quality2.ts'
import { Revision } from './Revision.ts'

export interface Quality {
  quality: Quality2
  customFormats: any[]
  revision: Revision
}
