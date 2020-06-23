import { ResourceParamType } from '../../deps.ts'

import { Queue } from '../Models/Queue.ts'
import { RadarrResource } from '../RadarrResource.ts'
import { RadarrOptions } from '../RadarrOptions.ts'

export class QueueResource extends RadarrResource {
  constructor(options: RadarrOptions) {
    super(options)
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
