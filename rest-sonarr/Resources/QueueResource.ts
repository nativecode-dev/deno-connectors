import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { RestResource, ResourceParamType } from '@nativecode/rest-client'
import { Queue } from '../Models'

export class QueueResource extends RestResource {
  constructor(url: URL, apikey: string, logger: Lincoln) {
    super(url, logger)
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
