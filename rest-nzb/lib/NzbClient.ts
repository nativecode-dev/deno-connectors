import { ConnectorOptions, ConnectorProtocols, Essentials, ObjectMerge, UrlBuilder } from '../deps.ts'

import { NzbResource } from './NzbResource.ts'

const DEFAULTS: Essentials.DeepPartial<ConnectorOptions> = {
  endpoint: {
    host: 'localhost',
    path: 'api',
    port: 80,
    protocol: ConnectorProtocols.http,
  },
  name: 'couchdb',
}

export class NzbClient {
  public readonly nzb: NzbResource

  constructor(options: Essentials.DeepPartial<ConnectorOptions>) {
    const opts = ObjectMerge.merge<ConnectorOptions>(DEFAULTS, options)
    const url = new UrlBuilder(opts).toURL()
    const resopts = { apikey: opts.credentials?.password }
    this.nzb = new NzbResource(url, resopts)
  }
}
