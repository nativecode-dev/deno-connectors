import { Essentials, RestResource } from '../deps.ts'

import { TmdbOptions } from './TmdbOptions.ts'

export abstract class TmdbResource extends RestResource<TmdbOptions> {
  constructor(options: Essentials.DeepPartial<TmdbOptions>) {
    super(options)
    this.setHeader('Authorization', `Bearer ${options.bearer}`)
  }
}
