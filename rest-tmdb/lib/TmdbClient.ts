import { ConnectorOptions, Essentials, ObjectMerge } from '../deps.ts'

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
    const connection = ObjectMerge.merge<ConnectorOptions>(DEFAULTS, options)
    this.find = new FindResource({ bearer: connection.credentials?.password, connection: connection })
  }
}
