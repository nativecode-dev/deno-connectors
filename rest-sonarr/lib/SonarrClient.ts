import { Essentials, ObjectMerge, Throttle } from '../deps.ts'

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
import { WantedMissingResource } from './Resources/WantedMissingResource.ts'
import { ParsedEpisodeInfoResource } from './Resources/ParsedEpisodeInfoResource.ts'

const DefaultSonarrOptions: Partial<SonarrOptions> = {}

export class SonarrClient {
  private readonly options: SonarrOptions

  public readonly backup: BackupResource
  public readonly calendar: CalendarResource
  public readonly command: CommandResource
  public readonly diskspace: DiskspaceResource
  public readonly episodes: EpisodeResource
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

    this.backup = new BackupResource(this.options)
    this.calendar = new CalendarResource(this.options)
    this.command = new CommandResource(this.options)
    this.diskspace = new DiskspaceResource(this.options)
    this.episodes = new EpisodeResource(this.options)
    this.history = new HistoryResource(this.options)
    this.indexer = new IndexerResource(this.options)
    this.parser = new ParsedEpisodeInfoResource(this.options)
    this.profile = new ProfileResource(this.options)
    this.release = new ReleaseResource(this.options)
    this.series = new SeriesResource(this.options)
    this.system = new SystemResource(this.options)
    this.wanted = new WantedMissingResource(this.options)
  }

  async unmonitor(dryrun: boolean) {
    const series = await this.series.list()

    const tasks = series.map((show) => async () => {
      const episodes = await this.episodes.list(show.id)
      const episodeTasks = show.seasons.map((season) => async () => {
        const seasonCount = episodes.filter((episode) => episode.seasonNumber === season.seasonNumber).length

        const fileTasks = episodes
          .filter((episode) => episode.seasonNumber === season.seasonNumber && episode.hasFile)
          .map((episode) => async () => {
            const file = await this.episodes.files.id(episode.id)

            if (file.qualityCutoffNotMet === false && episode.monitored && dryrun === false) {
              episode.monitored = false
              await this.episodes.update(episode)
            }
          })

        if (fileTasks.length === seasonCount) {
          await Throttle.all(fileTasks)
        }
      })

      await Throttle.serial(episodeTasks)
    })

    await Throttle.all(tasks)
  }
}
