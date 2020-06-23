import { Diskspace } from '../Models/Diskspace.ts'
import { SonarrResource } from '../SonarrResource.ts'
import { SonarrOptions } from '../SonarrOptions.ts'

export class DiskspaceResource extends SonarrResource {
  constructor(options: SonarrOptions) {
    super(options)
  }

  list(): Promise<Diskspace[]> {
    return this.http_get<Diskspace[]>('diskspace')
  }
}
