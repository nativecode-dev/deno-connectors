import { ConnectorOptions, Essentials, ObjectMerge, UrlBuilder } from '../deps.ts'

import { FindResource } from './Resources/FindResource.ts'

export class TmdbClient {
  readonly find: FindResource

  constructor(coptions: Essentials.DeepPartial<ConnectorOptions>) {
    const options = ObjectMerge.merge<ConnectorOptions>(coptions)
    const url = new UrlBuilder(options).toURL()
    this.find = new FindResource(url, { bearer: options.credentials?.password })
  }
}
