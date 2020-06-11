import { CouchClient } from './CouchClient.ts'

Deno.test('should connect to remote server', async () => {
  const client = new CouchClient(new URL('http://admin:2bpi9AN0o1Q5ZcLs@couchdb.in.nativecode.com'))
  const info = await client.database.info('plexify')
  console.log(info)
})
