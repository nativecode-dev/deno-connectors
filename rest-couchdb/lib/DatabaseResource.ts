import { ResourceParamType } from '../deps.ts'

import { CouchResource } from './CouchResource.ts'
import { DatabaseInfo } from './responses/DatabaseInfo.ts'

export class DatabaseResource extends CouchResource {
  info(dbname: string) {
    return this.http_get<DatabaseInfo>('{:dbname}', {
      key: 'dbname',
      type: ResourceParamType.RouteParameter,
      value: dbname,
    })
  }

  list() {
    return this.http_get<string[]>('all_dbs')
  }
}
