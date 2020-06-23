import { ResourceParamType } from '../../deps.ts'

import { Queue } from '../Models/Queue.ts'
import { SonarrResource } from '../SonarrResource.ts'
import { SonarrOptions } from '../SonarrOptions.ts'

export class QueueResource extends SonarrResource {
  constructor(options: SonarrOptions) {
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
