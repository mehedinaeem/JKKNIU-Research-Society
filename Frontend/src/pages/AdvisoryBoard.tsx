import { BadgeCheck } from 'lucide-react'

const AdvisoryBoard = () => {
  // Board member data commented out - Coming Soon
  /*
  const boardMembers = [
    {
      id: 1,
      name: 'Prof. Dr. Mohammad Jahir Uddin',
      title: 'Chief Advisor',
      affiliation: 'Department of Computer Science & Engineering, JKKNIU',
      expertise: ['Computer Networks', 'Research Mentorship', 'Academic Excellence'],
      bio: 'Prof. Uddin serves as the chief advisor, providing strategic guidance and mentorship to the research society members.',
      image: '👨‍🎓'
    },
    {
      id: 2,
      name: 'Dr. Md. Kamal Uddin',
      title: 'Co-Advisor',
      affiliation: 'Department of Physics, JKKNIU',
      expertise: ['Physics Research', 'Project Supervision', 'Innovation'],
      bio: 'Dr. Kamal Uddin co-advises the society and supports research initiatives across multiple disciplines.',
      image: '👨‍🏫'
    },
    {
      id: 3,
      name: 'Prof. Nasrin Sultana',
      title: 'Advisor',
      affiliation: 'Department of Chemistry, JKKNIU',
      expertise: ['Chemistry', 'Laboratory Management', 'Research Ethics'],
      bio: 'Prof. Sultana provides guidance on chemistry-related research and ensures research ethics compliance.',
      image: '👩‍🎓'
    },
    {
      id: 4,
      name: 'Dr. Md. Habibur Rahman',
      title: 'Advisor',
      affiliation: 'Department of Mathematics, JKKNIU',
      expertise: ['Mathematical Research', 'Data Analysis', 'Problem Solving'],
      bio: 'Dr. Rahman advises on mathematical and analytical research methodologies.',
      image: '👨‍🏫'
    },
    {
      id: 5,
      name: 'Prof. Dr. Hasina Akhtar',
      title: 'Advisor',
      affiliation: 'Department of Biology, JKKNIU',
      expertise: ['Biological Sciences', 'Environmental Research', 'Sustainability'],
      bio: 'Prof. Akhtar leads guidance on biological and environmental research initiatives.',
      image: '👩‍🔬'
    },
    {
      id: 6,
      name: 'Dr. Md. Saiful Islam',
      title: 'Advisor',
      affiliation: 'Department of Engineering, JKKNIU',
      expertise: ['Engineering Innovation', 'Project Development', 'Technical Support'],
      bio: 'Dr. Islam provides technical expertise and supports engineering-focused research projects.',
      image: '👨‍💼'
    }
  ]
  */

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
              Advisory Board
            </h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Our advisory board comprises distinguished researchers, academics, and leaders
              from prestigious institutions worldwide, guiding our research direction and strategic initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Board Members - Coming Soon */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Board Members</h2>
            <p className="text-lg text-secondary-600 mb-12">
              Meet the distinguished leaders guiding our research excellence
            </p>

            {/* Coming Soon Message */}
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                <span className="text-5xl">👨‍🎓</span>
              </div>
              <h3 className="text-2xl font-bold text-secondary-800 mb-3">Coming Soon</h3>
              <p className="text-secondary-600 max-w-md">
                We're working on introducing our distinguished advisory board members. Stay tuned for updates!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Role & Responsibilities */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Board Responsibilities</h2>
            <p className="text-lg text-secondary-600">
              Key functions and contributions of our advisory board
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <BadgeCheck className="text-primary-600 flex-shrink-0" size={24} />
                <h3 className="text-xl font-semibold text-secondary-900">Research Direction</h3>
              </div>
              <p className="text-secondary-600">
                Provide strategic guidance on research priorities, emerging areas, and long-term research vision to ensure our work remains cutting-edge and impactful.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <BadgeCheck className="text-primary-600 flex-shrink-0" size={24} />
                <h3 className="text-xl font-semibold text-secondary-900">Quality Assurance</h3>
              </div>
              <p className="text-secondary-600">
                Review research methodologies, publications, and outcomes to maintain high standards of academic excellence and research integrity.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <BadgeCheck className="text-primary-600 flex-shrink-0" size={24} />
                <h3 className="text-xl font-semibold text-secondary-900">International Collaboration</h3>
              </div>
              <p className="text-secondary-600">
                Facilitate partnerships with international institutions, enhance research visibility, and expand opportunities for global collaboration.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <BadgeCheck className="text-primary-600 flex-shrink-0" size={24} />
                <h3 className="text-xl font-semibold text-secondary-900">Funding & Resources</h3>
              </div>
              <p className="text-secondary-600">
                Advise on securing research funding, grant writing strategies, and optimal resource allocation for maximum research impact.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <BadgeCheck className="text-primary-600 flex-shrink-0" size={24} />
                <h3 className="text-xl font-semibold text-secondary-900">Mentorship</h3>
              </div>
              <p className="text-secondary-600">
                Mentor early-career researchers and provide guidance on professional development, research ethics, and career advancement.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <BadgeCheck className="text-primary-600 flex-shrink-0" size={24} />
                <h3 className="text-xl font-semibold text-secondary-900">Policy & Advocacy</h3>
              </div>
              <p className="text-secondary-600">
                Contribute to research policy discussions and advocate for research-friendly policies at institutional and national levels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meeting Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">Board Meetings</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-secondary-900 mb-2">Regular Meetings</h3>
                  <p className="text-secondary-600 mb-2">
                    The advisory board meets <strong>quarterly</strong> to discuss research initiatives, review progress, and plan strategic directions.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 mb-2">Special Sessions</h3>
                  <p className="text-secondary-600 mb-2">
                    Additional meetings are organized for specific topics such as grant reviews, research proposals, and major institutional decisions.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 mb-2">Annual Retreat</h3>
                  <p className="text-secondary-600">
                    We host an annual retreat for in-depth discussions on long-term strategy, emerging research trends, and future opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Board */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">Interested in Joining?</h2>
          <p className="text-lg text-secondary-600 mb-8 max-w-2xl mx-auto">
            We are always seeking distinguished researchers and leaders to join our advisory board.
            If you are interested in contributing to our research mission, we'd like to hear from you.
          </p>
          <a
            href="mailto:research@jkkniu.edu.bd"
            className="btn-primary"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  )
}

export default AdvisoryBoard