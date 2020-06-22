import { ResourceParamType } from '../../deps.ts'

import { TmdbResource } from '../TmdbResource.ts'
import { FindResults } from '../Models/FindResults.ts'

export enum TmdbSources {
  imdb = 'imdb_id',
  freebase = 'freebase_id',
  freebasem = 'freebase_mid',
  tvdb = 'tvdb_id',
  tvrage = 'tvrage_id',
  facebook = 'facebook_id',
  twitter = 'twitter_id',
  instagram = 'instagram_id',
}

export class FindResource extends TmdbResource {
  byId(externalId: string, source: TmdbSources = TmdbSources.imdb, language?: string): Promise<FindResults> {
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
