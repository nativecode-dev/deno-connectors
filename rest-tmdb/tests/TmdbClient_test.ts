import { Essentials, ConnectorOptions, ObjectMerge } from '../deps.ts'
import { Env, assertEquals, assertNotEquals } from '../test_deps.ts'

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

const client = new TmdbClient(ObjectMerge.merge<ConnectorOptions>(OPTIONS, envobj.test.tmdb))

const MOVIEID = 577922
const SERIESID = 1973

Deno.test('should find Tenet by IMDb ID', async () => {
  const results = await client.find.byId('tt6723592', TmdbSources.imdb)
  assertEquals(results.movie_results[0].id, MOVIEID)
})

Deno.test('should get Tenet alternate titles', async () => {
  const results = await client.movies.alternateTitles(MOVIEID)
  assertNotEquals(results.titles.length, 0)
})

Deno.test('should get Tenet credits', async () => {
  const results = await client.movies.credits(MOVIEID)
  assertNotEquals(results.cast.length, 0)
})

Deno.test('should find Tenet details', async () => {
  const results = await client.movies.details(MOVIEID)
  assertEquals(results.original_title, 'Tenet')
})

Deno.test('should find Tenet external source ids', async () => {
  const results = await client.movies.externals(MOVIEID)
  assertEquals(results.imdb_id, 'tt6723592')
})

Deno.test('should find Tenet images', async () => {
  const results = await client.movies.images(MOVIEID)
  assertEquals(results.id, MOVIEID)
})

Deno.test('should get 24 alternate titles', async () => {
  const results = await client.series.alternateTitles(SERIESID)
  assertNotEquals(results.results.length, 0)
})

Deno.test('should get 24 credits', async () => {
  const results = await client.series.credits(SERIESID)
  assertNotEquals(results.cast.length, 0)
})

Deno.test('should find 24 details', async () => {
  const results = await client.series.details(SERIESID)
  assertEquals(results.original_name, '24')
})

Deno.test('should find 24 external source ids', async () => {
  const results = await client.series.externals(SERIESID)
  assertEquals(results.imdb_id, 'tt0285331')
})

Deno.test('should find 24 images', async () => {
  const results = await client.series.images(SERIESID)
  assertEquals(results.id, SERIESID)
})

Deno.test('should find 24 season', async () => {
  const results = await client.series.season(SERIESID, 1)
  assertEquals(results.episodes.length, 24)
})

Deno.test('should find 24 season', async () => {
  const results = await client.series.episode(SERIESID, 1, 1)
  assertEquals(results.name, '12:00 A.M.-1:00 A.M.')
})

Deno.test('should get movie genres', async () => {
  const results = await client.genre.movies()
  assertNotEquals(results.genres.length, 0)
})

Deno.test('should get tv genres', async () => {
  const results = await client.genre.shows()
  assertNotEquals(results.genres.length, 0)
})
