import { Document, DocumentCollection, DocumentKey, CouchDatabase, Essentials, ObjectMerge } from '../deps.ts'

export class CouchCollection<T extends Document> implements DocumentCollection<T> {
  constructor(private readonly doctype: string, private readonly collection: CouchDatabase<T>) {
    this.collection = collection
  }

  async all(): Promise<T[]> {
    const selector = { selector: { doctype: this.doctype } }
    const options = { limit: Number.MAX_SAFE_INTEGER }
    const response = await this.collection.find<T>(selector, options)
    return response.docs || []
  }

  async delete(id: string, rev: string): Promise<void> {
    const response = await this.collection.delete(id, rev)

    if (response.ok === false) {
      throw new Error(`could not delete document with id: ${id}`)
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

  async update(document: Essentials.DeepPartial<T>, dockey: DocumentKey<T>): Promise<T> {
    const id = dockey(document)
    const original = (await this.get(id)) as T

    if (original) {
      const updated = ObjectMerge.merge<T>(original as Essentials.DeepPartial<T>, document)
      const response = await this.collection.put(id, updated, { rev: updated.rev })

      if (response.ok === false) {
        throw new Error(`could not update document with id: ${id}`)
      }

      return (await this.get(id)) as T
    }

    const docid = { _id: id, doctype: this.doctype } as Essentials.DeepPartial<T>
    const doc = ObjectMerge.merge<T>(document, docid)
    const response = await this.collection.put(id, doc)

    if (response.ok === false) {
      throw new Error(`could not update document with id: ${id}`)
    }

    return (await this.get(id)) as T
  }
}
