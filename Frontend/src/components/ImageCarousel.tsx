import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselImage {
  src: string
  alt: string
  title?: string
}

interface ImageCarouselProps {
  images: CarouselImage[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showThumbnails?: boolean
}

const ImageCarousel = ({
  images,
  autoPlay = true,
  autoPlayInterval = 5000,
  showThumbnails = true
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isAutoPlaying, images.length, autoPlayInterval])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    // Resume autoplay after 10 seconds of no interaction
    setTimeout(() => setIsAutoPlaying(autoPlay), 10000)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(autoPlay), 10000)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(autoPlay), 10000)
  }

  return (
    <div className="w-full">
      {/* Enhanced background with gradient */}
      <div className="relative w-full overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 rounded-2xl p-4 md:p-8">
        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-200 rounded-full opacity-10 -mr-40 -mt-40"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary-200 rounded-full opacity-10 -ml-36 -mb-36"></div>
        
        {/* Main carousel */}
        <div className="relative z-10 bg-white rounded-xl overflow-hidden group shadow-lg">
          {/* Main carousel container */}
          <div className="relative w-full h-64 md:h-80 lg:h-96">
          {/* Images */}
          <div className="relative w-full h-full">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-50 hover:bg-opacity-75 text-black p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-50 hover:bg-opacity-75 text-black p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Slide indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white w-8'
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75 w-3'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnails */}
        {showThumbnails && images.length > 1 && (
          <div className="flex gap-2 p-4 bg-secondary-50 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 h-20 w-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  index === currentIndex
                    ? 'border-primary-600'
                    : 'border-secondary-300 opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default ImageCarousel
