import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    alert('Thank you for your message. We will get back to you soon!')
  }

  const contactInfo = [
    {
      icon: <MapPin className="text-primary-600" size={24} />,
      title: 'Address',
      details: 'Jatiya Kabi Kazi Nazrul Islam University\nTrishal, Mymensingh\nBangladesh'
    },
    {
      icon: <Phone className="text-primary-600" size={24} />,
      title: 'Phone',
      details: '+880-1712-345678\n+880-1712-345679 (Ext. 101)'
    },
    {
      icon: <Mail className="text-primary-600" size={24} />,
      title: 'Email',
      details: 'research@jkkniu.edu.bd\nsupport@jkkniu.edu.bd'
    },
    {
      icon: <Clock className="text-primary-600" size={24} />,
      title: 'Office Hours',
      details: 'Monday - Friday: 9:00 AM - 5:00 PM\nSaturday: 10:00 AM - 2:00 PM\nSunday: Closed'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Have questions or want to get in touch? We'd love to hear from you.
              Reach out through any of the channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Get in Touch</h2>
            <p className="text-lg text-secondary-600">
              Multiple ways to reach us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white border border-secondary-200 rounded-lg p-6 text-center">
                <div className="flex justify-center mb-4">
                  {info.icon}
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">{info.title}</h3>
                <p className="text-secondary-600 whitespace-pre-line text-sm">{info.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Send us a Message</h2>
            <p className="text-lg text-secondary-600">
              Fill out the form below and we'll respond as soon as possible
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-secondary-900 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-secondary-900 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-secondary-900 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                  placeholder="+880-1712-345678"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-secondary-900 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                >
                  <option value="">Select a subject</option>
                  <option value="membership">Membership Inquiry</option>
                  <option value="collaboration">Research Collaboration</option>
                  <option value="event">Event Registration</option>
                  <option value="publication">Publication Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-semibold text-secondary-900 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                placeholder="Please share your message or inquiry here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center"
            >
              <Send size={18} className="mr-2" />
              Send Message
            </button>

            <p className="text-secondary-500 text-sm mt-4">
              * Required fields. We typically respond within 24-48 hours.
            </p>
          </form>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Find Us</h2>
            <p className="text-lg text-secondary-600">
              Visit us at our main campus in Mymensingh
            </p>
          </div>

          <div className="bg-secondary-200 rounded-lg overflow-hidden h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="text-primary-600 mx-auto mb-3" size={48} />
              <p className="text-secondary-600 font-semibold">
                Map integration would be displayed here
              </p>
              <p className="text-secondary-500 text-sm mt-2">
                Trishal, Mymensingh, Bangladesh
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Department Directory */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Department Directory</h2>
            <p className="text-lg text-secondary-600">
              Direct contact information for specific departments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                department: 'Research Administration',
                contact: 'Dr. Mohammad Rahman',
                email: 'research@jkkniu.edu.bd',
                phone: '+880-1712-345678'
              },
              {
                department: 'Membership & Outreach',
                contact: 'Ms. Sarah Khan',
                email: 'membership@jkkniu.edu.bd',
                phone: '+880-1712-345679'
              },
              {
                department: 'Publications & Communications',
                contact: 'Prof. Fatima Ahmed',
                email: 'publications@jkkniu.edu.bd',
                phone: '+880-1712-345680'
              },
              {
                department: 'Events & Workshops',
                contact: 'Mr. Arjun Verma',
                email: 'events@jkkniu.edu.bd',
                phone: '+880-1712-345681'
              },
              {
                department: 'Partnerships & Collaborations',
                contact: 'Dr. Karim Hossain',
                email: 'partnerships@jkkniu.edu.bd',
                phone: '+880-1712-345682'
              },
              {
                department: 'Technical Support',
                contact: 'IT Department',
                email: 'support@jkkniu.edu.bd',
                phone: '+880-1712-345683'
              }
            ].map((dept, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-secondary-900 mb-3">{dept.department}</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-semibold text-secondary-900">Contact:</span> {dept.contact}
                  </p>
                  <p>
                    <span className="font-semibold text-secondary-900">Email:</span>{' '}
                    <a href={`mailto:${dept.email}`} className="text-primary-600 hover:text-primary-700">
                      {dept.email}
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold text-secondary-900">Phone:</span>{' '}
                    <a href={`tel:${dept.phone}`} className="text-primary-600 hover:text-primary-700">
                      {dept.phone}
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact