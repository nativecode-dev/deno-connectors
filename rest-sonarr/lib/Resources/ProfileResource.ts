import { Profile } from '../Models/Profile.ts'
import { SonarrResource } from '../SonarrResource.ts'

export class ProfileResource extends SonarrResource {
  constructor(url: URL, apikey: string) {
    super(url, apikey)
  }

  list(start?: string, end?: string): Promise<Profile[]> {
    return this.http_get<Profile[]>('profile')
  }
}
