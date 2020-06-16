import { ResourceOptions } from '../deps.ts'

export interface SonarrOptions extends ResourceOptions {
  apikey: string
  host: string
  port: number
  secure: boolean
}
