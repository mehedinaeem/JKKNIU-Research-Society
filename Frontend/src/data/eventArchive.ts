import records from './events.json'

export type ArchiveEvent = typeof records[number]
export const events = [...records].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id))
export const years = [...new Set(events.map(event => event.year))]
export const categories = [...new Set(events.map(event => event.category))].sort()
export const eventDate = (date: string) => new Intl.DateTimeFormat('en-GB', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'
}).format(new Date(`${date}T00:00:00Z`))
