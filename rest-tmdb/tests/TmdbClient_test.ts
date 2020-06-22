import { Essentials, ConnectorOptions, ObjectMerge } from '../deps.ts'
import { Env, assertEquals } from '../test_deps.ts'

import { TmdbClient } from '../lib/TmdbClient.ts'
import { TmdbSources } from '../lib/Resources/TmdbSources.ts'

const env = new Env({ env: Deno.env.toObject(), prefix: ['test'] })
const envobj = env.toObject()

const OPTIONS: Essentials.DeepPartial<ConnectorOptions> = {
  endpoint: {
    host: 'api.themoviedb.org',
    path: '3',
  },
  name: 'tmdb',
}

const client = new TmdbClient(ObjectMerge.merge<ConnectorOptions>({}, OPTIONS, envobj.test.tmdb))

Deno.test('should find Tenet by IMDb ID', async () => {
  const results = await client.find.byId('tt6723592', TmdbSources.imdb)
  assertEquals(results.movie_results[0].id, 577922)
})
