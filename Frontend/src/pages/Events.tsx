import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { categories, events, years } from '../data/eventArchive'
import { EventFilters, EventHero, FeaturedEvents, YearSection } from '../components/events/ArchiveComponents'
import '../components/events/events.css'

export default function Events() {
  const [params, setParams] = useSearchParams()
  const category = categories.includes(params.get('category') || '') ? params.get('category')! : 'All'
  const year = years.map(String).includes(params.get('year') || '') ? params.get('year')! : 'All years'
  const filtered = events.filter(event => (category === 'All' || event.category === category) && (year === 'All years' || String(event.year) === year))
  useEffect(() => { const old = document.title; document.title = 'Events Archive | JKKNIU Research Society'; return () => { document.title = old } }, [])
  const filter = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value === 'All' || value === 'All years') next.delete(key)
    else next.set(key, value)
    setParams(next, { preventScrollReset: true })
    document.getElementById('archive')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }
  return <div className="event-experience"><EventHero /><FeaturedEvents /><div id="archive"><EventFilters category={category} year={year} onCategory={value => filter('category', value)} onYear={value => filter('year', value)} /><div className="container-max ea-container ea-archive"><div className="ea-archive-intro"><div><span className="ea-eyebrow">The complete collection</span><h2>Explore our journey</h2></div><p role="status">Showing {filtered.length} of {events.length} events</p></div><div key={`${category}-${year}`} className="ea-filter-results">{years.filter(value => filtered.some(event => event.year === value)).map(value => <YearSection key={value} year={value} records={filtered.filter(event => event.year === value)} />)}</div>{!filtered.length && <div className="ea-empty"><h3>No events in this selection</h3><p>Try another year or explore the complete archive.</p><button className="btn-primary" onClick={() => setParams({})}>Reset filters</button></div>}</div></div></div>
}
