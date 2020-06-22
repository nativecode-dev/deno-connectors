import { ResourceOptions } from '../deps.ts'

export interface TmdbOptions extends ResourceOptions {
  apikey: string
  bearer: string
}
