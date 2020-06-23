import { ResourceParamType } from '../../deps.ts'

import { Genres } from '../Models/Genre.ts'
import { TmdbResource } from '../TmdbResource.ts'

export class GenreResource extends TmdbResource {
  movies(language: string = 'en-US'): Promise<Genres> {
    return this.http_get('genre/movie/list', {
      key: 'language',
      type: ResourceParamType.Query,
      value: language,
    })
  }

  shows(language: string = 'en-US'): Promise<Genres> {
    return this.http_get('genre/tv/list', {
      key: 'language',
      type: ResourceParamType.Query,
      value: language,
    })
  }
}
