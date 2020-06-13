import { RestResource, ResourceParamType } from '../../deps.ts'

import { Queue } from '../Models/Queue.ts'

export class QueueResource extends RestResource {
  constructor(url: URL, apikey: string) {
    super(url)
    this.setHeader('X-Api-Key', apikey)
  }

  delete(id: number, blacklist: boolean = false) {
    return this.http_delete(
      'queue',
      {
        key: 'id',
        type: ResourceParamType.Query,
        value: id,
      },
      {
        key: 'blacklist',
        type: ResourceParamType.Query,
        value: blacklist,
      },
    )
  }

  list(): Promise<Queue[]> {
    return this.http_get<Queue[]>('queue')
  }
}
