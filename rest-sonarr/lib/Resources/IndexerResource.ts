import { ResourceParamType } from '../../deps.ts'

import { Indexer } from '../Models/Indexer.ts'
import { SonarrResource } from '../SonarrResource.ts'
import { SonarrOptions } from '../SonarrOptions.ts'

export class IndexerResource extends SonarrResource {
  constructor(options: SonarrOptions) {
    super(options)
  }

  indexer(id: number): Promise<Indexer> {
    return this.http_get('indexer/{:id}', {
      key: 'id',
      type: ResourceParamType.RouteParameter,
      value: id,
    })
  }

  list(): Promise<Indexer[]> {
    return this.http_get('indexer')
  }

  remove(id: number): Promise<void> {
    return this.http_delete('indexer/{:id}', {
      key: 'id',
      type: ResourceParamType.RouteParameter,
      value: id,
    })
  }

  update(indexer: Indexer): Promise<Indexer> {
    return this.http_put('indexer/{:id}', indexer, {
      key: 'id',
      type: ResourceParamType.RouteParameter,
      value: indexer.id,
    })
  }
}
