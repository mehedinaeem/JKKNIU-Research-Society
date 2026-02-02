import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, MapPin, Users, Loader2, AlertCircle } from 'lucide-react'
import { fetchUpcomingEvents, fetchPastEvents, formatDate, type Event } from '../services/api'

const Events = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
  const [pastEvents, setPastEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true)
        setError(null)

        const [upcoming, past] = await Promise.all([
          fetchUpcomingEvents(),
          fetchPastEvents()
        ])

        setUpcomingEvents(upcoming)
        setPastEvents(past)
      } catch (err) {
        console.error('Error loading events:', err)
        setError('Failed to load events. Please make sure the backend server is running.')
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [])

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
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-secondary-600">Loading events...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-secondary-900 mb-2">Unable to Load Events</h2>
          <p className="text-secondary-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    )
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
                <div key={event.id} className="rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Event Banner */}
                  {event.banner_image_url && (
                    <div
                      className="hidden md:flex relative w-full h-64 md:h-80 items-center justify-center overflow-hidden bg-cover bg-center"
                      style={{ backgroundImage: `url(${event.banner_image_url})` }}
                    >
                      <div className="absolute inset-0 bg-black/0"></div>
                    </div>
                  )}

                  {/* Event Details */}
                  <div className="bg-white border border-secondary-200 p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEventTypeColor(event.event_type)}`}>
                            {event.event_type}
                          </span>
                          {event.registration_deadline && (
                            <span className="text-secondary-500 text-sm">
                              Registration deadline: {formatDate(event.registration_deadline)}
                            </span>
                          )}
                        </div>
                        <h3 className="text-2xl font-bold text-secondary-900 mb-3">{event.title}</h3>
                        <p className="text-secondary-600 mb-4">{event.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="text-primary-600" size={20} />
                            <span className="text-secondary-700">{formatDate(event.date)}</span>
                          </div>
                          {event.time && (
                            <div className="flex items-center space-x-2">
                              <Clock className="text-primary-600" size={20} />
                              <span className="text-secondary-700">{event.time}</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-2">
                            <MapPin className="text-primary-600" size={20} />
                            <span className="text-secondary-700">{event.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Users className="text-primary-600" size={20} />
                            <span className="text-secondary-700">Expected: {event.attendees} attendees</span>
                          </div>
                        </div>

                        {event.speakers_list && event.speakers_list.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-semibold text-secondary-900 mb-2">Featured Speakers:</h4>
                            <ul className="text-secondary-600">
                              {event.speakers_list.map((speaker, index) => (
                                <li key={index} className="flex items-center space-x-2">
                                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full"></span>
                                  <span>{speaker}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="lg:ml-8 mt-6 lg:mt-0">
                        <Link
                          to="/contact"
                          className="btn-primary w-full lg:w-auto inline-flex items-center justify-center"
                        >
                          Register Now
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
                  <div className="flex items-center space-x-3 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.event_type)}`}>
                      {event.event_type}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-2">{event.title}</h3>
                  <p className="text-secondary-600 text-sm mb-3 line-clamp-3">{event.description}</p>

                  <div className="space-y-2 text-sm text-secondary-500">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} />
                      <span>{event.location}</span>
                    </div>
                    {event.attendees > 0 && (
                      <div className="flex items-center space-x-2">
                        <Users size={16} />
                        <span>{event.attendees} attendees</span>
                      </div>
                    )}
                  </div>
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

export default Events