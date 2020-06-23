import { ResourceParamType } from '../../deps.ts'

import { History } from '../Models/History.ts'
import { HistoryOptions } from './HistoryOptions.ts'
import { RadarrResource } from '../RadarrResource.ts'
import { RadarrOptions } from '../RadarrOptions.ts'

export class HistoryResource extends RadarrResource {
  constructor(options: RadarrOptions) {
    super(options)
  }

  page(page: number = 1, options?: HistoryOptions): Promise<History> {
    const merged: HistoryOptions = { ...{ pageSize: 0 }, ...options }

    return this.http_get<History>(
      'history',
      {
        key: 'page',
        type: ResourceParamType.Query,
        value: page,
      },
      {
        key: 'pageSize',
        type: ResourceParamType.Query,
        value: merged.pageSize,
      },
      {
        key: 'sortDir',
        type: ResourceParamType.Query,
        value: merged.sortDir,
      },
      {
        key: 'sortKey',
        type: ResourceParamType.Query,
        value: merged.sortKey,
      },
    )
  }
}
