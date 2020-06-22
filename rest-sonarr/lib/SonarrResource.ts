import { RestResource } from '../deps.ts'

import { SonarrOptions } from './SonarrOptions.ts'

export abstract class SonarrResource extends RestResource<SonarrOptions> {
  constructor(apikey: string) {
    super({ apikey })
    this.setHeader('X-Api-Key', apikey)
  }
}
