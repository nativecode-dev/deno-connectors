import { RestResource } from '../deps.ts'

import { SonarrOptions } from './SonarrOptions.ts'

export abstract class SonarrResource extends RestResource<SonarrOptions> {
  constructor(options: SonarrOptions) {
    super(options)

    if (options.connection.credentials?.password) {
      this.setHeader('X-Api-Key', options.connection.credentials?.password)
    }
  }
}
