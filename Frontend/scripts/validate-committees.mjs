import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const members = JSON.parse(fs.readFileSync('src/data/committees.json', 'utf8'))
assert.equal(members.length, 103)
assert.equal(new Set(members.map(member => member.id)).size, 103)
for (const [term, count] of [['1st', 13], ['2nd', 18], ['3rd', 18], ['4th', 18], ['5th', 18], ['6th', 18]]) {
  const selected = members.filter(member => member.committee === term)
  assert.equal(selected.length, count, `${term} count`)
  assert.equal(new Set(selected.map(member => member.person_id)).size, count, `${term} duplicate member`)
  assert.deepEqual(selected.map(member => member.order), selected.map(member => member.order).sort((a, b) => a - b))
}
assert.deepEqual(members.filter(m => m.committee === '6th').slice(0, 4).map(m => [m.name, m.position]), [
  ['Md Mehedi Hasan Naeem', 'President'], ['Ashraful Islam', 'Vice-President (Strategy & Development)'],
  ['Md. Nayan', 'Vice-President (Administration)'], ['Shahjalal Ahmed Nishat', 'General Secretary'],
])
assert(!members.some(m => m.committee === '1st' && [6, 11, 12, 15, 16].includes(m.order)))
for (const member of members) {
  assert(member.name && member.position)
  assert(!Object.keys(member).some(key => /email|phone|whatsapp/i.test(key)), `Private field in ${member.id}`)
  assert(member.bio_status === (member.committee === '6th' ? 'draft' : 'pending_member_review'))
  assert(member.image.startsWith('/media/team/') && member.image.endsWith('.webp'))
  const photo = fs.readFileSync(path.join('public', member.image))
  assert.equal(photo.toString('ascii', 0, 4), 'RIFF')
  assert.equal(photo.toString('ascii', 8, 12), 'WEBP')
  for (const url of Object.values(member.social_links).filter(Boolean)) assert.equal(new URL(url).protocol, 'https:')
}
function checkPublic(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    assert(!/PRIVATE_DO_NOT_DEPLOY|selected_contacts|all-108-audit|recruitment.*\.(csv|xlsx|json)/i.test(entry.name), `Private public asset: ${entry.name}`)
    if (entry.isDirectory()) checkPublic(path.join(directory, entry.name))
  }
}
checkPublic('public')
console.log('PASS: 103 profiles; committee counts 13/18/18/18/18/18; official current leadership; unique ordered seats; 103 WebP paths; HTTPS links; biography statuses; no private contact fields or exports.')

const emptySeats = JSON.parse(fs.readFileSync('src/data/committee-empty-seats.json', 'utf8'))
assert.deepEqual(emptySeats.map(seat => seat.order), [6, 11, 12, 15, 16])
assert(emptySeats.every(seat => seat.committee === '1st' && Object.keys(seat).sort().join(',') === 'committee,order,position'))
const firstSeats = [...members.filter(member => member.committee === '1st'), ...emptySeats].sort((a, b) => a.order - b.order)
assert.deepEqual(firstSeats.map(seat => seat.order), Array.from({ length: 18 }, (_, index) => index + 1))
console.log('PASS: five blank first-committee slots restore all 18 original positions without invented profile data.')
