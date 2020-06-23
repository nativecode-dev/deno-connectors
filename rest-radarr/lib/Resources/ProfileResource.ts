import { Profile } from '../Models/Profile.ts'
import { RadarrResource } from '../RadarrResource.ts'
import { RadarrOptions } from '../RadarrOptions.ts'

export class ProfileResource extends RadarrResource {
  constructor(options: RadarrOptions) {
    super(options)
  }

  list(start?: string, end?: string): Promise<Profile[]> {
    return this.http_get<Profile[]>('profile')
  }
}
