import { Calendar, Clock, MapPin, Users, ExternalLink } from 'lucide-react'

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: 'International Conference on AI Research 2025',
      date: 'March 15-17, 2025',
      time: '9:00 AM - 6:00 PM',
      location: 'JKKNIU Main Auditorium',
      description: 'A premier conference bringing together leading researchers in artificial intelligence, machine learning, and data science.',
      type: 'Conference',
      attendees: 300,
      registrationDeadline: 'February 28, 2025',
      speakers: ['Dr. Sarah Johnson (MIT)', 'Prof. Ahmed Hassan (Stanford)', 'Dr. Maria Garcia (Oxford)']
    },
    {
      id: 2,
      title: 'Research Methodology Workshop',
      date: 'January 20, 2025',
      time: '10:00 AM - 4:00 PM',
      location: 'Computer Science Lab 201',
      description: 'Hands-on workshop covering advanced research methodologies, statistical analysis, and academic writing skills.',
      type: 'Workshop',
      attendees: 50,
      registrationDeadline: 'January 15, 2025',
      speakers: ['Prof. Rahman (JKKNIU)', 'Dr. Fatima Ahmed (BUET)']
    },
    {
      id: 3,
      title: 'Student Research Symposium',
      date: 'February 10, 2025',
      time: '9:00 AM - 5:00 PM',
      location: 'JKKNIU Convention Center',
      description: 'Annual symposium showcasing undergraduate and graduate research projects across all disciplines.',
      type: 'Symposium',
      attendees: 200,
      registrationDeadline: 'January 30, 2025',
      speakers: ['Various Student Researchers']
    }
  ]

  const pastEvents = [
    {
      id: 4,
      title: 'Sustainable Development Seminar',
      date: 'November 15, 2024',
      location: 'JKKNIU Auditorium',
      description: 'Discussions on sustainable development goals and research opportunities.',
      type: 'Seminar',
      attendees: 120
    },
    {
      id: 5,
      title: 'Data Science Bootcamp',
      date: 'October 20-22, 2024',
      location: 'Computer Lab Complex',
      description: 'Three-day intensive training in data science and machine learning.',
      type: 'Workshop',
      attendees: 75
    },
    {
      id: 6,
      title: 'Research Ethics Panel Discussion',
      date: 'September 28, 2024',
      location: 'Conference Room A',
      description: 'Panel discussion on research ethics and academic integrity.',
      type: 'Panel Discussion',
      attendees: 80
    }
  ]

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'Conference': return 'bg-blue-100 text-blue-800'
      case 'Workshop': return 'bg-green-100 text-green-800'
      case 'Symposium': return 'bg-purple-100 text-purple-800'
      case 'Seminar': return 'bg-yellow-100 text-yellow-800'
      case 'Panel Discussion': return 'bg-red-100 text-red-800'
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

          <div className="space-y-8">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white border border-secondary-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEventTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                      <span className="text-secondary-500 text-sm">Registration deadline: {event.registrationDeadline}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-secondary-900 mb-3">{event.title}</h3>
                    <p className="text-secondary-600 mb-4">{event.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="text-primary-600" size={20} />
                        <span className="text-secondary-700">{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="text-primary-600" size={20} />
                        <span className="text-secondary-700">{event.time}</span>
                      </div>
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

                    {event.speakers && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-secondary-900 mb-2">Featured Speakers:</h4>
                        <ul className="text-secondary-600">
                          {event.speakers.map((speaker, index) => (
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
                    <button className="btn-primary w-full lg:w-auto">
                      Register Now
                      <ExternalLink className="inline ml-2" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center space-x-3 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                    {event.type}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">{event.title}</h3>
                <p className="text-secondary-600 text-sm mb-3">{event.description}</p>

                <div className="space-y-2 text-sm text-secondary-500">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users size={16} />
                    <span>{event.attendees} attendees</span>
                  </div>
                </div>

                <button className="mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View Event Details →
                </button>
              </div>
            ))}
          </div>
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