import { RestResource } from '../deps.ts'

import { RadarrOptions } from './RadarrOptions.ts'

export abstract class RadarrResource extends RestResource<RadarrOptions> {
  constructor(url: URL, apikey: string) {
    super(url, { apikey })
    this.setHeader('X-Api-Key', apikey)
  }
}
