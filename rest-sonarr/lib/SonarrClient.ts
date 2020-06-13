import { Essentials, ObjectMerge } from '../deps.ts'

import { Series } from './Models/Series.ts'
import { Episode } from './Models/Episode.ts'
import { SonarrOptions } from './SonarrOptions.ts'
import { BackupResource } from './Resources/BackupResource.ts'
import { CalendarResource } from './Resources/CalendarResource.ts'
import { CommandResource } from './Resources/CommandResource.ts'
import { DiskspaceResource } from './Resources/DiskspaceResource.ts'
import { EpisodeResource } from './Resources/EpisodeResource.ts'
import { HistoryResource } from './Resources/HistoryResource.ts'
import { IndexerResource } from './Resources/IndexerResource.ts'
import { ProfileResource } from './Resources/ProfileResource.ts'
import { ReleaseResource } from './Resources/ReleaseResource.ts'
import { SeriesResource } from './Resources/SeriesResource.ts'
import { SystemResource } from './Resources/SystemResource.ts'
import { EpisodeFileResource } from './Resources/EpisodeFileResource.ts'
import { WantedMissingResource } from './Resources/WantedMissingResource.ts'
import { ParsedEpisodeInfoResource } from './Resources/ParsedEpisodeInfoResource.ts'

const DefaultSonarrOptions: Partial<SonarrOptions> = {
  host: 'localhost',
  port: 8989,
  secure: false,
}

export interface SeriesInfo {
  [key: number]: Episode[]
  series: Series
}

export class SonarrClient {
  private readonly options: SonarrOptions

  public readonly backup: BackupResource
  public readonly calendar: CalendarResource
  public readonly command: CommandResource
  public readonly diskspace: DiskspaceResource
  public readonly episodes: EpisodeResource
  public readonly files: EpisodeFileResource
  public readonly history: HistoryResource
  public readonly indexer: IndexerResource
  public readonly parser: ParsedEpisodeInfoResource
  public readonly profile: ProfileResource
  public readonly release: ReleaseResource
  public readonly series: SeriesResource
  public readonly system: SystemResource
  public readonly wanted: WantedMissingResource

  constructor(options: Essentials.DeepPartial<SonarrOptions>) {
    this.options = ObjectMerge.merge<SonarrOptions>(DefaultSonarrOptions, options)

    const url = this.url()
    this.backup = new BackupResource(url, this.options.apikey)
    this.calendar = new CalendarResource(url, this.options.apikey)
    this.command = new CommandResource(url, this.options.apikey)
    this.diskspace = new DiskspaceResource(url, this.options.apikey)
    this.episodes = new EpisodeResource(url, this.options.apikey)
    this.files = new EpisodeFileResource(url, this.options.apikey)
    this.history = new HistoryResource(url, this.options.apikey)
    this.indexer = new IndexerResource(url, this.options.apikey)
    this.parser = new ParsedEpisodeInfoResource(url, this.options.apikey)
    this.profile = new ProfileResource(url, this.options.apikey)
    this.release = new ReleaseResource(url, this.options.apikey)
    this.series = new SeriesResource(url, this.options.apikey)
    this.system = new SystemResource(url, this.options.apikey)
    this.wanted = new WantedMissingResource(url, this.options.apikey)
  }

  async unmonitor(dryrun: boolean) {
    const series = await this.getSeries()
    const filtered = series.filter((show) => this.getSeriesCompleted(show))
  }

  private async getSeries(): Promise<SeriesInfo[]> {
    const series = await this.series.list()
    return Promise.all(series.map((show) => () => this.getSeriesSeasons(show)).map((task) => task()))
  }

  private getSeriesCompleted(series: SeriesInfo) {
    const monitored = series.series.seasons.filter((season) => season.monitored)
  }

  private async getSeriesSeasons(series: Series): Promise<SeriesInfo> {
    const episodes = await this.episodes.list(series.id)

    return episodes.reduce<SeriesInfo>(
      (results, current) => {
        const key = current.seasonNumber

        if (results[key] === undefined) {
          results[key] = [current]
        }

        if (results[key]) {
          results[key] = [...results[key], current].sort((a, b) => (a.episodeNumber > b.episodeNumber ? 1 : -1))
        }

        return results
      },
      { series },
    )
  }

  private url() {
    const protocol = this.options.secure ? 'https' : 'http'
    return new URL(`${protocol}://${this.options.host}:${this.options.port}/api`)
  }
}
