import { Essentials } from '../deps.ts'

import { CouchOptions } from './CouchOptions.ts'
import { DatabaseResource } from './DatabaseResource.ts'

export class CouchClient {
  public readonly database: DatabaseResource = new DatabaseResource(this.url, this.options)

  constructor(private readonly url: URL, private readonly options: Essentials.DeepPartial<CouchOptions> = {}) {}
}
