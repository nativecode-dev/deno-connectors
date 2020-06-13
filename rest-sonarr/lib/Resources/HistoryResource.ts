import { RestResource, ResourceParamType } from '../../deps.ts'

import { History } from '../Models/History.ts'
import { PagingOptions } from './PagingOptions.ts'

export class HistoryResource extends RestResource {
  constructor(url: URL, apikey: string) {
    super(url)
    this.setHeader('X-Api-Key', apikey)
  }

  get(sortKey: string = 'date', options: PagingOptions = {}): Promise<History> {
    return this.http_get(
      'history',
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
