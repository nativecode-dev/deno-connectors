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
  const opts = ObjectMerge.merge<ConnectorOptions>(DEFAULTS, options)
  return new RadarrClient({ host: opts.endpoint.host, port: opts.endpoint.port, apikey: opts.credentials?.password })
}
