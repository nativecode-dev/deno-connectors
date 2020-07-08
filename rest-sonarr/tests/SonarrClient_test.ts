import { Essentials, ConnectorOptions, ConnectorProtocols, ObjectMerge } from '../deps.ts'
import { Env, assertNotEquals } from '../deps_test.ts'

import { SonarrConnector } from '../lib/SonarrConnector.ts'

const env = new Env({ env: Deno.env.toObject(), prefix: ['test'] })
const envobj = env.toObject()

const OPTIONS: Essentials.DeepPartial<ConnectorOptions> = {
  endpoint: {
    host: 'localhost',
    path: 'api',
    port: 8989,
    protocol: ConnectorProtocols.http,
  },
  name: 'sonarr',
}

const client = SonarrConnector(ObjectMerge.merge(OPTIONS, envobj.test.sonarr))

Deno.test('[rest-sonarr] should get list of shows', async () => {
  const series = await client.series.list()
  assertNotEquals(series.length, 0)
})
