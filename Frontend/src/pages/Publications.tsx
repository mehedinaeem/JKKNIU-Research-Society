// Imports commented out - Coming Soon

const Publications = () => {
  // Publications data commented out - Coming Soon
  /*
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
  */

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

      {/* Coming Soon Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-28 h-28 mb-8 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                <span className="text-6xl">📚</span>
              </div>
              <h2 className="text-3xl font-bold text-secondary-800 mb-4">Coming Soon</h2>
              <p className="text-secondary-600 max-w-lg text-lg">
                We're working on compiling our research publications and academic papers.
                Stay tuned for our comprehensive publication database!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Publications