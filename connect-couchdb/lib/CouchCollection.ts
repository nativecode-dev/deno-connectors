import {
  BError,
  Document,
  DocumentCollection,
  DocumentKeySelector,
  DocumentFindOptions,
  DocumentSelector,
  CouchDatabase,
  Essentials,
  ObjectMerge,
} from '../deps.ts'

export class CouchCollection<T extends Document> implements DocumentCollection<T> {
  constructor(private readonly doctype: string, private readonly collection: CouchDatabase<T>) {
    this.collection = collection
  }

  async all(): Promise<T[]> {
    try {
      const selector = { doctype: this.doctype }
      const options = { limit: Number.MAX_SAFE_INTEGER, skip: 0 }
      return (await this.collection.find<T>(selector, options)).docs
    } catch (error) {
      throw new BError('all', error)
    }
  }

  async delete(id: string, rev: string): Promise<void> {
    try {
      const response = await this.collection.delete(id, rev)

      if (response.ok === false) {
        throw new BError(`could not delete document with id: ${id}`)
      }
    } catch (error) {
      throw new BError('delete', error)
    }
  }

  async find(selector: DocumentSelector, options: DocumentFindOptions = { skip: 0, take: 20 }): Promise<T[]> {
    try {
      return (await this.collection.find<T>(selector, options)).docs
    } catch (error) {
      throw new BError('find', error)
    }
  }

  async get(id: string): Promise<T | null> {
    try {
      const document = await this.collection.get(id)
      return document as T
    } catch {
      return null
    }
  }

  async update(document: Essentials.DeepPartial<T>, dockey: DocumentKeySelector<T>): Promise<T> {
    try {
      const id = dockey(ObjectMerge.merge<T>(document))
      const original = (await this.get(id)) as T

      if (original) {
        const updated = ObjectMerge.merge<T>(original as Essentials.DeepPartial<T>, document)
        const response = await this.collection.put(id, updated, { rev: updated.rev })

        if (response.ok === false) {
          throw new BError(`could not update document with id: ${id}`)
        }

        return (await this.get(id)) as T
      }

      const docid = { _id: id, doctype: this.doctype } as Essentials.DeepPartial<T>
      const doc = ObjectMerge.merge<T>(document, docid)
      const response = await this.collection.put(id, doc)

      if (response.ok === false) {
        throw new BError(`could not update document with id: ${id}`)
      }

      return (await this.get(id)) as T
    } catch (error) {
      throw new BError('update', error)
    }
  }
}
