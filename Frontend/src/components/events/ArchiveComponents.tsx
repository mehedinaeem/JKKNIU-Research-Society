import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { ArchiveEvent, categories, eventDate, events, years } from '../../data/eventArchive'

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { node.classList.remove('ea-pending'); observer.disconnect() }
    }, { threshold: 0.06 })
    node.classList.add('ea-pending')
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className="ea-reveal" style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>{children}</div>
}

function Count({ value }: { value: number }) {
  const [count, setCount] = useState(value)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame: number
    const start = performance.now()
    const update = (now: number) => {
      const progress = Math.min((now - start) / 1000, 1)
      setCount(Math.round(value * (1 - (1 - progress) ** 3)))
      if (progress < 1) frame = requestAnimationFrame(update)
    }
    frame = requestAnimationFrame(update)
    return () => cancelAnimationFrame(frame)
  }, [value])
  return <><span aria-hidden="true">{count}</span><span className="sr-only">{value}</span></>
}

export function EventHero() {
  return <header className="ea-hero"><div className="container-max ea-container">
    <div className="ea-eyebrow">Our journey <span /> JKKNIU Research Society</div>
    <h1>Research. Learning.<br /><em>Collaboration.</em></h1>
    <div className="ea-hero-bottom"><p>Explore the gatherings, ideas, and shared experiences that shape our research community. A living record of learning together, from {Math.min(...years)} to {Math.max(...years)}.</p><a href="#archive" className="ea-round-link">Explore the archive <ArrowDown size={18} /></a></div>
    <div className="ea-stats"><div><strong><Count value={events.length} /></strong><span>Completed events</span></div><div><strong><Count value={years.length} /></strong><span>Years of shared learning</span></div><div><strong>{Math.min(...years)} <span className="ea-dash">—</span> {Math.max(...years)}</strong><span>Our archive, so far</span></div></div>
  </div></header>
}

export function EventCard({ event, eager = false, summary = false }: { event: ArchiveEvent; eager?: boolean; summary?: boolean }) {
  return <article className="ea-card"><Link to={`/events/${event.slug}`} aria-label={`Explore ${event.title}`}>
    <div className="ea-card-image"><picture><source media="(max-width: 768px)" srcSet={event.cardMobile} /><img src={event.cardDesktop} width={1600} height={900} alt={event.title} loading={eager ? 'eager' : 'lazy'} decoding="async" /></picture></div>
    {summary ? <div className="ea-featured-summary"><h3>{event.title}</h3><p>{event.shortDescription}</p></div> : <div className="sr-only"><h3>{event.title}</h3></div>}
    <div className="ea-card-meta"><div><span>{event.category}</span><time dateTime={event.date}>{eventDate(event.date)}</time></div><ArrowUpRight aria-hidden="true" size={22} /></div>
  </Link></article>
}

export function FeaturedEvents() {
  const featured = events.filter(event => event.featured).slice(0, 3)
  if (!featured.length) return null
  return <section className="ea-featured container-max ea-container"><div className="ea-section-title"><div><span className="ea-eyebrow">In focus</span><h2>Moments that move us forward.</h2></div><span className="ea-muted">Selected from our archive</span></div><div className="ea-featured-grid">{featured.map((event, index) => <Reveal key={event.id} delay={index * 70}><EventCard event={event} eager={index === 0} summary={index === 0} /></Reveal>)}</div></section>
}

export function EventFilters({ category, year, onCategory, onYear }: { category: string; year: string; onCategory: (value: string) => void; onYear: (value: string) => void }) {
  return <div className="ea-filters"><div className="container-max ea-container"><div className="ea-filter-row" role="group" aria-label="Filter by category">{['All', ...categories].map(value => <button key={value} aria-pressed={category === value} onClick={() => onCategory(value)}>{value}</button>)}</div><div className="ea-filter-row ea-years" role="group" aria-label="Filter by year">{['All years', ...years.map(String)].map(value => <button key={value} aria-pressed={year === value} onClick={() => onYear(value)}>{value}</button>)}</div></div></div>
}

export function YearSection({ year, records }: { year: number; records: ArchiveEvent[] }) {
  return <section id={`year-${year}`} className="ea-year-section"><Reveal><div className="ea-year-heading"><h2>{year}</h2><span /><p>{records.length} {records.length === 1 ? 'event' : 'events'}</p></div></Reveal><div className="ea-event-grid">{records.map((event, index) => <Reveal key={event.id} delay={(index % 3) * 70}><EventCard event={event} /></Reveal>)}</div></section>
}
