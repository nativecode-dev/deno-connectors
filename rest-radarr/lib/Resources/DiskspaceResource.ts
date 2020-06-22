import { Diskspace } from '../Models/Diskspace.ts'
import { RadarrResource } from '../RadarrResource.ts'

export class DiskspaceResource extends RadarrResource {
  constructor(url: URL, apikey: string) {
    super(apikey)
  }

  list(): Promise<Diskspace[]> {
    return this.http_get<Diskspace[]>('diskspace')
  }
}
