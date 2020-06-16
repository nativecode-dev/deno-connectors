import { ResourceParamType } from '../../deps.ts'

import { EpisodeFile } from '../Models/EpisodeFile.ts'
import { EpisodeFileQuality } from '../Models/EpisodeFileQuality.ts'
import { SonarrResource } from '../SonarrResource.ts'

export class EpisodeFileResource extends SonarrResource {
  constructor(url: URL, apikey: string) {
    super(url, apikey)
  }

  delete(episodeFileId: number) {
    return this.http_delete('episodefile/{:id}', {
      key: 'id',
      type: ResourceParamType.RouteParameter,
      value: episodeFileId,
    })
  }

  id(episodeId: number): Promise<EpisodeFile> {
    return this.http_get<EpisodeFile>('episodefile/{:id}', {
      key: 'id',
      type: ResourceParamType.RouteParameter,
      value: episodeId,
    })
  }

  list(seriesId: number): Promise<EpisodeFile[]> {
    return this.http_get<EpisodeFile[]>('episodefile', {
      key: 'seriesId',
      type: ResourceParamType.Query,
      value: seriesId,
    })
  }

  update(quality: EpisodeFileQuality): Promise<EpisodeFile> {
    return this.http_put('episode', quality)
  }
}
