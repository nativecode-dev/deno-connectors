import { ConnectorOptions, Essentials, ObjectMerge } from '../deps.ts'

import { FindResource } from './Resources/FindResource.ts'
import { AccountResource } from './Resources/AccountResource.ts'
import { GenreResource } from './Resources/GenreResource.ts'
import { MovieResource } from './Resources/MovieResource.ts'
import { SeriesResource } from './Resources/SeriesResource.ts'

const DEFAULTS: Essentials.DeepPartial<ConnectorOptions> = {
  endpoint: {
    host: 'api.themoviedb.org',
    path: '3',
    protocol: 'https',
  },
  name: 'tmdb',
}

export class TmdbClient {
  readonly account: AccountResource
  readonly find: FindResource
  readonly genre: GenreResource
  readonly movies: MovieResource
  readonly series: SeriesResource

  constructor(options: Essentials.DeepPartial<ConnectorOptions>) {
    const connection = ObjectMerge.merge<ConnectorOptions>(DEFAULTS, options)
    const opts = { bearer: connection.credentials?.password, connection: connection }
    this.account = new AccountResource(opts)
    this.find = new FindResource(opts)
    this.genre = new GenreResource(opts)
    this.movies = new MovieResource(opts)
    this.series = new SeriesResource(opts)
  }
}
