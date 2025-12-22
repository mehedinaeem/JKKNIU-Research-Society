import { Mail, Phone, ExternalLink } from 'lucide-react'

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Md. Arif Hasan',
      title: 'President',
      specialty: 'Research Leadership & Organization',
      department: 'Executive Committee',
      email: 'arif.hasan@jkkniu.edu.bd',
      phone: '+880-1712-345678',
      linkedin: '#',
      bio: 'President of JKKNIU Research Society, leading the organization and overseeing all research initiatives.',
      image: '👨‍💼'
    },
    {
      id: 2,
      name: 'Fatima Akter Mim',
      title: 'Vice President',
      specialty: 'Research Administration & Events',
      department: 'Executive Committee',
      email: 'fatima.mim@jkkniu.edu.bd',
      phone: '+880-1712-345679',
      linkedin: '#',
      bio: 'Vice President managing research operations and organizing society events and workshops.',
      image: '👩‍💼'
    },
    {
      id: 3,
      name: 'Karim Ahmed',
      title: 'General Secretary',
      specialty: 'Communication & Documentation',
      department: 'Executive Committee',
      email: 'karim.ahmed@jkkniu.edu.bd',
      phone: '+880-1712-345680',
      linkedin: '#',
      bio: 'General Secretary handling all communications, documentation, and official correspondence.',
      image: '👨‍💻'
    },
    {
      id: 4,
      name: 'Ayesha Khan',
      title: 'Treasurer',
      specialty: 'Financial Management',
      department: 'Executive Committee',
      email: 'ayesha.khan@jkkniu.edu.bd',
      phone: '+880-1712-345681',
      linkedin: '#',
      bio: 'Treasurer managing all financial matters and resource allocation for the society.',
      image: '👩‍💻'
    },
    {
      id: 5,
      name: 'Md. Tanzim Hasan',
      title: 'Research Coordinator',
      specialty: 'Research Project Management',
      department: 'Executive Committee',
      email: 'tanzim.hasan@jkkniu.edu.bd',
      phone: '+880-1712-345682',
      linkedin: '#',
      bio: 'Research Coordinator overseeing research projects and ensuring quality standards.',
      image: '👨‍🔬'
    },
    {
      id: 6,
      name: 'Nadia Akter',
      title: 'Events Coordinator',
      specialty: 'Event Organization & Outreach',
      department: 'Executive Committee',
      email: 'nadia.akter@jkkniu.edu.bd',
      phone: '+880-1712-345683',
      linkedin: '#',
      bio: 'Events Coordinator organizing seminars, workshops, and networking events.',
      image: '👩‍🎓'
    }
  ]

  const departments = [
    {
      name: 'Computer Science',
      members: ['Dr. Mohammad Rahman', 'Prof. Fatima Ahmed'],
      focusAreas: ['AI & ML', 'Data Science', 'Software Engineering']
    },
    {
      name: 'Environmental Studies',
      members: ['Dr. Karim Hossain'],
      focusAreas: ['Climate Research', 'Biodiversity', 'Sustainability']
    },
    {
      name: 'Life Sciences',
      members: ['Dr. Ayesha Islam'],
      focusAreas: ['Biotechnology', 'Genetics', 'Bioinformatics']
    },
    {
      name: 'Social Sciences',
      members: ['Prof. Nadia Chowdhury'],
      focusAreas: ['Education', 'Sociology', 'Cultural Studies']
    },
    {
      name: 'Engineering',
      members: ['Dr. Tanvir Ahmed'],
      focusAreas: ['Renewable Energy', 'IoT', 'Manufacturing']
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
              Our Team
            </h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Meet the dedicated researchers, scholars, and professionals who make JKKNIU Research Society a center of excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Executive Committee</h2>
            <p className="text-lg text-secondary-600">
              Student leaders and officers managing the research society
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white border border-secondary-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="text-5xl">{member.image}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-secondary-900">{member.name}</h3>
                    <p className="text-primary-600 font-semibold">{member.title}</p>
                    <p className="text-secondary-600 text-sm">{member.specialty}</p>
                  </div>
                </div>
                <p className="text-secondary-600 text-sm mb-4">{member.bio}</p>
                <div className="flex items-center space-x-3 text-sm">
                  <a href={`mailto:${member.email}`} className="flex items-center text-primary-600 hover:text-primary-700">
                    <Mail size={16} className="mr-1" />
                    Email
                  </a>
                  <a href={`tel:${member.phone}`} className="flex items-center text-primary-600 hover:text-primary-700">
                    <Phone size={16} className="mr-1" />
                    Call
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Departments */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Research Departments</h2>
            <p className="text-lg text-secondary-600">
              Organized research groups across multiple disciplines
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <div key={index} className="bg-white border border-secondary-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-secondary-900 mb-3">{dept.name}</h3>
                <div className="mb-4">
                  <h4 className="font-semibold text-secondary-800 mb-2 text-sm">Team Members:</h4>
                  <ul className="space-y-1">
                    {dept.members.map((member, idx) => (
                      <li key={idx} className="text-secondary-600 text-sm flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                        {member}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-800 mb-2 text-sm">Focus Areas:</h4>
                  <div className="flex flex-wrap gap-1">
                    {dept.focusAreas.map((area, idx) => (
                      <span key={idx} className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-xs font-medium">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            We're always looking for talented researchers, professionals, and support staff
            to join our growing team. Check out current openings.
          </p>
          <a
            href="#"
            className="inline-flex items-center bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            View Careers <ExternalLink className="ml-2" size={20} />
          </a>
        </div>
      </section>
    </div>
  )
}

export default Team