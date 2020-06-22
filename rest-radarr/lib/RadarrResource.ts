import { RestResource } from '../deps.ts'

import { RadarrOptions } from './RadarrOptions.ts'

export abstract class RadarrResource extends RestResource<RadarrOptions> {
  constructor(apikey: string) {
    super({ apikey })
    this.setHeader('X-Api-Key', apikey)
  }
}
