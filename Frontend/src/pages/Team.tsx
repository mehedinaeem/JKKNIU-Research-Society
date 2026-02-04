import { ExternalLink } from 'lucide-react'

const Team = () => {
  // Member data commented out - Coming Soon
  /*
  const committees = {
    '1st': [
      {
        id: 1,
        name: ' ',
        title: 'President',
        specialty: 'Research Leadership',
        department: 'Executive Committee',
        email: 'president@jkkniu.edu.bd',
        phone: '',
        bio: 'Leading the organization and overseeing all research initiatives.',
        image: '/media/team/1st_committee/president.png'
      },
      {
        id: 2,
        name: ' ',
        title: 'Vice President',
        specialty: 'Research Administration',
        department: 'Executive Committee',
        email: 'vp@jkkniu.edu.bd',
        phone: '',
        bio: 'Managing research operations and organizing society events.',
        image: '/media/team/1st_committee/vp.jpg'
      },
      {
        id: 3,
        name: ' ',
        title: 'Communication & External Affairs Executive',
        specialty: 'Communication',
        department: 'Executive Committee',
        email: 'communication@jkkniu.edu.bd',
        phone: '',
        bio: 'Handling external communications and public relations.',
        image: '/media/team/1st_committee/comm_external.png'
      },
      {
        id: 4,
        name: ' ',
        title: 'Organizing Secretary',
        specialty: 'Organization',
        department: 'Executive Committee',
        email: 'org.sec@jkkniu.edu.bd',
        phone: '',
        bio: 'Responsible for organizing events and maintaining records.',
        image: '/media/team/1st_committee/org_sec.png'
      },
      {
        id: 5,
        name: ' ',
        title: 'HR Executive',
        specialty: 'Human Resources',
        department: 'Executive Committee',
        email: 'hr@jkkniu.edu.bd',
        phone: '',
        bio: 'Managing human resources and member relations.',
        image: '/media/team/1st_committee/hr.png'
      }
    ],
    '2nd': [
      { id: 1, name: 'SUMON SHEIKH', title: 'President', specialty: 'Leadership', department: 'Executive Committee', email: '', phone: '', bio: 'President of 2nd Executive Committee', image: '/media/team/2nd_committee/sumon_sheikh.jpg' },
      { id: 2, name: 'MD. ABU ERFAN', title: 'General Secretary', specialty: 'Administration', department: 'Executive Committee', email: '', phone: '', bio: 'General Secretary of 2nd Executive Committee', image: '/media/team/2nd_committee/abu_erfan.jpg' },
      { id: 3, name: 'NISHAT AZAD CHUA', title: 'Vice President (Internal)', specialty: 'Internal Affairs', department: 'Executive Committee', email: '', phone: '', bio: 'Vice President (Internal)', image: '/media/team/2nd_committee/nishat_azad_chua.jpg' },
      { id: 4, name: 'MD JUNAYETH BHUIYAN', title: 'Vice President (External)', specialty: 'External Affairs', department: 'Executive Committee', email: '', phone: '', bio: 'Vice President (External)', image: '/media/team/2nd_committee/junayeth_bhuiyan.jpg' },
      { id: 5, name: 'LIVA HAQUE', title: 'Joint Secretary', specialty: 'Coordination', department: 'Executive Committee', email: '', phone: '', bio: 'Joint Secretary', image: '/media/team/2nd_committee/liva_haque.jpg' },
      { id: 6, name: 'PRODITY PROMA', title: 'Member', specialty: 'Member', department: 'Executive Committee', email: '', phone: '', bio: 'Executive Committee Member', image: '/media/team/2nd_committee/prodity_proma.jpg' },
      { id: 7, name: 'ABU SAYEM', title: 'Member', specialty: 'Member', department: 'Executive Committee', email: '', phone: '', bio: 'Executive Committee Member', image: '/media/team/2nd_committee/abu_sayem.jpg' },
      { id: 8, name: 'MD MAHFUZUR RAHMAN MAHIM', title: 'Member', specialty: 'Member', department: 'Executive Committee', email: '', phone: '', bio: 'Executive Committee Member', image: '/media/team/2nd_committee/md_mahmud_mahim.jpg' },
      { id: 9, name: 'ALI AHMED', title: 'Member', specialty: 'Member', department: 'Executive Committee', email: '', phone: '', bio: 'Executive Committee Member', image: '/media/team/2nd_committee/ali_ahmed.jpg' },
      { id: 10, name: 'UTSHA PAUL', title: 'Member', specialty: 'Member', department: 'Executive Committee', email: '', phone: '', bio: 'Executive Committee Member', image: '/media/team/2nd_committee/utsha_paul.jpg' }
    ],
    '3rd': [
      { id: 1, name: 'SUMON SHEIKH', title: 'President', specialty: 'Leadership', department: 'Executive Committee', email: '', phone: '', bio: 'President of 3rd Executive Committee', image: '/media/team/3rd_committee/sumon_sheikh.jpg' },
      { id: 2, name: 'MD. ABU ERFAN', title: 'General Secretary', specialty: 'Administration', department: 'Executive Committee', email: '', phone: '', bio: 'General Secretary of 3rd Executive Committee', image: '/media/team/3rd_committee/abu_erfan.jpg' },
      { id: 3, name: 'NISHAT AZAD CHUA', title: 'Vice President (Internal)', specialty: 'Internal Affairs', department: 'Executive Committee', email: '', phone: '', bio: 'Vice President (Internal)', image: '/media/team/3rd_committee/nishat_azad_chua.jpg' },
      { id: 4, name: 'MD JUNAYETH BHUIYAN', title: 'Vice President (External)', specialty: 'External Affairs', department: 'Executive Committee', email: '', phone: '', bio: 'Vice President (External)', image: '/media/team/3rd_committee/junayeth_bhuiyan.jpg' },
      { id: 5, name: 'LIVA HAQUE', title: 'Joint Secretary', specialty: 'Coordination', department: 'Executive Committee', email: '', phone: '', bio: 'Joint Secretary', image: '/media/team/3rd_committee/liva_haque.jpg' },
      { id: 6, name: 'PRODITY PROMA', title: 'Member', specialty: 'Member', department: 'Executive Committee', email: '', phone: '', bio: 'Executive Committee Member', image: '/media/team/3rd_committee/prodity_proma.jpg' },
      { id: 7, name: 'ABU SAYEM', title: 'Member', specialty: 'Member', department: 'Executive Committee', email: '', phone: '', bio: 'Executive Committee Member', image: '/media/team/3rd_committee/abu_sayem.jpg' },
      { id: 8, name: 'MD MAHFUZUR RAHMAN MAHIM', title: 'Member', specialty: 'Member', department: 'Executive Committee', email: '', phone: '', bio: 'Executive Committee Member', image: '/media/team/3rd_committee/md_mahmud_mahim.jpg' },
      { id: 9, name: 'ALI AHMED', title: 'Member', specialty: 'Member', department: 'Executive Committee', email: '', phone: '', bio: 'Executive Committee Member', image: '/media/team/3rd_committee/ali_ahmed.jpg' },
      { id: 10, name: 'UTSHA PAUL', title: 'Member', specialty: 'Member', department: 'Executive Committee', email: '', phone: '', bio: 'Executive Committee Member', image: '/media/team/3rd_committee/utsha_paul.jpg' }
    ],
    '4th': [
      { id: 1, name: 'TBD', title: 'President', image: '👨‍💼', bio: '4th Committee President', email: '', phone: '' },
      { id: 2, name: 'TBD', title: 'General Secretary', image: '👨‍💻', bio: '4th Committee GS', email: '', phone: '' }
    ],
    '5th': [
      { id: 1, name: 'MD. SOJIB', title: 'President', image: '👨‍💼', bio: 'Current President', email: '', phone: '' },
      { id: 2, name: 'TBD', title: 'General Secretary', image: '👨‍💻', bio: 'Current GS', email: '', phone: '' }
    ]
  }
  */

  const departments = [
    {
      name: 'Computer Science',
      // members: ['Dr. Mohammad Rahman', 'Prof. Fatima Ahmed'],
      focusAreas: ['AI & ML', 'Data Science', 'Software Engineering']
    },
    {
      name: 'Environmental Studies',
      // members: ['Dr. Karim Hossain'],
      focusAreas: ['Climate Research', 'Biodiversity', 'Sustainability']
    },
    {
      name: 'Life Sciences',
      // members: ['Dr. Ayesha Islam'],
      focusAreas: ['Biotechnology', 'Genetics', 'Bioinformatics']
    },
    {
      name: 'Social Sciences',
      // members: ['Prof. Nadia Chowdhury'],
      focusAreas: ['Education', 'Sociology', 'Cultural Studies']
    },
    {
      name: 'Engineering',
      // members: ['Dr. Tanvir Ahmed'],
      focusAreas: ['Renewable Energy', 'IoT', 'Manufacturing']
    },
    {
      name: 'Bangla',
      focusAreas: ['Literature', 'Linguistics', 'Cultural Heritage']
    },
    {
      name: 'Statistics',
      focusAreas: ['Data Analysis', 'Research Methodology', 'Applied Statistics']
    },
    {
      name: 'Business Studies',
      focusAreas: ['Management', 'Marketing', 'Entrepreneurship']
    },
    {
      name: 'Arts & Culture',
      focusAreas: ['Visual Arts', 'Performing Arts', 'Cultural Studies']
    }
  ]

  // const committeeKeys = ['5th', '4th', '3rd', '2nd', '1st']

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

      {/* Leadership / Executive Committee */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Executive Committee</h2>
            <p className="text-lg text-secondary-600 mb-12">
              Leading the way year after year
            </p>

            {/* Coming Soon Message */}
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                <span className="text-5xl">👥</span>
              </div>
              <h3 className="text-2xl font-bold text-secondary-800 mb-3">Coming Soon</h3>
              <p className="text-secondary-600 max-w-md">
                We're working on introducing our amazing team members. Stay tuned for updates!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Departments */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Research Departments</h2>
            <p className="text-lg text-secondary-600">
              Organized research groups across multiple disciplines
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <div key={index} className="bg-white border border-secondary-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-secondary-900 mb-4">{dept.name}</h3>
                <div>
                  <h4 className="font-semibold text-secondary-800 mb-2 text-sm">Focus Areas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {dept.focusAreas.map((area, idx) => (
                      <span key={idx} className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-xs font-medium">
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