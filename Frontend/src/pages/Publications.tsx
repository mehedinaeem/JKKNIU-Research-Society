import { BookOpen, Quote, ExternalLink, Download } from 'lucide-react'

const Publications = () => {
  const publications = [
    {
      id: 1,
      title: 'Deep Learning Applications in Medical Image Analysis: A Comprehensive Review',
      authors: 'Dr. Mohammad Rahman, Prof. Ahmed Hassan, Dr. Fatima Ahmed',
      journal: 'IEEE Transactions on Medical Imaging',
      year: 2024,
      volume: 43,
      pages: '1234-1256',
      abstract: 'This paper provides a comprehensive review of deep learning applications in medical imaging with focus on convolutional neural networks and their clinical applications.',
      citations: 45,
      doi: '10.1109/TMI.2024.1234567',
      keywords: ['Deep Learning', 'Medical Imaging', 'CNN', 'Healthcare'],
      type: 'Journal Article'
    },
    {
      id: 2,
      title: 'Sustainable Development Framework for Urban Green Spaces: A Case Study of Dhaka',
      authors: 'Prof. Nadia Chowdhury, Dr. Karim Hossain, Dr. Ayesha Islam',
      journal: 'Journal of Sustainable Development',
      year: 2024,
      volume: 17,
      pages: '234-251',
      abstract: 'This study proposes a comprehensive framework for sustainable urban green space development, with case studies from major cities in Bangladesh.',
      citations: 28,
      doi: '10.1016/j.jsd.2024.234567',
      keywords: ['Sustainability', 'Urban Planning', 'Green Spaces', 'Development'],
      type: 'Journal Article'
    },
    {
      id: 3,
      title: 'Machine Learning Algorithms for Crop Yield Prediction',
      authors: 'Dr. Tanvir Ahmed, Prof. Fatima Ahmed, Dr. Rahman',
      journal: 'Computers and Agriculture',
      year: 2023,
      volume: 15,
      pages: '156-174',
      abstract: 'Application of machine learning techniques for predicting crop yield based on environmental and agricultural parameters.',
      citations: 62,
      doi: '10.1016/j.ca.2023.156789',
      keywords: ['Machine Learning', 'Agriculture', 'Prediction', 'IoT'],
      type: 'Journal Article'
    },
    {
      id: 4,
      title: 'Proceedings of International Conference on Artificial Intelligence and Society',
      authors: 'JKKNIU Research Society (Editors)',
      journal: 'Conference Proceedings',
      year: 2024,
      volume: 1,
      pages: '1-450',
      abstract: 'Comprehensive proceedings from the International Conference on AI and Society including 50+ research papers from leading researchers.',
      citations: 15,
      doi: '10.1145/3567890.1234567',
      keywords: ['AI', 'Society', 'Ethics', 'Innovation'],
      type: 'Conference Proceedings'
    },
    {
      id: 5,
      title: 'Renewable Energy Systems and Climate Change Mitigation',
      authors: 'Dr. Karim Hossain, Prof. Ahmed Hassan',
      journal: 'Renewable Energy Reviews',
      year: 2023,
      volume: 28,
      pages: '567-590',
      abstract: 'Analysis of renewable energy systems and their potential contribution to climate change mitigation strategies.',
      citations: 38,
      doi: '10.1016/j.rer.2023.567890',
      keywords: ['Renewable Energy', 'Climate Change', 'Sustainability', 'Engineering'],
      type: 'Journal Article'
    },
    {
      id: 6,
      title: 'Biotechnology Applications in Disease Diagnosis and Treatment',
      authors: 'Dr. Ayesha Islam, Prof. Rahman, Dr. Ahmed',
      journal: 'Journal of Biotechnology',
      year: 2023,
      volume: 20,
      pages: '89-112',
      abstract: 'Overview of recent biotechnology advancements in disease diagnosis and therapeutic applications.',
      citations: 52,
      doi: '10.1016/j.jb.2023.89012',
      keywords: ['Biotechnology', 'Medical', 'Diagnosis', 'Treatment'],
      type: 'Journal Article'
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Journal Article': return 'bg-blue-100 text-blue-800'
      case 'Conference Proceedings': return 'bg-green-100 text-green-800'
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
              Publications & Research Papers
            </h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Explore our research outputs across journals, conferences, and academic publications.
              Our researchers are committed to advancing knowledge through rigorous research and peer-reviewed publications.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-12 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">200+</div>
              <div className="text-primary-100">Total Publications</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">15K+</div>
              <div className="text-primary-100">Total Citations</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">45+</div>
              <div className="text-primary-100">International Journals</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">3.5</div>
              <div className="text-primary-100">Average Citation Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Publications List */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Featured Publications</h2>
            <p className="text-lg text-secondary-600">
              Our latest research contributions in peer-reviewed journals and conferences
            </p>
          </div>

          <div className="space-y-8">
            {publications.map((pub) => (
              <div key={pub.id} className="bg-white border border-secondary-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4 mb-4">
                  <BookOpen className="text-primary-600 mt-1 flex-shrink-0" size={24} />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(pub.type)}`}>
                        {pub.type}
                      </span>
                      <span className="text-secondary-500 text-sm">{pub.year}</span>
                      <span className="text-secondary-500 text-sm flex items-center">
                        <Quote size={14} className="inline mr-1" />
                        {pub.citations} citations
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-secondary-900 mb-2">{pub.title}</h3>
                    <p className="text-secondary-600 mb-3">{pub.authors}</p>
                    <p className="text-secondary-500 mb-3">
                      <span className="font-medium">{pub.journal}</span> • Volume {pub.volume} • Pages {pub.pages}
                    </p>
                  </div>
                </div>

                <p className="text-secondary-600 mb-4 text-sm">
                  <span className="font-semibold">Abstract:</span> {pub.abstract}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {pub.keywords.map((keyword, idx) => (
                    <span key={idx} className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-primary-100 text-primary-600 hover:bg-primary-200 font-medium py-2 px-4 rounded transition-colors"
                  >
                    <ExternalLink size={16} />
                    <span>View on Publisher</span>
                  </a>
                  <button className="flex items-center justify-center space-x-2 bg-secondary-100 text-secondary-600 hover:bg-secondary-200 font-medium py-2 px-4 rounded transition-colors">
                    <Download size={16} />
                    <span>Download PDF</span>
                  </button>
                  <span className="text-secondary-500 text-sm flex items-center">
                    DOI: {pub.doi}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Metrics */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Research Impact</h2>
            <p className="text-lg text-secondary-600">
              Our publications reach a global audience and contribute to advancing knowledge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-4xl font-bold text-primary-600 mb-2">92%</h3>
              <p className="text-secondary-600">
                Publications in Top-tier Journals
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-4xl font-bold text-primary-600 mb-2">50+</h3>
              <p className="text-secondary-600">
                International Conference Presentations
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-4xl font-bold text-primary-600 mb-2">15+</h3>
              <p className="text-secondary-600">
                Collaborations with Global Universities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Publication Database */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">Full Publication Database</h2>
          <p className="text-lg text-secondary-600 mb-8">
            Access our complete research database and advanced search tools
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Search Database
            </button>
            <button className="btn-secondary">
              Advanced Filters
            </button>
            <button className="btn-secondary">
              Export Results
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Publications