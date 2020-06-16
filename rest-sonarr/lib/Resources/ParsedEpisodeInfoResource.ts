import { ResourceParamType } from '../../deps.ts'

import { ParsedEpisodeInfo } from '../Models/ParsedEpisodeInfo.ts'
import { SonarrResource } from '../SonarrResource.ts'

export class ParsedEpisodeInfoResource extends SonarrResource {
  constructor(url: URL, apikey: string) {
    super(url, apikey)
  }

  parse(path?: string, title?: string): Promise<ParsedEpisodeInfo> {
    return this.http_get<ParsedEpisodeInfo>(
      'parsed',
      {
        key: 'path',
        type: ResourceParamType.Query,
        value: path,
      },
      {
        key: 'title',
        type: ResourceParamType.Query,
        value: title,
      },
    )
  }
}
