import { ResourceParamType } from '../../deps.ts'

import { Episode } from '../Models/Episode.ts'
import { SonarrResource } from '../SonarrResource.ts'

export class CalendarResource extends SonarrResource {
  constructor(url: URL, apikey: string) {
    super(apikey)
  }

  list(start?: string, end?: string): Promise<Episode[]> {
    return this.http_get<Episode[]>(
      'calendar',
      {
        key: 'end',
        type: ResourceParamType.Query,
        value: end,
      },
      {
        key: 'start',
        type: ResourceParamType.Query,
        value: start,
      },
    )
  }
}
