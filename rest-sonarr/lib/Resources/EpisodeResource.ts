import { ResourceParamType } from '../../deps.ts'

import { Episode } from '../Models/Episode.ts'
import { SonarrResource } from '../SonarrResource.ts'

export class EpisodeResource extends SonarrResource {
  constructor(url: URL, apikey: string) {
    super(url, apikey)
  }

  id(episodeId: number): Promise<Episode> {
    return this.http_get<Episode>('episode/{:id}', {
      key: 'id',
      type: ResourceParamType.RouteParameter,
      value: episodeId,
    })
  }

  list(seriesId: number): Promise<Episode[]> {
    return this.http_get<Episode[]>('episode', {
      key: 'seriesId',
      type: ResourceParamType.Query,
      value: seriesId,
    })
  }

  update(episode: Episode): Promise<Episode> {
    return this.http_put('episode', episode)
  }
}
