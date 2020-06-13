import { RestResource } from '../../deps.ts'

import { SystemStatus } from '../Models/SystemStatus.ts'
import { RadarrPackageOptions } from '../RadarrPackageOptions.ts'

export class SystemResource extends RestResource {
  constructor(url: URL, apikey: string) {
    super(url)
    this.setHeader('X-Api-Key', apikey)
  }

  status(): Promise<SystemStatus> {
    return this.http_get<SystemStatus>('system/status')
  }

  async supported(): Promise<boolean> {
    /*
    const path = fs.join(__dirname, '../../package.json')
    const packageInfo = await fs.json<RadarrPackageOptions>(path)
    const status = await this.status()
    const source = this.clean(status.version)
    const target = packageInfo.radarr.version
    const acceptable = compare(source, target, '>=')
    this.logger.trace('radarr-version', source, target, acceptable)
    return acceptable
    */
    return Promise.resolve(true)
  }

  private clean(version: string) {
    return version.split('.').slice(0, 2).join('.')
  }
}
