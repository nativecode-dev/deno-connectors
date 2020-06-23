import { Essentials, ConnectorOptions, ConnectorProtocols, ObjectMerge } from '../deps.ts'
import { Env, assertEquals, assertNotEquals } from '../deps_test.ts'

import { NzbClient } from '../lib/NzbClient.ts'

const env = new Env({ env: Deno.env.toObject(), prefix: ['TEST'] })
const envobj = env.toObject()

const OPTIONS: Essentials.DeepPartial<ConnectorOptions> = {
  endpoint: {
    host: 'localhost',
    port: 80,
    protocol: ConnectorProtocols.http,
  },
  name: 'nzb',
}

const client = new NzbClient(ObjectMerge.merge<ConnectorOptions>(OPTIONS, envobj.test.nzb))

Deno.test('[rest-nzb] should get capabilities', async () => {
  const response = await client.nzb.capabilities()
  assertEquals(response.server['@attributes'].appversion, '2.24.0')
})

Deno.test('[rest-nzb] should search movies', async () => {
  const response = await client.nzb.movies('tt6723592', [])
  assertNotEquals(response.channel.item.length, 0)
})

Deno.test('[rest-nzb] should search shows', async () => {
  const response = await client.nzb.shows('24')
  assertNotEquals(response.channel.item.length, 0)
})

Deno.test('[rest-nzb] should get nzb details', async () => {
  const response = await client.nzb.shows('24', 1, 1)
  const result = response.channel.item[0]
  const details = await client.nzb.details(result.guid)
  assertNotEquals(details, undefined)
})
