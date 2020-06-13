import { RestResource, ResourceParamType } from '../../deps.ts'

import { Command } from '../Models/Command.ts'

export class CommandResource extends RestResource {
  constructor(url: URL, apikey: string) {
    super(url)
    this.setHeader('X-Api-Key', apikey)
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
