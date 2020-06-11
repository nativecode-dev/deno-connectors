import { RestResource, ResourceOptions, ResourceParamType } from "./deps.ts";
import { DatabaseInfo } from "./responses/DatabaseInfo.ts";

export class DatabaseResource extends RestResource {
  constructor(url: URL, options: Partial<ResourceOptions> = {}) {
    super(url, options);
  }

  info(dbname: string) {
    return this.http_get<DatabaseInfo>(`:${dbname}`, {
      key: "dbname",
      type: ResourceParamType.RouteParameter,
      value: "dbname",
    });
  }
}
