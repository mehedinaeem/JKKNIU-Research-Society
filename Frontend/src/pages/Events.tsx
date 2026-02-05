import { Link } from 'react-router-dom'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'

interface Event {
  id: number
  title: string
  date: string
  location: string
  description: string
  type: string
  attendees: number
  registrationDeadline?: string
  time?: string
  speakers?: string[]
}

const Events = () => {
  const upcomingEvents: Event[] = [
    {
      id: 1,
      title: 'Young Researcher Recruitment 6.0',
      date: 'February 15, 2026',
      location: 'On Campus',
      description: 'Join the Young Researcher Recruitment 6.0 program! This is an exciting opportunity for undergraduate and graduate students to showcase their research skills, collaborate with experienced researchers, and contribute to groundbreaking research projects at JKKNIU Research Society.',
      type: 'Recruitment',
      attendees: 100,
      registrationDeadline: 'February 15, 2026',
    }
  ]

  const pastEvents: Event[] = [
    {
      id: 2,
      title: 'Basic Research Training in Writing & Structuring Research Reports',
      date: 'September 13, 2025',
      location: 'Online / JKKNIU',
      description: 'Dr. Tion R. Swaford, Marian University, USA conducted this session on writing and structuring research reports.',
      type: 'Workshop',
      attendees: 100
    },
    {
      id: 3,
      title: 'Basic Research ও Research Methodology কর্মশালা',
      date: 'June 15, 2025',
      location: 'JKKNIU Campus',
      description: 'Part of the ongoing workshop series on Basic Research and Methodology.',
      type: 'Workshop',
      attendees: 120
    },
    {
      id: 4,
      title: 'Basics of Social Research কর্মশালা',
      date: 'December 1, 2024',
      location: 'JKKNIU Campus',
      description: 'Conducted by Dr. Md. Bakhtiar Uddin, JKKNIU.',
      type: 'Workshop',
      attendees: 80
    },
    {
      id: 5,
      title: 'Stipendium Hungaricum স্কলারশিপ ওয়েবিনার',
      date: 'January 13, 2024',
      location: 'Online Webinar',
      description: 'A session guiding students on the Stipendium Hungaricum Scholarship application process.',
      type: 'Webinar',
      attendees: 200
    },
    {
      id: 6,
      title: 'ফ্রেশার্স রিসেপশন ও উচ্চশিক্ষা বিষয়ক সেমিনার',
      date: 'June 5, 2024',
      location: 'JKKNIU Auditorium',
      description: 'Annual reception for new batches and seminar on higher education opportunities.',
      type: 'Seminar',
      attendees: 300
    },
    {
      id: 7,
      title: 'Research Excellence: Roadmap for Emerging Scholars',
      date: 'November 26, 2023',
      location: 'JKKNIU Campus',
      description: 'Speaker: Dr. Allahi, recognized as one of the world\'s top 2% researchers.',
      type: 'Seminar',
      attendees: 150
    },
    {
      id: 8,
      title: 'রিসার্চ প্রপোজাল ও কলাম রাইটিং: ক্যারিয়ার পরিকল্পনা',
      date: 'October 10, 2023',
      location: 'JKKNIU Campus',
      description: 'Workshop on writing research proposals and newspaper columns for career development.',
      type: 'Workshop',
      attendees: 100
    },
    {
      id: 9,
      title: 'Python প্রোগ্রামিং কর্মশালা',
      date: 'November 26, 2022',
      location: 'Computer Lab, JKKNIU',
      description: 'Hands-on training on Python programming for research and data analysis.',
      type: 'Workshop',
      attendees: 60
    },
    {
      id: 10,
      title: 'MS Office ও Mendeley কর্মশালা',
      date: 'November 24, 2022',
      location: 'JKKNIU Campus',
      description: 'Conducted by Sabuj Chandra Bhowmik, Commonwealth Scholar.',
      type: 'Workshop',
      attendees: 80
    },
    {
      id: 11,
      title: 'SPSS কর্মশালা',
      date: 'November 22, 2022',
      location: 'JKKNIU Campus',
      description: 'Conducted by Professor Dr. Raju Ahmed.',
      type: 'Workshop',
      attendees: 70
    },
    {
      id: 12,
      title: 'MATLAB কর্মশালা',
      date: 'October 21, 2022',
      location: 'JKKNIU Campus',
      description: 'Conducted by Professor Dr. Sheikh Sujan Ali.',
      type: 'Workshop',
      attendees: 70
    },
    {
      id: 13,
      title: 'JKKNIU Research Society প্রতিষ্ঠা',
      date: '2017',
      location: 'JKKNIU',
      description: 'Founding of JKKNIU Research Society and official recognition in Kaler Kantho.',
      type: 'Milestone',
      attendees: 0
    }
  ]

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'Conference': return 'bg-blue-100 text-blue-800'
      case 'Workshop': return 'bg-green-100 text-green-800'
      case 'Symposium': return 'bg-purple-100 text-purple-800'
      case 'Seminar': return 'bg-yellow-100 text-yellow-800'
      case 'Panel Discussion': return 'bg-red-100 text-red-800'
      case 'Recruitment': return 'bg-orange-100 text-orange-800'
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
              <div key={event.id} className="rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                {/* Event Banner - visible on all devices */}
                <div className="w-full">
                  <img
                    src="/media/banner.png"
                    alt="Young Researcher Recruitment 6.0"
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Event Details */}
                <div className="bg-white border border-secondary-200 p-6 md:p-8">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEventTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                    <span className="text-secondary-500 text-sm">Registration deadline: {event.registrationDeadline}</span>
                  </div>
                  <p className="text-secondary-600 mb-4 text-justify">{event.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="text-primary-600" size={20} />
                      <span className="text-secondary-700">{event.date}</span>
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

                  {event.speakers && (
                    <div className="mb-6">
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

                  {/* Apply Button - bottom right */}
                  <div className="flex justify-end mt-4 pt-4 border-t border-secondary-100">
                    <Link
                      to="/recruitment"
                      className="btn-primary inline-flex items-center justify-center px-8 py-3"
                    >
                      Apply Now
                    </Link>
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