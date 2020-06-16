import { ConnectorOptions, ConnectorProtocols, Essentials, ObjectMerge } from '../deps.ts'

import { SonarrClient } from './SonarrClient.ts'

const DEFAULTS: Essentials.DeepPartial<ConnectorOptions> = {
  endpoint: {
    host: 'localhost',
    port: 8989,
    protocol: ConnectorProtocols.http,
  },
}

export function SonarrConnector(options: Essentials.DeepPartial<ConnectorOptions>) {
  const opts = ObjectMerge.merge<ConnectorOptions>(DEFAULTS, options)
  return new SonarrClient({ host: opts.endpoint.host, port: opts.endpoint.port, apikey: opts.credentials?.password })
}
