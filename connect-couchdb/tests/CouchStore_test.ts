import { ConnectorOptions, ConnectorProtocols, Document, Env, Essentials, ObjectMerge } from '../deps.ts'
import { assertEquals, assertNotEquals } from '../deps_test.ts'

import { CouchStore } from '../mod.ts'

interface TestDocument extends Document {
  name: string
  value: any
}

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

const document: TestDocument = { name: 'method', value: { GET: 'get' } }
const options = ObjectMerge.merge<ConnectorOptions>(DEFAULTS, envobj.test.couchdb)
const CLIENT = new CouchStore(options)

Deno.test('[connect-couchdb] should create database', async () => {
  await CLIENT.create('test-connect-couchdb')
})

Deno.test('[connect-couchdb] should get empty collection', async () => {
  const collection = CLIENT.collection<TestDocument>('test-connect-couchdb', 'test-document')
  const result = await collection.all()
  assertEquals(result, [])
})

Deno.test('[connect-couchdb] should add document', async () => {
  const collection = CLIENT.collection<TestDocument>('test-connect-couchdb', 'test-document')
  const docid = await collection.update(document, (doc) => doc.name!)
  const result = await collection.get(docid.name)
  assertNotEquals(result, null)
})

Deno.test('[connect-couchdb] should get non-empty collection', async () => {
  const collection = CLIENT.collection<TestDocument>('test-connect-couchdb', 'test-document')
  const result = await collection.all()
  assertEquals(result.length, 1)
})

Deno.test('[connect-couchdb] should update document', async () => {
  const collection = CLIENT.collection<TestDocument>('test-connect-couchdb', 'test-document')
  const original = await collection.get(document.name)
  const docid = await collection.update({ ...original, value: 'changed' }, (doc) => doc.name!)
  const result = await collection.get(docid.name)
  assertEquals(result?.value, 'changed')
})

Deno.test('[connect-couchdb] should delete document', async () => {
  const collection = CLIENT.collection<TestDocument>('test-connect-couchdb', 'test-document')
  const doc = await collection.get(document.name)

  if (doc) {
    await collection.delete(doc._id!, doc._rev)
  }

  const value = await collection.get(document.name)
  assertEquals(value, null)
})

Deno.test('[connect-couchdb] should delete database', async () => {
  await CLIENT.delete('test-connect-couchdb')
})
