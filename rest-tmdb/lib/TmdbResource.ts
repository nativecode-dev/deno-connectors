import { Essentials, RestResource, ResourceParams, ResourceParamType } from '../deps.ts'

import { TmdbOptions } from './TmdbOptions.ts'

export abstract class TmdbResource extends RestResource<TmdbOptions> {
  constructor(options: Essentials.DeepPartial<TmdbOptions>) {
    super(options)
    this.setHeader('Authorization', `Bearer ${options.bearer}`)
  }

  protected response(route: string, method: string, params: ResourceParams = [], body?: any): Promise<Response> {
    return super.response(route, method, [...params, { key: 'api_key', type: ResourceParamType.Query, value: this.options.apikey }], body)
  }
}
