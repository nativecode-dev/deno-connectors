import { Essentials, ConnectorOptions, ConnectorProtocols, ObjectMerge } from '../deps.ts'
import { Env, assertEquals, assertNotEquals } from '../test_deps.ts'

import { NzbClient } from '../lib/NzbClient.ts'

const env = new Env({ env: Deno.env.toObject(), prefix: ['TEST'] })

const OPTIONS: Essentials.DeepPartial<ConnectorOptions> = {
  endpoint: {
    host: 'localhost',
    port: 80,
    protocol: ConnectorProtocols.http,
  },
  name: 'nzb',
}

const client = new NzbClient(ObjectMerge.merge(OPTIONS, env.toObject().test.nzb))

Deno.test('should get capabilities', async () => {
  const response = await client.nzb.capabilities()
  assertEquals(response.server['@attributes'].appversion, '2.23.0')
})

Deno.test('should search movies', async () => {
  const response = await client.nzb.movies('tt6723592', [])
  assertNotEquals(response.channel.item.length, 0)
})

Deno.test('should search shows', async () => {
  const response = await client.nzb.shows('24')
  assertNotEquals(response.channel.item.length, 0)
})

Deno.test('should get nzb details', async () => {
  const response = await client.nzb.shows('24', 1, 1)
  const result = response.channel.item[0]
  const details = await client.nzb.details(result.guid)
  assertNotEquals(details, undefined)
})
