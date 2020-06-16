import { ConnectorOptions, ConnectorProtocols, Essentials, ObjectMerge } from '../deps.ts'
import { Env, assertEquals } from '../test_deps.ts'

import { CouchClient } from '../lib/CouchClient.ts'

const env = new Env({ env: Deno.env.toObject(), prefix: ['TEST'] })

const OPTIONS: Essentials.DeepPartial<ConnectorOptions> = {
  credentials: {
    password: '',
    username: '',
  },
  endpoint: {
    host: 'localhost',
    port: 5984,
    protocol: ConnectorProtocols.http,
  },
  name: 'couchdb',
}

const CLIENT = new CouchClient(ObjectMerge.merge(OPTIONS, env.toObject().test.couchdb))

Deno.test('should create database', async () => {
  const response = await CLIENT.database.create('plexify')
  assertEquals(response.ok, true)
})

Deno.test('should list databases', async () => {
  const response = await CLIENT.database.list()
  assertEquals(response.length, 1)
})

Deno.test('should create document', async () => {
  const response = await CLIENT.database.document('plexify', { test: 'value' })
  assertEquals(response.ok, true)
})

Deno.test('should delete databases', async () => {
  const response = await CLIENT.database.delete('plexify')
  assertEquals(response.ok, true)
})
