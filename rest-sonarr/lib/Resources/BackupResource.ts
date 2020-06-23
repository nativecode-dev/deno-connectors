import { ResourceParamType } from '../../deps.ts'

import { Backup } from '../Models/Backup.ts'
import { SonarrResource } from '../SonarrResource.ts'
import { SonarrOptions } from '../SonarrOptions.ts'

export class BackupResource extends SonarrResource {
  constructor(options: SonarrOptions) {
    super(options)
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
