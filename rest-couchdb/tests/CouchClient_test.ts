import { assertEquals } from '../test_deps.ts'

import { CouchClient } from '../lib/CouchClient.ts'

const CREDENTIALS = {
  username: 'admin',
  password: '2bpi9AN0o1Q5ZcLs',
}

const ENDPOINT = new URL('http://couchdb.in.nativecode.com')

const CLIENT = new CouchClient(ENDPOINT, CREDENTIALS)

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
