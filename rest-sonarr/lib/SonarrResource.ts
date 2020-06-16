import { RestResource } from '../deps.ts'

import { SonarrOptions } from './SonarrOptions.ts'

export abstract class SonarrResource extends RestResource<SonarrOptions> {
  constructor(url: URL, apikey: string) {
    super(url, { apikey })
    this.setHeader('X-Api-Key', apikey)
  }
}
