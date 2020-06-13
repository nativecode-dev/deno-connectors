import { RestResource, ResourceParamType } from '../../deps.ts'

import { ParsedEpisodeInfo } from '../Models/ParsedEpisodeInfo.ts'

export class ParsedEpisodeInfoResource extends RestResource {
  constructor(url: URL, apikey: string) {
    super(url)
    this.setHeader('X-Api-Key', apikey)
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
