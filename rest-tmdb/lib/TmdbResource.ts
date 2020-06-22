import { Essentials, RestResource, ResourceParams, ResourceParamType } from '../deps.ts'

import { TmdbOptions } from './TmdbOptions.ts'

export abstract class TmdbResource extends RestResource<TmdbOptions> {
  constructor(options: Essentials.DeepPartial<TmdbOptions>) {
    super(options)
    this.setHeader('Authorization', `Bearer ${options.bearer}`)
  }

  protected response(route: string, method: string, params: ResourceParams = [], body?: any): Promise<Response> {
    const ps: ResourceParams = [...params, { key: 'apikey', type: ResourceParamType.Query, value: this.options.apikey }]
    console.log(this.getRoute(route, ps).toString())
    return super.response(route, method, ps, body)
  }
}
