import { Users, Target, Award, Globe } from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: <Target className="text-primary-600" size={32} />,
      title: 'Excellence',
      description: 'We strive for the highest standards in research quality and academic integrity.'
    },
    {
      icon: <Users className="text-primary-600" size={32} />,
      title: 'Collaboration',
      description: 'We foster interdisciplinary partnerships and knowledge sharing among researchers.'
    },
    {
      icon: <Award className="text-primary-600" size={32} />,
      title: 'Innovation',
      description: 'We encourage creative thinking and novel approaches to complex problems.'
    },
    {
      icon: <Globe className="text-primary-600" size={32} />,
      title: 'Impact',
      description: 'We aim to create research that makes a meaningful difference in society.'
    }
  ]

  const achievements = [
    'Published over 200 research papers in international journals',
    'Secured 50+ funded research projects',
    'Established partnerships with 25+ institutions worldwide',
    'Organized 100+ research seminars and workshops',
    'Mentored 500+ undergraduate and graduate researchers'
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
              About JKKNIU Research Society
            </h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Established in 2018, we are a vibrant community of researchers, scholars, and students
              dedicated to advancing knowledge through collaborative research and academic excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">Our Mission</h2>
              <p className="text-lg text-secondary-600 mb-6">
                To create a dynamic research environment at Jatiya Kabi Kazi Nazrul Islam University
                that empowers students and faculty to conduct cutting-edge research, publish in
                prestigious journals, and contribute to the global knowledge economy.
              </p>
              <p className="text-lg text-secondary-600">
                We believe that research is not just about generating new knowledge, but also about
                mentoring the next generation of researchers and fostering a culture of inquiry
                and innovation.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">Our Vision</h2>
              <p className="text-lg text-secondary-600 mb-6">
                To be recognized as a leading research society in Bangladesh that produces
                world-class research, nurtures talent, and addresses pressing societal challenges
                through interdisciplinary collaboration.
              </p>
              <p className="text-lg text-secondary-600">
                We envision a future where JKKNIU becomes a hub of innovation and research
                excellence, attracting top talent and making significant contributions to
                Bangladesh's development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-secondary-600">
              The principles that guide our research community and shape our work
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">{value.title}</h3>
                <p className="text-secondary-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Our Achievements</h2>
            <p className="text-lg text-secondary-600">
              Milestones that reflect our commitment to research excellence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-primary-600 rounded-full mt-3"></div>
                <p className="text-secondary-700">{achievement}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6 text-center">Our History</h2>
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="flex-shrink-0 w-24 h-24 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  2018
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-2">Foundation</h3>
                  <p className="text-secondary-600">
                    JKKNIU Research Society was established with 25 founding members, marking the beginning
                    of a new era of research collaboration at the university.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="flex-shrink-0 w-24 h-24 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  2020
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-2">Growth & Recognition</h3>
                  <p className="text-secondary-600">
                    Expanded to over 200 members and received institutional recognition for our contributions
                    to research and academic development.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="flex-shrink-0 w-24 h-24 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  2024
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-2">Present Day</h3>
                  <p className="text-secondary-600">
                    A thriving research community with international partnerships, funded projects,
                    and a reputation for excellence in research and innovation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About