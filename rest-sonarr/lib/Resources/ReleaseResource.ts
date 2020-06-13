import { RestResource, ResourceParamType } from '../../deps.ts'

import { Release } from '../Models/Release.ts'
import { ReleasePush } from '../Models/ReleasePush.ts'

export class ReleaseResource extends RestResource {
  constructor(url: URL, apikey: string) {
    super(url)
    this.setHeader('X-Api-Key', apikey)
  }

  download(guid: string, indexerId: string): Promise<Release[]> {
    return this.http_post('release', [
      {
        key: 'guid',
        type: ResourceParamType.Query,
        value: guid,
      },
      {
        key: 'indexerId',
        type: ResourceParamType.Query,
        value: indexerId,
      },
    ])
  }

  get(episodeId: number): Promise<Release[]> {
    return this.http_get<Release[]>('diskspace', {
      key: 'episodeId',
      type: ResourceParamType.Query,
      value: episodeId,
    })
  }

  push(push: ReleasePush) {
    return this.http_post('release/push', push)
  }
}
