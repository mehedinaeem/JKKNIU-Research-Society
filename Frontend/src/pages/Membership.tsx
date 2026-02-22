import { CheckCircle, Clock, Users, FileText } from 'lucide-react'

const Membership = () => {
  const benefits = [
    {
      icon: <FileText className="text-primary-600" size={32} />,
      title: 'Access to Publications',
      description: 'Read and download research papers and publications from all society members.'
    },
    {
      icon: <Users className="text-primary-600" size={32} />,
      title: 'Networking Opportunities',
      description: 'Connect with researchers, scholars, and professionals across disciplines.'
    },
    {
      icon: <CheckCircle className="text-primary-600" size={32} />,
      title: 'Event Participation',
      description: 'Attend exclusive seminars, workshops, and conferences at member rates.'
    },
    {
      icon: <Clock className="text-primary-600" size={32} />,
      title: 'Research Support',
      description: 'Get mentorship and guidance from experienced researchers in your field.'
    }
  ]

  const membershipTypes = [
    {
      name: 'Student Membership',
      price: '100 BDT',
      duration: '1 year (renewable)',
      requirements: ['Currently enrolled student at JKKNIU', 'Complete membership form', 'Valid university ID'],
      benefits: [
        'Access to research database',
        'Attend society events',
        'Participate in workshops',
        'Networking opportunities',
        'Monthly newsletter'
      ],
      cta: 'Apply Now',
      highlighted: true
    }
  ]

  const steps = [
    {
      number: 1,
      title: 'Complete Application',
      description: 'Fill out the membership application form with your personal and professional information.'
    },
    {
      number: 2,
      title: 'Submit Documents',
      description: 'Provide required documents such as CV, university ID, or proof of affiliation.'
    },
    {
      number: 3,
      title: 'Application Review',
      description: 'Our team reviews your application and verifies your eligibility for membership.'
    },
    {
      number: 4,
      title: 'Payment & Activation',
      description: 'Complete payment (if applicable) and your membership is activated immediately.'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
              Membership
            </h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Join a thriving community of researchers, scholars, and professionals committed to
              advancing knowledge and fostering collaboration across disciplines.
            </p>
          </div>
        </div>
      </section>

      {/* Membership Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Why Join?</h2>
            <p className="text-lg text-secondary-600">
              Membership benefits include access to resources, networking, and professional development opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white border border-secondary-200 rounded-lg p-6 text-center">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">{benefit.title}</h3>
                <p className="text-secondary-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Types */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Membership Types</h2>
            <p className="text-lg text-secondary-600">
              Choose the membership level that best suits your needs and goals
            </p>
          </div>

          <div className="flex justify-center gap-6">
            {membershipTypes.map((membership, index) => (
              <div
                key={index}
                className={`rounded-lg overflow-hidden ${membership.highlighted
                  ? 'border-4 border-primary-600 shadow-xl transform lg:scale-105'
                  : 'border border-secondary-200 shadow-md'
                  } bg-white`}
              >
                <div className={`p-6 ${membership.highlighted ? 'bg-primary-600 text-white' : 'bg-secondary-50'}`}>
                  <h3 className="text-2xl font-bold mb-2">{membership.name}</h3>
                  <div className="text-3xl font-bold mb-1">{membership.price}</div>
                  <p className="text-sm opacity-90">{membership.duration}</p>
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="font-semibold text-secondary-900 mb-3 text-sm">Requirements:</h4>
                    <ul className="space-y-2">
                      {membership.requirements.map((req, idx) => (
                        <li key={idx} className="text-secondary-600 text-sm flex items-start">
                          <CheckCircle size={16} className="text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-secondary-900 mb-3 text-sm">Benefits:</h4>
                    <ul className="space-y-2">
                      {membership.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-secondary-600 text-sm flex items-start">
                          <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <span
                    className="block w-full text-center font-semibold py-3 px-4 rounded bg-gray-300 text-gray-500 cursor-not-allowed"
                  >
                    Recruitment Over
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">How to Apply</h2>
            <p className="text-lg text-secondary-600">
              Simple 4-step process to become a member
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-2">{step.title}</h3>
                  <p className="text-secondary-600 text-sm">{step.description}</p>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block text-3xl text-primary-300 mt-4">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'How long is the membership valid?',
                a: 'All memberships are valid for one year from the date of activation and can be renewed annually.'
              },
              {
                q: 'Can I upgrade my membership type?',
                a: 'Yes, you can upgrade to a higher membership tier anytime. Contact our membership office for details.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept bank transfers, mobile banking, and credit/debit cards. Invoices can be provided for institutional members.'
              },
              {
                q: 'Is there a refund policy for memberships?',
                a: 'Memberships are non-refundable after registration. However, you can request a transfer to another person.'
              },
              {
                q: 'Can I attend events as a non-member?',
                a: 'Some events are open to non-members, but members get priority registration and discounted fees.'
              },
              {
                q: 'How do I renew my membership?',
                a: 'You can renew your membership through our online portal or by contacting our membership office 30 days before expiration.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">{faq.q}</h3>
                <p className="text-secondary-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Take the first step towards becoming part of a vibrant research community.
            Apply for membership today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Start Application
            </button>
            <a
              href="mailto:jkkniurs7@gmail.com"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Membership