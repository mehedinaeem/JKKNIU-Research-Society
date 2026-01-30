import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ArrowRight, Calendar } from 'lucide-react'
import ResearchAnimation from './ResearchAnimation'

interface CarouselImage {
  src: string
  alt: string
  title?: string
}

interface ImageCarouselProps {
  images: CarouselImage[]
  autoPlay?: boolean
  autoPlayInterval?: number
}

const ImageCarousel = ({
  images,
  autoPlay = true,
  autoPlayInterval = 5000
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)

  useEffect(() => {
    if (!isAutoPlaying || images.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isAutoPlaying, images.length, autoPlayInterval])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(autoPlay), 10000)
  }

  if (images.length === 0) return null

  return (
    <div className="w-full">
      {/* Full-screen hero section */}
      <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
        {/* Main hero container */}
        <div className="relative w-full h-[85vh] min-h-[600px]">
          {/* Background Image */}
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>

          {/* Research Animation Background */}
          <ResearchAnimation />

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
            {/* Main Title - JKKNIU */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white text-center animate-title tracking-wide">
              JKKNIU
            </h1>

            {/* Golden Subtitle - Research Society */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center mt-2 animate-title-delay italic" style={{ color: '#F5A623' }}>
              Research Society
            </h2>

            {/* Tagline */}
            <p className="text-white text-lg md:text-xl mt-6 animate-fade-up font-light tracking-widest text-center">
              Advancing Knowledge & Inspiring Innovation
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-fade-up-delay">
              <Link
                to="/membership"
                className="group flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-secondary-900 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: '#F5A623' }}
              >
                Join Us
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/events"
                className="group flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white border-2 border-white/80 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                Upcoming Events
                <Calendar size={18} />
              </Link>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center animate-bounce-slow">
            <span className="text-white/80 text-sm tracking-widest mb-2">Scroll Down</span>
            <ChevronDown size={24} className="text-white/80" />
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 right-8 z-10 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                  ? 'bg-white scale-125'
                  : 'bg-white/40 hover:bg-white/60'
                  }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageCarousel

