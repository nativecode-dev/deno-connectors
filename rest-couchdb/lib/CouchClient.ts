import { ConnectorOptions, ConnectorProtocols, Essentials, ObjectMerge } from '../deps.ts'

import { CouchOptions } from './CouchOptions.ts'
import { DatabaseResource } from './Resources/DatabaseResource.ts'

const DEFAULTS: Essentials.DeepPartial<ConnectorOptions> = {
  endpoint: {
    host: 'localhost',
    port: 5984,
    protocol: ConnectorProtocols.http,
  },
  name: 'couchdb',
}

export class CouchClient {
  public readonly database: DatabaseResource

  constructor(options: Essentials.DeepPartial<ConnectorOptions>) {
    const opts = ObjectMerge.merge<ConnectorOptions>(DEFAULTS, options)
    const dbopts: Essentials.DeepPartial<CouchOptions> = {
      password: opts.credentials?.password,
      username: opts.credentials?.username,
      connection: opts,
    }
    this.database = new DatabaseResource(dbopts)
  }
}
