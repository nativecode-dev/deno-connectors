import { ResourceParamType } from '../../deps.ts'

import { ParsedEpisodeInfo } from '../Models/ParsedEpisodeInfo.ts'
import { SonarrResource } from '../SonarrResource.ts'
import { SonarrOptions } from '../SonarrOptions.ts'

export class ParsedEpisodeInfoResource extends SonarrResource {
  constructor(options: SonarrOptions) {
    super(options)
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
