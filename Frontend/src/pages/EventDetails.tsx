import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Calendar, Clock, MapPin, UserRound, Users } from 'lucide-react'
import {
  events,
  formatEventDate,
  formatEventTimeRange,
  formatStudentsRegistered
} from '../data/events'
import { useRegistrationCount } from '../hooks/useRegistrationCount'

const EventDetails = () => {
  const { slug } = useParams<{ slug: string }>()
  const event = events.find((item) => item.slug === slug)

  if (!event) {
    return (
      <section className="py-24 bg-secondary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-secondary-900 mb-4">Event Not Found</h1>
          <p className="text-secondary-600 mb-6">
            The event you are looking for does not exist or may have been removed.
          </p>
          <Link to="/events" className="btn-primary inline-flex items-center justify-center">
            Back to Events
          </Link>
        </div>
      </section>
    )
  }

  const isPastEvent = new Date(event.statusChangeDateTime).getTime() <= Date.now()
  const { count, isLoading, error } = useRegistrationCount(event.registrationCountUrl)

  return (
    <section className="py-16 bg-white overflow-x-hidden">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="bg-white border border-secondary-200 rounded-xl shadow-sm overflow-hidden">
          <EventPoster imageSrc={event.bannerImage} title={event.title} />

          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-cyan-100 text-cyan-800">
                {event.eventType}
              </span>
              {isPastEvent && (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                  Event Completed
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">{event.title}</h1>
            <p className="text-lg text-secondary-600 mb-8">{event.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-secondary-700 mb-8">
              <div className="flex items-center space-x-2">
                <Calendar className="text-primary-600" size={20} />
                <span>{event.eventDate || formatEventDate(event.startDateTime)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="text-primary-600" size={20} />
                <span>{formatEventTimeRange(event.startDateTime, event.endDateTime)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <UserRound className="text-primary-600" size={20} />
                <span>{event.speaker}</span>
              </div>
              <div className="flex items-center space-x-2">
                <UserRound className="text-primary-600" size={20} />
                <span>{event.speakerDesignation}</span>
              </div>
              <div className="flex items-start space-x-2 md:col-span-2">
                <MapPin className="text-primary-600 mt-0.5" size={20} />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center space-x-2 md:col-span-2">
                <Users className="text-primary-600" size={20} />
                {isLoading && <span>Loading registration count...</span>}
                {!isLoading && (error || count === null) && <span>Registration count unavailable</span>}
                {!isLoading && !error && count !== null && <span>{formatStudentsRegistered(count)}</span>}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {!isPastEvent ? (
                <Link
                  to={`/events/${event.slug}/register`}
                  className="btn-primary inline-flex items-center justify-center"
                >
                  Register Now
                </Link>
              ) : (
                <span className="inline-flex items-center justify-center px-4 py-3 rounded-lg bg-secondary-100 text-secondary-700 font-medium">
                  Registration Closed
                </span>
              )}

              <Link to="/events" className="btn-secondary inline-flex items-center justify-center">
                Back to Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const EventPoster = ({ imageSrc, title }: { imageSrc: string; title: string }) => {
  const [hasLoadError, setHasLoadError] = useState(false)

  if (!imageSrc || hasLoadError) {
    return (
      <div className="w-full overflow-hidden rounded-t-xl border-b border-secondary-200 bg-secondary-100">
        <div className="py-10 text-center">
          <p className="text-secondary-500 text-sm">Image unavailable</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full overflow-hidden rounded-t-xl border-b border-secondary-200 bg-white">
      <img
        src={imageSrc}
        alt={`${title} poster`}
        className="block w-full h-auto max-w-full object-contain"
        onError={() => setHasLoadError(true)}
      />
    </div>
  )
}

export default EventDetails
