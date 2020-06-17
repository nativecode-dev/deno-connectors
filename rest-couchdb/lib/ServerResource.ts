import { ResourceParamType } from '../deps.ts'

import { CouchResource } from './CouchResource.ts'
import { ActiveTasks } from './responses/ActiveTasks.ts'

export class ServerResource extends CouchResource {
  activeTasks() {
    return this.http_get<ActiveTasks>('_active_tasks')
  }

  clusterSetup() {}
}
