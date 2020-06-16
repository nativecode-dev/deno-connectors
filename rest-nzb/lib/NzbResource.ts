import { Essentials, Resource, ResourceParam, ResourceParamType } from '../deps.ts'

import { NzbOptions } from './NzbOptions.ts'
import { SearchResult } from '../lib/Models/SearchResult.ts'

export class NzbResource extends Resource<NzbOptions> {
  constructor(url: URL, options: Essentials.DeepPartial<NzbOptions> = {}) {
    super(url, options)
  }

  capabilities() {
    return this.rpc('caps')
  }

  details(id: string) {
    return this.rpc('details', { key: 'id', type: ResourceParamType.Query, value: id })
  }

  download(id: string) {
    return this.rpc('get', { key: 'id', type: ResourceParamType.Query, value: id })
  }

  movies(imdb: string, categories: string[] = [], extended: boolean = false): Promise<SearchResult> {
    return this.rpc(
      'movie',
      {
        key: 'imdb',
        type: ResourceParamType.Query,
        value: imdb,
      },
      {
        key: 'cat',
        type: ResourceParamType.Query,
        value: categories.join(),
      },
      {
        key: 'extended',
        type: ResourceParamType.Query,
        value: extended,
      },
    )
  }

  search(query: string): Promise<SearchResult> {
    return this.rpc('search', {
      key: 'q',
      type: ResourceParamType.Query,
      value: query,
    })
  }

  shows(name: string, season?: number, episode?: number, categories: string[] = [], extended: boolean = false): Promise<SearchResult> {
    return this.rpc(
      'tvsearch',
      {
        key: 'q',
        type: ResourceParamType.Query,
        value: name,
      },
      {
        key: 'cat',
        type: ResourceParamType.Query,
        value: categories.join(),
      },
      {
        key: 'season',
        type: ResourceParamType.Query,
        value: season,
      },
      {
        key: 'episode',
        type: ResourceParamType.Query,
        value: episode,
      },
      {
        key: 'extended',
        type: ResourceParamType.Query,
        value: extended,
      },
    )
  }

  protected async rpc(method: string, ...params: ResourceParam[]) {
    const response = await this.response(`${this.url}api`, 'GET', [
      ...params,
      {
        key: 'apikey',
        type: ResourceParamType.Query,
        value: this.options.apikey,
      },
      {
        key: 'o',
        type: ResourceParamType.Query,
        value: 'json',
      },
      {
        key: 't',
        type: ResourceParamType.Query,
        value: method,
      },
    ])

    if (response.ok === false) {
      throw new Error(response.statusText)
    }

    const type = response.headers.get('Content-Type')

    if (type?.includes('json')) {
      return response.json()
    }

    return response.text()
  }
}
