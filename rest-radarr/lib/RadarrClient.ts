import { Essentials, ObjectMerge } from '../deps.ts'

import { Movie } from './Models/Movie.ts'
import { Profile } from './Models/Profile.ts'
import { RadarrOptions } from './RadarrOptions.ts'
import { MovieResource } from './Resources/MovieResource.ts'
import { SystemResource } from './Resources/SystemResource.ts'
import { ProfileResource } from './Resources/ProfileResource.ts'
import { HistoryResource } from './Resources/HistoryResource.ts'
import { IndexerResource } from './Resources/IndexerResource.ts'
import { CalendarResource } from './Resources/CalendarResource.ts'
import { DiskspaceResource } from './Resources/DiskspaceResource.ts'

const DefaultRadarrOptions: Partial<RadarrOptions> = {}

export class RadarrClient {
  private readonly options: RadarrOptions

  readonly calendar: CalendarResource
  readonly diskspace: DiskspaceResource
  readonly history: HistoryResource
  readonly indexer: IndexerResource
  readonly movie: MovieResource
  readonly profile: ProfileResource
  readonly system: SystemResource

  constructor(options: Essentials.DeepPartial<RadarrOptions>) {
    this.options = ObjectMerge.merge<RadarrOptions>(DefaultRadarrOptions, options)

    this.calendar = new CalendarResource(this.options)
    this.diskspace = new DiskspaceResource(this.options)
    this.history = new HistoryResource(this.options)
    this.indexer = new IndexerResource(this.options)
    this.movie = new MovieResource(this.options)
    this.profile = new ProfileResource(this.options)
    this.system = new SystemResource(this.options)
  }

  async unmonitor(dryrun: boolean): Promise<Movie[]> {
    const movies = await this.movie.list()
    const profiles = await this.profile.list()

    const completed = movies
      .filter((movie) => movie.downloaded && movie.hasFile && movie.monitored)
      .filter((movie) => {
        const profile = this.getProfile(profiles, movie)
        return profile.cutoff.id === movie.movieFile.quality.quality.id
      })

    if (dryrun) {
      return completed
    }

    const tasks = completed.map((movie) => async () => {
      const source = await this.movie.id(movie.id)
      source.monitored = false
      return this.movie.update(source)
    })

    return Promise.all(tasks.map((task) => task()))
  }

  private getProfile(profiles: Profile[], movie: Movie): Profile {
    const profile = profiles.find((profile) => profile.id === movie.profileId)

    if (profile) {
      return profile
    }

    throw new Error(`profile ${movie.profileId} not found`)
  }
}
