import { assertEquals } from '../test_deps.ts'

import { CouchClient } from '../lib/CouchClient.ts'

const CREDENTIALS = {
  username: 'admin',
  password: '2bpi9AN0o1Q5ZcLs',
}

const ENDPOINT = new URL('http://couchdb.in.nativecode.com')

Deno.test('should connect to remote server', async () => {
  const client = new CouchClient(ENDPOINT, CREDENTIALS)
  const info = await client.database.info('plexify')
  assertEquals(info.db_name, 'plexify')
})

Deno.test('should list all databases', async () => {
  const client = new CouchClient(ENDPOINT, CREDENTIALS)
  const dbs = await client.database.list()
  assertEquals(typeof dbs, 'array')
})
