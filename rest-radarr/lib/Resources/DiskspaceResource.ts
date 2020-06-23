import { Diskspace } from '../Models/Diskspace.ts'
import { RadarrResource } from '../RadarrResource.ts'
import { RadarrOptions } from '../RadarrOptions.ts'

export class DiskspaceResource extends RadarrResource {
  constructor(options: RadarrOptions) {
    super(options)
  }

  list(): Promise<Diskspace[]> {
    return this.http_get<Diskspace[]>('diskspace')
  }
}
