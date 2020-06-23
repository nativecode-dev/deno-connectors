import { ConnectorOptions, ConnectorProtocols, Essentials, ObjectMerge } from '../deps.ts'

import { RadarrClient } from './RadarrClient.ts'

const DEFAULTS: Essentials.DeepPartial<ConnectorOptions> = {
  endpoint: {
    host: 'localhost',
    port: 7878,
    protocol: ConnectorProtocols.http,
  },
}

export function RadarrConnector(options: Essentials.DeepPartial<ConnectorOptions>) {
  const connection = ObjectMerge.merge<ConnectorOptions>(DEFAULTS, options)
  return new RadarrClient({ connection })
}
