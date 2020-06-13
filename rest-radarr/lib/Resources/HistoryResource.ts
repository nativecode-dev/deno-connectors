import { ResourceParamType, RestResource } from '../../deps.ts'

import { History } from '../Models/History.ts'
import { HistoryOptions } from './HistoryOptions.ts'

export class HistoryResource extends RestResource {
  constructor(url: URL, apikey: string) {
    super(url)
    this.setHeader('X-Api-Key', apikey)
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
