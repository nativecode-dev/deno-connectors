import { BError, ConnectorOptions, CouchClient, Document, DocumentCollection, UrlBuilder } from '../deps.ts'

import { CouchCollection } from './CouchCollection.ts'

export class CouchStore implements CouchStore {
  protected readonly client: CouchClient

  constructor(options: ConnectorOptions) {
    const builder = new UrlBuilder(options).withAuthentication().withPort().toUrl()
    this.client = new CouchClient(builder)
  }

  collection<T extends Document>(name: string, doctype: string): DocumentCollection<T> {
    return new CouchCollection<T>(doctype, this.client.database<T>(name))
  }

  async create(name: string) {
    try {
      const result = await this.client.createDatabase(name)

      if (result.ok === false) {
        throw new BError(`could not create database: ${name}`)
      }
    } catch (error) {
      throw new BError(`create database failed: ${name}`, error)
    }
  }

  async delete(name: string) {
    try {
      const result = await this.client.deleteDatabase(name)

      if (result.ok === false) {
        throw new BError(`could not create database: ${name}`)
      }
    } catch (error) {
      throw new BError(`delete database failed: ${name}`, error)
    }
  }

  exists(name: string) {
    return this.client.databaseExists(name)
  }
}
