import { Profile } from '../Models/Profile.ts'
import { SonarrResource } from '../SonarrResource.ts'
import { SonarrOptions } from '../SonarrOptions.ts'

export class ProfileResource extends SonarrResource {
  constructor(options: SonarrOptions) {
    super(options)
  }

  list(start?: string, end?: string): Promise<Profile[]> {
    return this.http_get<Profile[]>('profile')
  }
}
