import { ResourceParamType } from '../../deps.ts'

import { Episode } from '../Models/Episode.ts'
import { SonarrResource } from '../SonarrResource.ts'
import { SonarrOptions } from '../SonarrOptions.ts'

export class CalendarResource extends SonarrResource {
  constructor(options: SonarrOptions) {
    super(options)
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
