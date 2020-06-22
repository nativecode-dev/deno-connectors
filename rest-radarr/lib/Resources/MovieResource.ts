import { ResourceParamType } from '../../deps.ts'

import { Movie } from '../Models/Movie.ts'
import { MovieInfo } from '../Models/MovieInfo.ts'
import { RadarrResource } from '../RadarrResource.ts'

export class MovieResource extends RadarrResource {
  constructor(url: URL, apikey: string) {
    super(apikey)
  }

  add(movie: MovieInfo): Promise<Movie> {
    return this.http_post('movie', movie)
  }

  id(id: number): Promise<Movie> {
    return this.http_get('movie/{:id}', {
      key: 'id',
      type: ResourceParamType.RouteParameter,
      value: id,
    })
  }

  imdb(imdbId: string): Promise<Movie> {
    return this.http_get('movie/lookup/imdb', {
      key: 'imdbId',
      type: ResourceParamType.Query,
      value: imdbId,
    })
  }

  list(): Promise<Movie[]> {
    return this.http_get('movie')
  }

  lookup(term: string): Promise<Movie[]> {
    return this.http_get('movie/lookup', {
      key: 'term',
      type: ResourceParamType.Query,
      value: term,
    })
  }

  remove(id: number, deleteFiles: boolean = false): Promise<void> {
    return this.http_delete(
      'movie/{:id}',
      {
        key: 'deleteFiles',
        type: ResourceParamType.Query,
        value: deleteFiles,
      },
      {
        key: 'id',
        type: ResourceParamType.RouteParameter,
        value: id,
      },
    )
  }

  tmdb(tmdbId: number): Promise<Movie> {
    return this.http_get('movie/lookup/tmdb', {
      key: 'tmdbId',
      type: ResourceParamType.Query,
      value: tmdbId,
    })
  }

  update(movie: Movie): Promise<Movie> {
    return this.http_put('movie/{:id}', movie, {
      key: 'id',
      type: ResourceParamType.RouteParameter,
      value: movie.id,
    })
  }
}
