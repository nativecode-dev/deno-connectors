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

const DefaultRadarrOptions: Partial<RadarrOptions> = {
  apikey: '',
  host: 'localhost',
  port: 7878,
  secure: false,
}

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

    const url = this.url()
    this.calendar = new CalendarResource(url, this.options.apikey)
    this.diskspace = new DiskspaceResource(url, this.options.apikey)
    this.history = new HistoryResource(url, this.options.apikey)
    this.indexer = new IndexerResource(url, this.options.apikey)
    this.movie = new MovieResource(url, this.options.apikey)
    this.profile = new ProfileResource(url, this.options.apikey)
    this.system = new SystemResource(url, this.options.apikey)
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

  private url() {
    const protocol = this.options.secure ? 'https' : 'http'
    return new URL(`${protocol}://${this.options.host}:${this.options.port}/api`)
  }
}
