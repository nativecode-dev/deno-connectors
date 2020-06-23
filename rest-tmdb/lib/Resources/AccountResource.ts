import { ResourceParamType } from '../../deps.ts'

import { TmdbResource } from '../TmdbResource.ts'
import { Account } from '../Models/Account.ts'

export class AccountResource extends TmdbResource {
  details(sessionId: string) {
    return this.http_get<Account>('account', {
      key: 'sesson_id',
      type: ResourceParamType.Query,
      value: sessionId,
    })
  }

  lists(accountId: number, apikey: string, sessionId: string) {
    return this.http_get<any>(
      'account/{:accountId}/lists',
      {
        key: 'accountId',
        type: ResourceParamType.RouteParameter,
        value: accountId,
      },
      {
        key: 'sesson_id',
        type: ResourceParamType.Query,
        value: sessionId,
      },
    )
  }
}
