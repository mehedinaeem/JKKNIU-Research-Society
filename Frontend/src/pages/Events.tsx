import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Calendar, CheckCircle, ChevronDown, ChevronUp, Clock, ExternalLink, MapPin, UserRound, Users } from 'lucide-react'
import {
  events,
  formatEventDate,
  formatEventTimeRange,
  formatStudentsRegistered
} from '../data/events'
import { useRegistrationCount } from '../hooks/useRegistrationCount'

interface HistoricalEvent {
  id: number
  title: string
  date: string
  location: string
  description: string
  type: string
  attendees?: number
  image?: string
  facebookPostUrl?: string
  details?: string[]
}

const facebookPageUrl = 'https://www.facebook.com/JKKNIURS'

const historicalPastEvents: HistoricalEvent[] = [
  { id: 101, title: 'Young Researcher Recruitment 6.0', date: 'February 15, 2026', location: 'JKKNIU Campus', description: 'A society-wide recruitment programme for motivated undergraduate and graduate students interested in research, academic writing, publication, conferences, and collaborative projects.', type: 'Recruitment', attendees: 100, image: '/recruitment-banner.png', facebookPostUrl: facebookPageUrl, details: ['Applications were invited online alongside an offline campus campaign.', 'The completed recruitment cycle accepted 100 applicants.'] },
  { id: 102, title: 'Basic Research Training in Writing & Structuring Research Reports', date: 'September 13, 2025', location: 'Online / JKKNIU', description: 'A focused training session on organizing, writing, and presenting a clear research report, conducted by Dr. Tion R. Swaford of Marian University, USA.', type: 'Workshop', attendees: 100, facebookPostUrl: facebookPageUrl, details: ['Covered the core structure and logical flow of a research report.', 'Connected JKKNIU learners with an international research educator.'] },
  { id: 103, title: 'Basic Research ও Research Methodology কর্মশালা', date: 'June 15, 2025', location: 'JKKNIU Campus', description: 'A practical workshop introducing basic research concepts and the methodology used to plan and carry out an academic study.', type: 'Workshop', attendees: 120, facebookPostUrl: facebookPageUrl, details: ['Part of the society’s continuing Basic Research and Methodology workshop series.', 'Designed to strengthen students’ foundations in research planning.'] },
  { id: 104, title: 'Basics of Social Research কর্মশালা', date: 'December 1, 2024', location: 'JKKNIU Campus', description: 'An introductory social-research workshop conducted by Dr. Md. Bakhtiar Uddin of JKKNIU.', type: 'Workshop', attendees: 80, facebookPostUrl: facebookPageUrl, details: ['Introduced the foundations and process of social-science research.', 'Helped participants connect research questions with suitable methods.'] },
  { id: 106, title: 'ফ্রেশার্স রিসেপশন ও উচ্চশিক্ষা বিষয়ক সেমিনার', date: 'June 5, 2024', location: 'JKKNIU Auditorium', description: 'The society’s annual welcome programme for new students, combined with an academic seminar on higher-education opportunities and preparation.', type: 'Seminar', attendees: 300, facebookPostUrl: facebookPageUrl, details: ['Welcomed new batches into the JKKNIU research community.', 'Shared guidance on higher study pathways and academic development.'] },
  { id: 105, title: 'Stipendium Hungaricum স্কলারশিপ ওয়েবিনার', date: 'January 13, 2024', location: 'Online Webinar', description: 'An online guidance session for students interested in the Stipendium Hungaricum scholarship and its application process.', type: 'Webinar', attendees: 200, facebookPostUrl: facebookPageUrl, details: ['Discussed scholarship opportunities and application preparation.', 'Allowed prospective applicants to receive focused guidance online.'] },
  { id: 107, title: 'Research Excellence: Roadmap for Emerging Scholars', date: 'November 26, 2023', location: 'JKKNIU Campus', description: 'A research-development seminar featuring Dr. Allahi, recognized among the world’s top 2% of researchers, on building a pathway toward research excellence.', type: 'Seminar', attendees: 150, facebookPostUrl: facebookPageUrl, details: ['Focused on practical direction for early-career and emerging researchers.', 'Explored habits, planning, and academic development needed for impactful scholarship.'] },
  { id: 108, title: 'রিসার্চ প্রপোজাল ও কলাম রাইটিং: ক্যারিয়ার পরিকল্পনা', date: 'October 10, 2023', location: 'JKKNIU Campus', description: 'A career-oriented workshop on preparing research proposals and writing newspaper columns, connecting academic communication with professional development.', type: 'Workshop', attendees: 100, facebookPostUrl: facebookPageUrl, details: ['Introduced the essential parts of an effective research proposal.', 'Discussed column writing as a tool for public communication and career growth.'] },
  { id: 114, title: 'Freshers’ Reception & Prize-Giving Ceremony 2022', date: '2023 (exact date unavailable)', location: 'JKKNIU Campus', description: 'A reception for freshers and prize-giving programme celebrating student participation and achievement within the research community.', type: 'Other', facebookPostUrl: facebookPageUrl, details: ['The programme is documented in a public event gallery.', 'The exact programme date and attendance figure are not available in the current archive.'] },
  { id: 109, title: 'Python প্রোগ্রামিং কর্মশালা', date: 'November 26, 2022', location: 'Computer Lab, JKKNIU', description: 'A hands-on Python programming workshop demonstrating how coding can support research, data processing, and analysis.', type: 'Workshop', attendees: 60, facebookPostUrl: facebookPageUrl, details: ['Provided practical computer-lab experience.', 'Introduced Python as a research and data-analysis tool.'] },
  { id: 110, title: 'MS Office ও Mendeley কর্মশালা', date: 'November 24, 2022', location: 'JKKNIU Campus', description: 'A productivity and reference-management workshop conducted by Commonwealth Scholar Sabuj Chandra Bhowmik.', type: 'Workshop', attendees: 80, facebookPostUrl: facebookPageUrl, details: ['Covered essential MS Office tools used in academic work.', 'Introduced Mendeley for organizing sources, citations, and bibliographies.'] },
  { id: 111, title: 'SPSS কর্মশালা', date: 'November 22, 2022', location: 'JKKNIU Campus', description: 'A practical SPSS workshop conducted by Professor Dr. Raju Ahmed, focused on statistical analysis for academic research.', type: 'Workshop', attendees: 70, facebookPostUrl: facebookPageUrl, details: ['Introduced participants to SPSS-based data handling.', 'Connected statistical tools with common research-analysis tasks.'] },
  { id: 112, title: 'MATLAB কর্মশালা', date: 'October 21, 2022', location: 'JKKNIU Campus', description: 'A MATLAB workshop conducted by Professor Dr. Sheikh Sujan Ali, introducing computational tools used in technical and quantitative research.', type: 'Workshop', attendees: 70, facebookPostUrl: facebookPageUrl, details: ['Introduced MATLAB’s research and numerical-computing workflow.', 'Provided guided exposure to computational problem-solving.'] },
  { id: 113, title: 'JKKNIU Research Society প্রতিষ্ঠা', date: '2017', location: 'JKKNIU', description: 'The founding milestone of JKKNIU Research Society, establishing a student-focused platform for research learning, collaboration, and knowledge exchange.', type: 'Milestone', facebookPostUrl: facebookPageUrl, details: ['Marks the beginning of the society’s research-focused activities.', 'The milestone received recognition in Kaler Kantho.'] }
]

