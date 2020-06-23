import { RestResource } from '../deps.ts'

import { RadarrOptions } from './RadarrOptions.ts'

export abstract class RadarrResource extends RestResource<RadarrOptions> {
  constructor(options: RadarrOptions) {
    super(options)

    if (options.connection.credentials?.password) {
      this.setHeader('X-Api-Key', options.connection.credentials?.password)
    }
  }
}
