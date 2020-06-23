import { ResourceParamType } from '../../deps.ts'

import { History } from '../Models/History.ts'
import { PagingOptions } from './PagingOptions.ts'
import { SonarrResource } from '../SonarrResource.ts'
import { SonarrOptions } from '../SonarrOptions.ts'

export class HistoryResource extends SonarrResource {
  constructor(options: SonarrOptions) {
    super(options)
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
