import { ResourceParamType } from '../../deps.ts'

import { Images } from '../Models/Image.ts'
import { Credits } from '../Models/Credit.ts'
import { TmdbResource } from '../TmdbResource.ts'

import { Series } from '../Models/Series/Series.ts'
import { SeasonResponse } from '../Models/Series/SeasonResponse.ts'
import { EpisodeResponse } from '../Models/Series/EpisodeResponse.ts'
import { ExternalSeriesSources } from '../Models/Series/ExternalSeriesSources.ts'
import { AlternativeSeriesTitles } from '../Models/Series/AlternativeSeriesTitle.ts'

export class SeriesResource extends TmdbResource {
  alternateTitles(id: number, country?: string) {
    return this.http_get<AlternativeSeriesTitles>(
      'tv/{:tv_id}/alternative_titles',
      {
        key: 'tv_id',
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
    return this.http_get<Credits>('tv/{:tv_id}/credits', {
      key: 'tv_id',
      type: ResourceParamType.RouteParameter,
      value: id,
    })
  }

  details(id: number) {
    return this.http_get<Series>('tv/{:tv_id}', {
      key: 'tv_id',
      type: ResourceParamType.RouteParameter,
      value: id,
    })
  }

  episode(id: number, season: number, episode: number) {
    return this.http_get<EpisodeResponse>(
      'tv/{:tv_id}/season/{:season_number}/episode/{:episode_number}',
      {
        key: 'tv_id',
        type: ResourceParamType.RouteParameter,
        value: id,
      },
      {
        key: 'season_number',
        type: ResourceParamType.RouteParameter,
        value: season,
      },
      {
        key: 'episode_number',
        type: ResourceParamType.RouteParameter,
        value: episode,
      },
    )
  }

  externals(id: number) {
    return this.http_get<ExternalSeriesSources>('tv/{:tv_id}/external_ids', {
      key: 'tv_id',
      type: ResourceParamType.RouteParameter,
      value: id,
    })
  }

  images(id: number) {
    return this.http_get<Images>('tv/{:tv_id}/images', {
      key: 'tv_id',
      type: ResourceParamType.RouteParameter,
      value: id,
    })
  }

  season(id: number, season: number) {
    return this.http_get<SeasonResponse>(
      'tv/{:tv_id}/season/{:season_number}',
      {
        key: 'tv_id',
        type: ResourceParamType.RouteParameter,
        value: id,
      },
      {
        key: 'season_number',
        type: ResourceParamType.RouteParameter,
        value: season,
      },
    )
  }
}
