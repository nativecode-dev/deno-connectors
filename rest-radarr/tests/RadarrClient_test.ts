import { Essentials, ConnectorOptions, ConnectorProtocols, ObjectMerge } from '../deps.ts'
import { Env, assertNotEquals } from '../deps_test.ts'

import { RadarrConnector } from '../lib/RadarrConnector.ts'

const env = new Env({ env: Deno.env.toObject(), prefix: ['test'] })
const envobj = env.toObject()

const OPTIONS: Essentials.DeepPartial<ConnectorOptions> = {
  endpoint: {
    host: 'localhost',
    port: 7878,
    protocol: ConnectorProtocols.http,
  },
  name: 'radarr',
}

const client = RadarrConnector(ObjectMerge.merge(OPTIONS, envobj.test.radarr))

Deno.test('[rest-radarr] should get list of movies', async () => {
  const movies = await client.movie.list()
  assertNotEquals(movies.length, 0)
})
