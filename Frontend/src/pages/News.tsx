import { Bell } from 'lucide-react'

const News = () => {
  const news = [
    {
      id: 1,
      title: 'JKKNIU Research Society Receives National Research Excellence Award',
      date: 'December 20, 2024',
      category: 'Award',
      featured: true,
      excerpt: 'The society was recognized for outstanding contributions to research and innovation at the national level.',
      content: 'JKKNIU Research Society proudly announces the receipt of the National Research Excellence Award. This prestigious recognition honors our collective efforts in advancing research quality and producing impactful publications. The award acknowledges the dedication of our researchers, faculty, and students.',
      image: '🏆',
      tags: ['Award', 'Achievement', 'Recognition']
    },
    {
      id: 2,
      title: 'New Partnership with Stanford University Biotechnology Lab',
      date: 'December 15, 2024',
      category: 'Partnership',
      featured: true,
      excerpt: 'Collaborative research initiative in biotechnology and genetic engineering kicks off this month.',
      content: 'We are delighted to announce a new strategic partnership with Stanford University\'s renowned Biotechnology Laboratory. This collaboration will facilitate joint research projects, student exchanges, and knowledge sharing in cutting-edge biotechnology research.',
      image: '🤝',
      tags: ['Partnership', 'Collaboration', 'International']
    },
    {
      id: 3,
      title: 'Call for Research Proposals: AI and Social Good',
      date: 'December 10, 2024',
      category: 'Call for Submissions',
      featured: false,
      excerpt: 'JKKNIU invites research proposals focusing on AI applications for addressing social challenges.',
      content: 'We are soliciting research proposals for a new initiative on "AI and Social Good." The program aims to fund research projects that use artificial intelligence to address pressing societal challenges. Deadline for submissions: January 31, 2025.',
      image: '📢',
      tags: ['Call for Proposals', 'Funding', 'AI']
    },
    {
      id: 4,
      title: 'Dr. Ayesha Islam Elected as Fellow of International Academy of Sciences',
      date: 'December 5, 2024',
      category: 'Achievement',
      featured: false,
      excerpt: 'Recognition of Dr. Islam\'s outstanding contributions to biotechnology research.',
      content: 'We congratulate Dr. Ayesha Islam on being elected as a Fellow of the International Academy of Sciences. This honor recognizes her significant contributions to biotechnology research and her role in advancing the field globally.',
      image: '👩‍🎓',
      tags: ['Achievement', 'Recognition', 'Faculty']
    },
    {
      id: 5,
      title: 'International Conference on AI Research 2025 - Early Bird Registration Open',
      date: 'November 28, 2024',
      category: 'Announcement',
      featured: false,
      excerpt: 'Register early and save 30% on conference attendance fees.',
      content: 'Early bird registration is now open for the International Conference on AI Research 2025. Get 30% discount on conference fees when you register before January 15, 2025. Limited slots available!',
      image: '📅',
      tags: ['Conference', 'Registration', 'Event']
    },
    {
      id: 6,
      title: 'New Research Lab Opens: Quantum Computing Facility',
      date: 'November 20, 2024',
      category: 'Infrastructure',
      featured: false,
      excerpt: 'State-of-the-art quantum computing research facility now operational.',
      content: 'JKKNIU has inaugurated its new Quantum Computing Research Facility. This cutting-edge lab is equipped with advanced quantum computing systems and will serve as a hub for quantum research in Bangladesh.',
      image: '🖥️',
      tags: ['Infrastructure', 'Technology', 'Quantum']
    },
    {
      id: 7,
      title: 'Student Research Grant Program: Now Accepting Applications',
      date: 'November 15, 2024',
      category: 'Opportunity',
      featured: false,
      excerpt: 'Up to 50 students will receive research grants for their projects.',
      content: 'The JKKNIU Research Society is pleased to announce the annual Student Research Grant Program. We are providing grants up to BDT 100,000 for undergraduate and graduate student research projects. Application deadline: December 31, 2024.',
      image: '💰',
      tags: ['Grants', 'Opportunity', 'Students']
    },
    {
      id: 8,
      title: 'Sustainability Symposium Highlights Green Research Initiatives',
      date: 'November 10, 2024',
      category: 'Event Recap',
      featured: false,
      excerpt: 'Over 200 participants attended the symposium on sustainable research practices.',
      content: 'The Sustainability Symposium brought together researchers from diverse fields to discuss green initiatives and sustainable research practices. The event featured keynote speeches, panel discussions, and networking opportunities.',
      image: '🌱',
      tags: ['Sustainability', 'Event', 'Green']
    }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Award': return 'bg-yellow-100 text-yellow-800'
      case 'Partnership': return 'bg-green-100 text-green-800'
      case 'Call for Submissions': return 'bg-blue-100 text-blue-800'
      case 'Achievement': return 'bg-purple-100 text-purple-800'
      case 'Announcement': return 'bg-red-100 text-red-800'
      case 'Infrastructure': return 'bg-indigo-100 text-indigo-800'
      case 'Opportunity': return 'bg-cyan-100 text-cyan-800'
      case 'Event Recap': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const featuredNews = news.filter(n => n.featured)
  const otherNews = news.filter(n => !n.featured)

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
              News & Announcements
            </h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Stay informed with the latest updates from JKKNIU Research Society,
              including announcements, achievements, partnerships, and opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Featured News */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-2">Featured Stories</h2>
            <p className="text-lg text-secondary-600">
              Latest highlights and major announcements
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredNews.map((item, index) => (
              <div
                key={item.id}
                className={`${
                  index === 0 ? 'lg:col-span-2' : ''
                } bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg p-8 border border-secondary-200 hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{item.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                      <span className="text-secondary-500 text-sm">{item.date}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-secondary-900 mb-3">{item.title}</h3>
                    <p className="text-secondary-600 mb-4">{item.content}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, idx) => (
                        <span key={idx} className="bg-white text-secondary-600 px-2 py-1 rounded text-xs border border-secondary-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a href="#" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mt-4">
                      Read More →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All News */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-2">All News</h2>
            <p className="text-lg text-secondary-600">
              Browse all announcements and news updates
            </p>
          </div>

          <div className="space-y-6">
            {otherNews.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow border border-secondary-100">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="text-3xl flex-shrink-0">{item.image}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                          {item.category}
                        </span>
                        <span className="text-secondary-500 text-sm">{item.date}</span>
                      </div>
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">{item.title}</h3>
                      <p className="text-secondary-600 text-sm mb-3">{item.excerpt}</p>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag, idx) => (
                          <span key={idx} className="bg-secondary-100 text-secondary-600 px-2 py-0.5 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <a href="#" className="text-primary-600 hover:text-primary-700 font-medium whitespace-nowrap text-sm">
                    Read →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Bell className="text-primary-600 mx-auto mb-4" size={40} />
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">Don't Miss Updates</h2>
          <p className="text-lg text-secondary-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest news, announcements, and opportunities
            directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:border-primary-600"
            />
            <button className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="text-secondary-500 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  )
}

export default News