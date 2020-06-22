import { Essentials, RestResource } from '../deps.ts'

import { CouchOptions } from './CouchOptions.ts'

export abstract class CouchResource extends RestResource<CouchOptions> {
  constructor(options: Essentials.DeepPartial<CouchOptions> = {}) {
    super(options)

    const authorization = btoa(`${options.username}:${options.password}`)
    this.setHeader('Authorization', `Basic ${authorization}`)
  }
}
