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
    const connection = ObjectMerge.merge<ConnectorOptions>(DEFAULTS, options)

    const dbopts: Essentials.DeepPartial<CouchOptions> = {
      connection,
      password: connection.credentials?.password,
      username: connection.credentials?.username,
    }

    this.database = new DatabaseResource(dbopts)
  }
}
