import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Calendar, Clock, MapPin, UserRound, Users } from 'lucide-react'
import {
  events,
  formatEventDate,
  formatEventTimeRange,
  formatStudentsRegistered,
  type EventItem
} from '../data/events'
import { useRegistrationCount } from '../hooks/useRegistrationCount'

const Events = () => {
  const [currentTime, setCurrentTime] = useState(Date.now())
  const location = useLocation()

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

  const isPastEvent = (event: EventItem) =>
    currentTime >= new Date(event.statusChangeDateTime).getTime()

  const upcomingEvents = useMemo(
    () =>
      events
        .filter((event) => !isPastEvent(event))
        .sort(
          (firstEvent, secondEvent) =>
            new Date(firstEvent.startDateTime).getTime() - new Date(secondEvent.startDateTime).getTime()
        ),
    [currentTime]
  )

  const pastEvents = useMemo(
    () =>
      events
        .filter((event) => isPastEvent(event))
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

          {pastEvents.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <Calendar className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
              <p className="text-secondary-600">No past events to display.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
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
                    className="btn-secondary w-full inline-flex items-center justify-center mt-4"
                  >
                    View Event Details
                  </Link>
                </div>
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