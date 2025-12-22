import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ImageCarousel from '../components/ImageCarousel'

const Home = () => {
  const carouselImages = [
    {
      src: '/src/pages/media/vc.jpeg',
      alt: 'Vice Chancellor',
      title: 'Leadership & Vision'
    },
    {
      src: '/src/pages/media/advisor1.jpeg',
      alt: 'Advisory Board Member 1',
      title: 'Expert Advisory Board'
    },
    {
      src: '/src/pages/media/advisor2.jpeg',
      alt: 'Advisory Board Member 2',
      title: 'Research Excellence'
    },
    {
      src: '/src/pages/media/advisor3.jpeg',
      alt: 'Advisory Board Member 3',
      title: 'Academic Leadership'
    }
  ]
  const researchAreas = [
    {
      title: 'Computer Science',
      description: 'AI, Machine Learning, Data Science, and Software Engineering',
      icon: '💻'
    },
    {
      title: 'Engineering',
      description: 'Electrical, Mechanical, Civil, and Biomedical Engineering',
      icon: '⚙️'
    },
    {
      title: 'Life Sciences',
      description: 'Biology, Biotechnology, and Environmental Science',
      icon: '🧬'
    },
    {
      title: 'Social Sciences',
      description: 'Psychology, Sociology, and Educational Research',
      icon: '📊'
    }
  ]

  return (
    <div>
      {/* Image Carousel Section */}
      <section className="bg-white py-8">
        <div className="max-w-4xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <ImageCarousel 
            images={carouselImages}
            autoPlay={true}
            autoPlayInterval={5000}
            imagesPerSlide={4}
          />
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 mb-6">
              Advancing Research
              <span className="text-primary-600 block">Excellence</span>
            </h1>
            <p className="text-xl text-secondary-600 mb-8 max-w-3xl mx-auto">
              JKKNIU Research Society fosters innovation, collaboration, and academic excellence
              through cutting-edge research initiatives and interdisciplinary partnerships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/membership" className="btn-primary text-lg px-8 py-4">
                Join the Research Society
                <ArrowRight className="inline ml-2" size={20} />
              </Link>
              <Link to="/about" className="btn-secondary text-lg px-8 py-4">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Our Mission</h2>
            <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
              To create a vibrant research ecosystem that empowers students and faculty to conduct
              groundbreaking research, publish in top-tier journals, and contribute to the advancement
              of knowledge for the betterment of society.
            </p>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Research Areas</h2>
            <p className="text-lg text-secondary-600">
              Explore our diverse research domains and interdisciplinary collaborations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {researchAreas.map((area, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{area.icon}</div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">{area.title}</h3>
                <p className="text-secondary-600">{area.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/research-areas" className="btn-primary">
              View All Research Areas
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary-100">Active Researchers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-primary-100">Publications</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-primary-100">Ongoing Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-primary-100">Partner Institutions</div>
            </div>
          </div>
        </div>
      </section>


    </div>
  )
}

export default Home