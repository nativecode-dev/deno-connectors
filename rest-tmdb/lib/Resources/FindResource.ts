import { ResourceParamType } from '../../deps.ts'

import { TmdbSources } from './TmdbSources.ts'
import { TmdbResource } from '../TmdbResource.ts'
import { FindResults } from '../Models/FindResults.ts'

export class FindResource extends TmdbResource {
  byId(externalId: string, source: TmdbSources = TmdbSources.imdb, language: string = 'en-US'): Promise<FindResults> {
    return this.http_get<FindResults>(
      'find/{:external_id}',
      {
        key: 'external_id',
        type: ResourceParamType.RouteParameter,
        value: externalId,
      },
      {
        key: 'external_source',
        type: ResourceParamType.Query,
        value: source,
      },
      {
        key: 'language',
        type: ResourceParamType.Query,
        value: language,
      },
    )
  }
}
