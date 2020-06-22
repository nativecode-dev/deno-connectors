import { ResourceParamType } from '../../deps.ts'

import { Movie } from '../Models/Movie.ts'
import { RadarrResource } from '../RadarrResource.ts'

export class CalendarResource extends RadarrResource {
  constructor(url: URL, apikey: string) {
    super(apikey)
  }

  list(start?: string, end?: string): Promise<Movie[]> {
    return this.http_get<Movie[]>(
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
