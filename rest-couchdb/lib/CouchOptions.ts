import { ResourceOptions } from '../deps.ts'

export interface CouchOptions extends ResourceOptions {
  password: string
  username: string
}
