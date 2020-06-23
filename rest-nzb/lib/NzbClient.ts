import { ConnectorOptions, ConnectorProtocols, Essentials, ObjectMerge } from '../deps.ts'

import { NzbOptions } from './NzbOptions.ts'
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
    const connection = ObjectMerge.merge<ConnectorOptions>(DEFAULTS, options)
    const resopts: Essentials.DeepPartial<NzbOptions> = { apikey: connection.credentials?.password, connection }
    this.nzb = new NzbResource(resopts)
  }
}
