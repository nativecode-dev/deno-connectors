import { RestResource } from '../../deps.ts'

import { SystemStatus } from '../Models/SystemStatus.ts'
import { SonarrPackageOptions } from '../SonarrPackageOptions.ts'

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
    const packageInfo = await fs.json<SonarrPackageOptions>(path)
    const status = await this.status()
    const source = status.version
    const target = packageInfo.sonarr.version
    const acceptable = compare(source, target, '>=')
    this.logger.trace('sonarr-version', source, target, acceptable)
    return acceptable
    */

    return Promise.resolve(true)
  }
}
