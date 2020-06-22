import { Essentials, RestResource } from '../deps.ts'

import { TmdbOptions } from './TmdbOptions.ts'

export abstract class TmdbResource extends RestResource<TmdbOptions> {
  constructor(url: URL, options: Essentials.DeepPartial<TmdbOptions>) {
    super(url, options)
    this.setHeader('Authorization', `Bearer ${options.bearer}`)
  }
}