const Events = () => {
  const [currentTime, setCurrentTime] = useState(Date.now())
  const [expandedHistoricalEvent, setExpandedHistoricalEvent] = useState<number | null>(null)
  const location = useLocation()
  const navigate = useNavigate()

  const toggleHistoricalEvent = (eventId: number) => {
    setExpandedHistoricalEvent((currentId) => currentId === eventId ? null : eventId)
  }

  useEffect(() => {
    const refreshCurrentTime = () => setCurrentTime(Date.now())

    refreshCurrentTime()
    const intervalId = window.setInterval(refreshCurrentTime, 60000)

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refreshCurrentTime()
      }
    }

    window.addEventListener('focus', refreshCurrentTime)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.clearInterval(intervalId)
      window.removeEventListener('focus', refreshCurrentTime)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  useEffect(() => {
    if (location.pathname === '/events') {
      setCurrentTime(Date.now())
    }
  }, [location.pathname])

  const upcomingEvents = useMemo(
    () =>
      events
        .filter((event) => currentTime < new Date(event.statusChangeDateTime).getTime())
        .sort(
          (firstEvent, secondEvent) =>
            new Date(firstEvent.startDateTime).getTime() - new Date(secondEvent.startDateTime).getTime()
        ),
    [currentTime]
  )

  const pastEvents = useMemo(
    () =>
      events
        .filter((event) => currentTime >= new Date(event.statusChangeDateTime).getTime())
        .sort(
          (firstEvent, secondEvent) =>
            new Date(secondEvent.endDateTime).getTime() - new Date(firstEvent.endDateTime).getTime()
        ),
    [currentTime]
  )

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'Conference': return 'bg-blue-100 text-blue-800'
      case 'Workshop': return 'bg-green-100 text-green-800'
      case 'Symposium': return 'bg-purple-100 text-purple-800'
      case 'Seminar': return 'bg-yellow-100 text-yellow-800'
      case 'Panel Discussion': return 'bg-red-100 text-red-800'
      case 'Recruitment': return 'bg-orange-100 text-orange-800'
      case 'Webinar': return 'bg-indigo-100 text-indigo-800'
      case 'Milestone': return 'bg-pink-100 text-pink-800'
      case 'Research Session': return 'bg-cyan-100 text-cyan-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
              Events & Activities
            </h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Stay updated with our latest research events, conferences, workshops, and academic activities.
              Join us in fostering knowledge exchange and collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Upcoming Events</h2>
            <p className="text-lg text-secondary-600">
              Don't miss these exciting research events and professional development opportunities
            </p>
          </div>

          {upcomingEvents.length === 0 ? (
            <div className="text-center py-12 bg-secondary-50 rounded-lg">
              <Calendar className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
              <p className="text-secondary-600">No upcoming events at the moment. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-8">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="rounded-lg overflow-hidden border-2 border-primary-200 shadow-lg hover:shadow-xl transition-shadow">
                  {/* Event Banner */}
                  <div className="w-full overflow-hidden border-b border-secondary-200 bg-white">
                    <img
                      src={event.bannerImage}
                      alt={`${event.title} event banner`}
                      className="block w-full h-auto max-w-full object-contain"
                    />
                  </div>

                  {/* Event Details */}
                  <div className="bg-white border border-secondary-200 p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEventTypeColor(event.eventType)}`}>
                            {event.eventType}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-secondary-900 mb-3">{event.title}</h3>
                        <p className="text-secondary-600 mb-4">{event.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="text-primary-600" size={20} />
                            <span className="text-secondary-700">{event.eventDate || formatEventDate(event.startDateTime)}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="text-primary-600" size={20} />
                            <span className="text-secondary-700">{formatEventTimeRange(event.startDateTime, event.endDateTime)}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <UserRound className="text-primary-600" size={20} />
                            <span className="text-secondary-700">{event.speaker}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <UserRound className="text-primary-600" size={20} />
                            <span className="text-secondary-700">{event.speakerDesignation}</span>
                          </div>
                          <div className="flex items-start space-x-2 md:col-span-2">
                            <MapPin className="text-primary-600" size={20} />
                            <span className="text-secondary-700">{event.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Users className="text-primary-600" size={20} />
                            <EventRegistrationCount registrationCountUrl={event.registrationCountUrl} />
                          </div>
                        </div>
                      </div>

                      <div className="lg:ml-8 mt-6 lg:mt-0 flex flex-col sm:flex-row lg:flex-col gap-3">
                        <Link
                          to={`/events/${event.slug}/register`}
                          className="btn-primary w-full lg:w-auto inline-flex items-center justify-center"
                        >
                          Register Now
                        </Link>
                        <Link
                          to={`/events/${event.slug}`}
                          className="btn-secondary w-full lg:w-auto inline-flex items-center justify-center"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Past Events */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Past Events</h2>
            <p className="text-lg text-secondary-600">
              Highlights from our recent successful events and activities
            </p>
          </div>

          {pastEvents.length === 0 && historicalPastEvents.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <Calendar className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
              <p className="text-secondary-600">No past events to display.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <article
                  key={event.id}
                  role="link"
                  tabIndex={0}
                  onClick={() => navigate(`/events/${event.slug}`)}
                  onKeyDown={(keyboardEvent) => {
                    if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
                      keyboardEvent.preventDefault()
                      navigate(`/events/${event.slug}`)
                    }
                  }}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500"
                  aria-label={`View details for ${event.title}`}
                >
                  <EventPoster imageSrc={event.bannerImage} title={event.title} heightClassName="h-52" />
                  <div className="flex items-center space-x-3 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.eventType)}`}>
                      {event.eventType}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      Event Completed
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-2">{event.title}</h3>
                  <p className="text-secondary-600 text-sm mb-3">{event.description}</p>

                  <div className="space-y-2 text-sm text-secondary-500">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} />
                      <span>{event.eventDate || formatEventDate(event.startDateTime)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={16} />
                      <span>{formatEventTimeRange(event.startDateTime, event.endDateTime)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <UserRound size={16} />
                      <span>{event.speaker}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <UserRound size={16} />
                      <span>{event.speakerDesignation}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users size={16} />
                      <EventRegistrationCount registrationCountUrl={event.registrationCountUrl} />
                    </div>
                    <div className="text-emerald-700 font-medium">Registration Closed</div>
                  </div>

                  <Link
                    to={`/events/${event.slug}`}
                    onClick={(clickEvent) => clickEvent.stopPropagation()}
                    className="btn-secondary w-full inline-flex items-center justify-center mt-4"
                  >
                    View Event Details
                  </Link>
                </article>
              ))}
              {historicalPastEvents.map((event) => (
                <article
                  key={event.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleHistoricalEvent(event.id)}
                  onKeyDown={(keyboardEvent) => {
                    if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
                      keyboardEvent.preventDefault()
                      toggleHistoricalEvent(event.id)
                    }
                  }}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 flex flex-col"
                  aria-expanded={expandedHistoricalEvent === event.id}
                  aria-label={`${expandedHistoricalEvent === event.id ? 'Hide' : 'Show'} details for ${event.title}`}
                >
                  {event.image && <EventPoster imageSrc={event.image} title={event.title} heightClassName="h-52" />}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        Event Completed
                      </span>
                    </div>
                    {event.facebookPostUrl && (
                      <a
                        href={event.facebookPostUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(clickEvent) => clickEvent.stopPropagation()}
                        className="shrink-0 inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors"
                        aria-label={`View ${event.title} on Facebook`}
                        title="View on Facebook"
                      >
                        Facebook <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-2">{event.title}</h3>
                  <p className="text-secondary-600 text-sm mb-4">{event.description}</p>

                  <div className="flex items-center justify-between mb-4 text-sm font-medium text-primary-600">
                    <span>{expandedHistoricalEvent === event.id ? 'Hide details' : 'Click card to view details'}</span>
                    {expandedHistoricalEvent === event.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>

                  {expandedHistoricalEvent === event.id && event.details && (
                    <div className="mb-4 rounded-lg border border-primary-100 bg-primary-50 p-4">
                      <h4 className="mb-2 font-semibold text-secondary-900">Event details</h4>
                      <ul className="space-y-1 text-sm text-secondary-600 list-disc pl-5">
                        {event.details.map((detail) => <li key={detail}>{detail}</li>)}
                      </ul>
                    </div>
                  )}

                  <div className="space-y-2 text-sm text-secondary-500">
                    <div className="flex items-center gap-2"><Calendar size={16} /><span>{event.date}</span></div>
                    <div className="flex items-center gap-2"><MapPin size={16} /><span>{event.location}</span></div>
                    {event.attendees !== undefined && (
                      <div className="flex items-center gap-2"><Users size={16} /><span>{event.attendees} attendees</span></div>
                    )}
                  </div>

                  {event.type === 'Recruitment' && (
                    <div className="mt-4 pt-4 border-t border-secondary-100">
                      {expandedHistoricalEvent === event.id && (
                        <div className="mt-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center gap-2 text-green-800 font-semibold">
                            <CheckCircle size={20} />
                            <span>100 Applicants Accepted</span>
                          </div>
                          <p className="mt-2 text-green-700 text-sm">The recruitment process was completed successfully.</p>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Event Calendar */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">Stay Updated</h2>
          <p className="text-lg text-secondary-600 mb-8">
            Subscribe to our newsletter or follow us on social media to never miss an event
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Subscribe to Newsletter
            </button>
            <button className="btn-secondary">
              View Event Calendar
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

interface EventPosterProps {
  imageSrc: string
  title: string
  heightClassName: string
}

const EventPoster = ({ imageSrc, title, heightClassName }: EventPosterProps) => {
  const [hasLoadError, setHasLoadError] = useState(false)

  if (!imageSrc || hasLoadError) {
    return (
      <div className={`w-full ${heightClassName} flex items-center justify-center bg-secondary-100 border border-secondary-200 rounded-lg mb-4`}>
        <p className="text-secondary-500 text-sm">Poster placeholder</p>
      </div>
    )
  }

  return (
    <div className={`w-full ${heightClassName} bg-secondary-50 flex items-center justify-center p-4 overflow-hidden`}>
      <img
        src={imageSrc}
        alt={`${title} poster`}
        className="max-w-full max-h-full object-contain"
        onError={() => setHasLoadError(true)}
      />
    </div>
  )
}

const EventRegistrationCount = ({ registrationCountUrl }: { registrationCountUrl: string }) => {
  const { count, isLoading, error } = useRegistrationCount(registrationCountUrl)

  if (isLoading) {
    return <span className="text-secondary-700">Loading registration count...</span>
  }

  if (error || count === null) {
    return <span className="text-secondary-700">Registration count unavailable</span>
  }

  return <span className="text-secondary-700">{formatStudentsRegistered(count)}</span>
}

export default Events
