import { RestResource, ResourceParamType } from '../../deps.ts'

import { Backup } from '../Models/Backup.ts'

export class BackupResource extends RestResource {
  constructor(url: URL, apikey: string) {
    super(url)
    this.setHeader('X-Api-Key', apikey)
  }

  list(): Promise<Backup[]> {
    return this.http_get<Backup[]>('system/backup')
  }

  async remove(id: number): Promise<void> {
    await this.http_delete('v3/system/backup/{:id}', {
      key: 'id',
      type: ResourceParamType.RouteParameter,
      value: id,
    })
  }
}
