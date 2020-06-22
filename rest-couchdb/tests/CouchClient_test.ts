import { ConnectorOptions, ConnectorProtocols, Essentials, ObjectMerge } from '../deps.ts'
import { Env, assertEquals } from '../test_deps.ts'

import { CouchClient } from '../lib/CouchClient.ts'

const env = new Env({ env: Deno.env.toObject(), prefix: ['test'] })
const envobj = env.toObject()

const DEFAULTS: Essentials.DeepPartial<ConnectorOptions> = {
  endpoint: {
    host: 'localhost',
    port: 5984,
    protocol: ConnectorProtocols.http,
  },
  name: 'couchdb',
}

const options = ObjectMerge.merge<ConnectorOptions>(DEFAULTS, envobj.test.couchdb)
const CLIENT = new CouchClient(options)

Deno.test('[rest-couchdb] should create database', async () => {
  const response = await CLIENT.database.create('test-rest-couchdb')
  assertEquals(response.ok, true)
})

Deno.test('[rest-couchdb] should list databases', async () => {
  const response = await CLIENT.database.list()
  assertEquals(response.length, 1)
})

Deno.test('[rest-couchdb] should create document', async () => {
  const response = await CLIENT.database.document('test-rest-couchdb', { test: 'value' })
  assertEquals(response.ok, true)
})

Deno.test('[rest-couchdb] should delete databases', async () => {
  const response = await CLIENT.database.delete('test-rest-couchdb')
  assertEquals(response.ok, true)
})
