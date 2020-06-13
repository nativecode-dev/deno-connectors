import { RestResource } from '../../deps.ts'

import { Profile } from '../Models/Profile.ts'

export class ProfileResource extends RestResource {
  constructor(url: URL, apikey: string) {
    super(url)
    this.setHeader('X-Api-Key', apikey)
  }

  list(start?: string, end?: string): Promise<Profile[]> {
    return this.http_get<Profile[]>('profile')
  }
}
