import { Cpu, Zap, Leaf, Users, BookOpen, Microscope } from 'lucide-react'

const ResearchAreas = () => {
  const researchAreas = [
    {
      title: 'Artificial Intelligence & Machine Learning',
      icon: <Cpu className="text-primary-600" size={40} />,
      description: 'Exploring neural networks, deep learning, computer vision, and natural language processing for solving complex problems.',
      focus: ['Computer Vision', 'NLP', 'Reinforcement Learning', 'AI Ethics'],
      lead: 'Dr. Mohammad Rahman'
    },
    {
      title: 'Data Science & Analytics',
      icon: <BookOpen className="text-primary-600" size={40} />,
      description: 'Big data analytics, statistical modeling, and predictive analytics for informed decision-making.',
      focus: ['Big Data', 'Statistical Modeling', 'Data Mining', 'Visualization'],
      lead: 'Prof. Fatima Ahmed'
    },
    {
      title: 'Biotechnology & Life Sciences',
      icon: <Microscope className="text-primary-600" size={40} />,
      description: 'Genetic research, bioinformatics, and sustainable biotechnology solutions.',
      focus: ['Genomics', 'Bioinformatics', 'Drug Discovery', 'Sustainable Biotech'],
      lead: 'Dr. Ayesha Islam'
    },
    {
      title: 'Environmental Science',
      icon: <Leaf className="text-primary-600" size={40} />,
      description: 'Climate change research, biodiversity conservation, and sustainable environmental solutions.',
      focus: ['Climate Science', 'Conservation', 'Sustainable Development', 'Ecology'],
      lead: 'Prof. Karim Hossain'
    },
    {
      title: 'Engineering & Technology',
      icon: <Zap className="text-primary-600" size={40} />,
      description: 'Innovative engineering solutions, renewable energy, and smart technologies.',
      focus: ['Renewable Energy', 'IoT', 'Smart Systems', 'Materials Science'],
      lead: 'Dr. Tanvir Ahmed'
    },
    {
      title: 'Social Sciences & Humanities',
      icon: <Users className="text-primary-600" size={40} />,
      description: 'Sociological research, educational studies, and cultural anthropology.',
      focus: ['Education', 'Sociology', 'Cultural Studies', 'Policy Research'],
      lead: 'Prof. Nadia Chowdhury'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
              Research Areas
            </h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Explore our diverse research domains where innovation meets interdisciplinary collaboration.
              Each area represents cutting-edge research that addresses real-world challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Research Areas Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {researchAreas.map((area, index) => (
              <div key={index} className="bg-white border border-secondary-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="flex-shrink-0">
                    {area.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-secondary-900 mb-2">{area.title}</h3>
                    <p className="text-secondary-600 mb-4">{area.description}</p>
                    <p className="text-sm text-secondary-500 mb-4">
                      <span className="font-semibold">Research Lead:</span> {area.lead}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-secondary-900 mb-3">Key Focus Areas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {area.focus.map((focus, focusIndex) => (
                      <span
                        key={focusIndex}
                        className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {focus}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Process */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Our Research Process</h2>
            <p className="text-lg text-secondary-600">
              A systematic approach to conducting high-quality research
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Problem Identification</h3>
              <p className="text-secondary-600">
                Identify research gaps and formulate research questions that address real-world challenges.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Literature Review</h3>
              <p className="text-secondary-600">
                Conduct comprehensive review of existing research and methodologies in the field.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Methodology & Execution</h3>
              <p className="text-secondary-600">
                Design robust methodologies and execute research with rigorous scientific standards.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Publication & Impact</h3>
              <p className="text-secondary-600">
                Publish findings in peer-reviewed journals and translate research into real-world impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Interested in Joining Our Research?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Whether you're a student, faculty member, or external researcher, we welcome collaborations
            across all our research areas. Get in touch to explore opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:research@jkkniu.edu.bd" className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Contact Research Leads
            </a>
            <a href="/membership" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Apply for Membership
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ResearchAreas