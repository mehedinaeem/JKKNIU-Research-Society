import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { events, eventDate } from '../data/eventArchive'
import EventGallery from '../components/events/EventGallery'
import { Reveal } from '../components/events/ArchiveComponents'
import '../components/events/events.css'

export default function EventDetails() {
  const { slug } = useParams()
  const index = events.findIndex(event => event.slug === slug)
  const event = events[index]
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    const old = document.title
    document.title = event ? `${event.title} | JKKNIU Research Society` : 'Event not found | JKKNIURS'
    return () => { document.title = old }
  }, [event])
  if (!event) return <div className="event-experience ea-container ea-not-found container-max"><h1>Event not found</h1><p>This event is not in the archive.</p><Link className="btn-primary" to="/events">Back to Events</Link></div>
  const previous = events[index + 1]
  const next = events[index - 1]
  const information = [['Date', eventDate(event.date)], ['End date', event.endDate && eventDate(event.endDate)], ['Venue', event.venue], ['Mode', event.mode], ['Status', event.status], ['Organizer type', event.organizerType], ['Participants', event.participants]]
  return <div className="event-experience" key={event.id}><article className="container-max ea-container ea-detail"><Link to={`/events?year=${event.year}#archive`} className="ea-back"><ArrowLeft size={18} /> Back to Events</Link><header className="ea-detail-header"><div className="ea-detail-labels"><span className="ea-eyebrow">{event.category}</span><time dateTime={event.date}>{eventDate(event.date)}</time></div><h1>{event.title}</h1></header>{event.coverImage ? <img className="ea-cover" src={event.coverImage} alt={`${event.title} — event photograph`} loading="eager" /> : <div className="ea-no-photo">No accessible event photograph is available in the archive.</div>}<div className="ea-detail-body"><div><section><span className="ea-eyebrow">The story</span><h2>About the event</h2><p className="ea-description">{event.fullDescription || event.shortDescription}</p></section>{event.speakers.length > 0 && <section><h2>Speakers</h2><div className="ea-people">{event.speakers.map((person, i) => <div key={i}><h3>{person.name}</h3><p>{person.position}</p><p>{person.institution}</p></div>)}</div></section>}{event.guests.length > 0 && <section><h2>Guests</h2>{event.guests.map((person, i) => <div className="ea-person" key={i}><h3>{person.name}</h3><p>{person.role}</p><p>{person.institution}</p></div>)}</section>}{event.highlights.length > 0 && <section><h2>Highlights</h2><ul className="ea-highlights">{event.highlights.map((item, i) => <li key={i}>{item}</li>)}</ul></section>}{event.awards && <section><h2>Awards</h2><p>{event.awards}</p></section>}{event.partners.length > 0 && <section><h2>Partners</h2><ul className="ea-highlights">{event.partners.map((item, i) => <li key={i}>{item}</li>)}</ul></section>}</div><aside><h2>Event information</h2><dl>{information.filter(([, value]) => value).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>{event.facebookUrl && <a className="ea-source" href={event.facebookUrl} target="_blank" rel="noopener noreferrer">View Original Facebook Post <ArrowUpRight size={20} /></a>}</aside></div><EventGallery images={event.gallery} title={event.title} />{event.poster && <Reveal><section className="ea-poster"><h2>Original Event Poster</h2><img src={event.poster} alt={`${event.title} — original event poster`} loading="lazy" /></section></Reveal>}{event.newsLinks.length > 0 && <section><h2>In the news</h2>{event.newsLinks.map((url, i) => <a key={i} href={url} target="_blank" rel="noopener noreferrer">News source {i + 1} ↗</a>)}</section>}<nav className="ea-event-navigation" aria-label="Adjacent events"><div>{previous && <Link to={`/events/${previous.slug}`}><span><ArrowLeft size={18} /> Previous event</span><strong>{previous.title}</strong></Link>}</div><div>{next && <Link to={`/events/${next.slug}`}><span>Next event <ArrowRight size={18} /></span><strong>{next.title}</strong></Link>}</div></nav></article></div>
}
