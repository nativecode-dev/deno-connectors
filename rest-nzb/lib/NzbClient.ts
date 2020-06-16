import { ConnectorOptions, ConnectorProtocols, Essentials, ObjectMerge } from '../deps.ts'

import { NzbResource } from './NzbResource.ts'

const DEFAULTS: Essentials.DeepPartial<ConnectorOptions> = {
  endpoint: {
    host: 'localhost',
    port: 80,
    protocol: ConnectorProtocols.http,
  },
  name: 'couchdb',
}

export class NzbClient {
  public readonly nzb: NzbResource

  constructor(options: Essentials.DeepPartial<ConnectorOptions>) {
    const opts = ObjectMerge.merge<ConnectorOptions>(DEFAULTS, options)
    const url = new URL(`${opts.endpoint.protocol}://${opts.endpoint.host}:${opts.endpoint.port}`)
    const resopts = { apikey: opts.credentials?.password }
    this.nzb = new NzbResource(url, resopts)
  }
}
