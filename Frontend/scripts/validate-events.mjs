import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'

const root = new URL('../', import.meta.url)
const events = JSON.parse(await readFile(new URL('src/data/events.json', root), 'utf8'))
assert.equal(events.length, 73)
assert.equal(new Set(events.map(event => event.id)).size, 73)
assert.equal(new Set(events.map(event => event.slug)).size, 73)
assert.deepEqual([...new Set(events.map(event => event.year))].sort(), [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026])
let assets = 0
for (const event of events) {
  assert.match(event.cardDesktop, /\/card\/card-desktop\.webp$/)
  assert.match(event.cardMobile, /\/card\/card-mobile\.webp$/)
  if (event.coverImage) assert.match(event.coverImage, /\/cover\/cover\.webp$/)
  for (const image of [event.cardDesktop, event.cardMobile, event.coverImage, event.poster, ...event.gallery].filter(Boolean)) {
    assert.ok(image.startsWith(`/events/${event.year}/${event.id}/`), image)
    await access(new URL(`public${image}`, root))
    assets++
  }
  if (event.facebookUrl) assert.equal(new URL(event.facebookUrl).hostname, 'www.facebook.com')
}
console.log(`Validated ${events.length} unique events, 8 years, and ${assets} local asset references.`)
