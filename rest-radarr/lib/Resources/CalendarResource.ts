import { ResourceParamType, RestResource } from '../../deps.ts'

import { Movie } from '../Models/Movie.ts'

export class CalendarResource extends RestResource {
  constructor(url: URL, apikey: string) {
    super(url)
    this.setHeader('X-Api-Key', apikey)
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
