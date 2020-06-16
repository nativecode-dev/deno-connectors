import { ResourceParamType } from '../../deps.ts'

import { Series } from '../Models/Series.ts'
import { SonarrResource } from '../SonarrResource.ts'

export class SeriesResource extends SonarrResource {
  constructor(url: URL, apikey: string) {
    super(url, apikey)
  }

  id(id: number): Promise<Series> {
    return this.http_get<Series>('series/{:id}', {
      key: 'id',
      type: ResourceParamType.RouteParameter,
      value: id,
    })
  }

  list(): Promise<Series[]> {
    return this.http_get<Series[]>('series')
  }

  update(series: Series): Promise<Series> {
    return this.http_put('series', series, {
      key: 'id',
      type: ResourceParamType.RouteParameter,
      value: series.id,
    })
  }
}
