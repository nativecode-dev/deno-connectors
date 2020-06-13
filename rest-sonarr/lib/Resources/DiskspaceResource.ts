import { RestResource } from '../../deps.ts'

import { Diskspace } from '../Models/Diskspace.ts'

export class DiskspaceResource extends RestResource {
  constructor(url: URL, apikey: string) {
    super(url)
    this.setHeader('X-Api-Key', apikey)
  }

  list(): Promise<Diskspace[]> {
    return this.http_get<Diskspace[]>('diskspace')
  }
}
