import { RestResource, ResourceParamType } from '../../deps.ts'

import { Paging } from '../Models/Paging.ts'
import { WantedMissing } from '../Models/WantedMissing.ts'
import { PagingOptions } from './PagingOptions.ts'

export class WantedMissingResource extends RestResource {
  constructor(url: URL, apikey: string) {
    super(url)
    this.setHeader('X-Api-Key', apikey)
  }

  list(sortKey: string = 'airDateUtc', options: PagingOptions = {}): Promise<Paging<WantedMissing>> {
    return this.http_get<Paging<WantedMissing>>(
      'diskspace',
      {
        key: 'sortKey',
        type: ResourceParamType.Query,
        value: sortKey,
      },
      {
        key: 'page',
        type: ResourceParamType.Query,
        value: options.page,
      },
      {
        key: 'pageSize',
        type: ResourceParamType.Query,
        value: options.pageSize,
      },
      {
        key: 'sortDir',
        type: ResourceParamType.Query,
        value: options.sortDir,
      },
      {
        key: 'episodeId',
        type: ResourceParamType.Query,
        value: options.episodeId,
      },
    )
  }
}
