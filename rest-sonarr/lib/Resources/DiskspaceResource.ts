import { Diskspace } from '../Models/Diskspace.ts'
import { SonarrResource } from '../SonarrResource.ts'

export class DiskspaceResource extends SonarrResource {
  constructor(url: URL, apikey: string) {
    super(url, apikey)
  }

  list(): Promise<Diskspace[]> {
    return this.http_get<Diskspace[]>('diskspace')
  }
}
