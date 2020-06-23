import { ResourceParamType } from '../../deps.ts'

import { Credits } from '../Models/Credit.ts'
import { Images } from '../Models/Image.ts'
import { TmdbResource } from '../TmdbResource.ts'

import { Movie } from '../Models/Movies/Movie.ts'
import { ExternalMovieSources } from '../Models/Movies/ExternalMovieSources.ts'
import { AlternativeMovieTitles } from '../Models/Movies/AlternativeMovieTitle.ts'

export class MovieResource extends TmdbResource {
  alternateTitles(id: number, country?: string) {
    return this.http_get<AlternativeMovieTitles>(
      'movie/{:movie_id}/alternative_titles',
      {
        key: 'movie_id',
        type: ResourceParamType.RouteParameter,
        value: id,
      },
      {
        key: 'country',
        type: ResourceParamType.Query,
        value: country,
      },
    )
  }

  credits(id: number) {
    return this.http_get<Credits>('movie/{:movie_id}/credits', {
      key: 'movie_id',
      type: ResourceParamType.RouteParameter,
      value: id,
    })
  }

  details(id: number) {
    return this.http_get<Movie>('movie/{:movie_id}', {
      key: 'movie_id',
      type: ResourceParamType.RouteParameter,
      value: id,
    })
  }

  externals(id: number) {
    return this.http_get<ExternalMovieSources>('movie/{:movie_id}/external_ids', {
      key: 'movie_id',
      type: ResourceParamType.RouteParameter,
      value: id,
    })
  }

  images(id: number) {
    return this.http_get<Images>('movie/{:movie_id}/images', {
      key: 'movie_id',
      type: ResourceParamType.RouteParameter,
      value: id,
    })
  }
}
