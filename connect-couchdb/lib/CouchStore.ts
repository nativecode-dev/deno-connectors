import { ConnectorOptions, CouchClient, Document, DocumentCollection, UrlBuilder } from '../deps.ts'

import { CouchCollection } from './CouchCollection.ts'

export class CouchStore implements CouchStore {
  protected readonly client: CouchClient

  constructor(options: ConnectorOptions) {
    const builder = new UrlBuilder(options).withAuthentication().withPort().toUrl()
    this.client = new CouchClient(builder)
  }

  collection<T extends Document>(name: string, doctype: string): DocumentCollection<T> {
    const collection = this.client.database<T>(name)
    return new CouchCollection<T>(doctype, collection)
  }

  async create(name: string) {
    const result = await this.client.createDatabase(name)

    if (result.ok === false) {
      throw new Error(`could not create database: ${name}`)
    }
  }

  async delete(name: string) {
    const result = await this.client.deleteDatabase(name)

    if (result.ok === false) {
      throw new Error(`could not create database: ${name}`)
    }
  }

  exists(name: string) {
    return this.client.databaseExists(name)
  }
}
