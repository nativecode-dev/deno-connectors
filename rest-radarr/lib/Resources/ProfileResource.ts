import { Profile } from '../Models/Profile.ts'
import { RadarrResource } from '../RadarrResource.ts'

export class ProfileResource extends RadarrResource {
  constructor(url: URL, apikey: string) {
    super(url, apikey)
  }

  list(start?: string, end?: string): Promise<Profile[]> {
    return this.http_get<Profile[]>('profile')
  }
}
