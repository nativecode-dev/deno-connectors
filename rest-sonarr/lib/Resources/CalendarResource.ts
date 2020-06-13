import { RestResource, ResourceParamType } from '../../deps.ts'

import { Episode } from '../Models/Episode.ts'

export class CalendarResource extends RestResource {
  constructor(url: URL, apikey: string) {
    super(url)
    this.setHeader('X-Api-Key', apikey)
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
