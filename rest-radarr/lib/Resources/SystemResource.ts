import { SystemStatus } from '../Models/SystemStatus.ts'
import { RadarrResource } from '../RadarrResource.ts'

export class SystemResource extends RadarrResource {
  constructor(url: URL, apikey: string) {
    super(url, apikey)
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
