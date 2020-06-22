import { ConnectorOptions, Essentials, ObjectMerge, UrlBuilder } from '../deps.ts'

import { FindResource } from './Resources/FindResource.ts'

const DEFAULTS: Essentials.DeepPartial<ConnectorOptions> = {
  endpoint: {
    host: 'api.themoviedb.org',
    path: '3',
  },
  name: 'tmdb',
}

export class TmdbClient {
  readonly find: FindResource

  constructor(options: Essentials.DeepPartial<ConnectorOptions>) {
    const opts = ObjectMerge.merge<ConnectorOptions>(DEFAULTS, options)
    this.find = new FindResource({ bearer: opts.credentials?.password, connection: opts })
  }
}
