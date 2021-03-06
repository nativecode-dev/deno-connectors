import { ResourceParamType } from '../../deps.ts'

import { Command } from '../Models/Command.ts'
import { SonarrResource } from '../SonarrResource.ts'
import { SonarrOptions } from '../SonarrOptions.ts'

export class CommandResource extends SonarrResource {
  constructor(options: SonarrOptions) {
    super(options)
  }

  backup(): Promise<Command> {
    return this.execute('Backup')
  }

  command(id: number): Promise<Command> {
    return this.http_get('command/{:id}', {
      key: 'id',
      type: ResourceParamType.RouteParameter,
      value: id,
    })
  }

  commands(): Promise<Command[]> {
    return this.http_get('command')
  }

  private execute(command: string, params?: any): Promise<Command> {
    return this.http_post('command', { name: command, ...params })
  }
}
