import { Essentials, RestResource } from '../deps.ts'

import { CouchOptions } from './CouchOptions.ts'

export abstract class CouchResource extends RestResource {
  constructor(url: URL, options: Essentials.DeepPartial<CouchOptions> = {}) {
    super(url, options)

    const authorization = btoa(`${options.username}:${options.password}`)
    this.setHeader('Authorization', `Basic ${authorization}`)
  }
}
