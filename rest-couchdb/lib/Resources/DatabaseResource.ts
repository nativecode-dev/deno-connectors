import { ResourceParamType } from '../../deps.ts'

import { CouchResource } from '../CouchResource.ts'
import { DatabaseInfo } from '../Responses/DatabaseInfo.ts'

export class DatabaseResource extends CouchResource {
  create(dbname: string, q?: number, n?: number, partitioned: boolean = false) {
    return this.http_put<any, { ok: boolean }>(
      '{:dbname}',
      undefined,
      {
        key: 'dbname',
        type: ResourceParamType.RouteParameter,
        value: dbname,
      },
      {
        key: 'q',
        type: ResourceParamType.Query,
        value: q,
      },
      {
        key: 'n',
        type: ResourceParamType.Query,
        value: n,
      },
      {
        key: 'partitioned',
        type: ResourceParamType.Query,
        value: partitioned,
      },
    )
  }

  delete(dbname: string) {
    return this.http_delete<{ ok: boolean }>('{:dbname}', {
      key: 'dbname',
      type: ResourceParamType.RouteParameter,
      value: dbname,
    })
  }

  document<T>(dbname: string, doc: T | T[], batch: boolean = false) {
    return this.http_post<T | T[], { ok: boolean; id: string; rev: string }>(
      '{:dbname}',
      doc,
      {
        key: 'dbname',
        type: ResourceParamType.RouteParameter,
        value: dbname,
      },
      {
        key: 'batch',
        type: ResourceParamType.Query,
        value: batch,
      },
    )
  }

  info(dbname: string) {
    return this.http_get<DatabaseInfo>('{:dbname}', {
      key: 'dbname',
      type: ResourceParamType.RouteParameter,
      value: dbname,
    })
  }

  list() {
    return this.http_get<string[]>('_all_dbs')
  }
}
