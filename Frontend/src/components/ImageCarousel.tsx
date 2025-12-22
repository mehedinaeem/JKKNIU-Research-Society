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
  imagesPerSlide?: number
}

const ImageCarousel = ({
  images,
  autoPlay = true,
  autoPlayInterval = 5000,
  imagesPerSlide = 4
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)
  const totalSlides = Math.ceil(images.length / imagesPerSlide)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isAutoPlaying, totalSlides, autoPlayInterval])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(autoPlay), 10000)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(autoPlay), 10000)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(autoPlay), 10000)
  }

  const getVisibleImages = () => {
    const start = currentIndex * imagesPerSlide
    return images.slice(start, start + imagesPerSlide)
  }

  return (
    <div className="w-full">
      {/* Enhanced background with gradient */}
      <div className="relative w-full overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 rounded-2xl p-4 md:p-8">
        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-200 rounded-full opacity-10 -mr-40 -mt-40"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary-200 rounded-full opacity-10 -ml-36 -mb-36"></div>
        
        {/* Main carousel container */}
        <div className="relative z-10">
          {/* Grid of images */}
          <div className="relative bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 p-4">
              {getVisibleImages().map((image, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg aspect-square bg-secondary-100 group"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {image.title && (
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end p-2">
                      <p className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {image.title}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Navigation buttons */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-80 hover:bg-opacity-100 text-secondary-900 p-2 rounded-full shadow-lg transition-all duration-200"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-80 hover:bg-opacity-100 text-secondary-900 p-2 rounded-full shadow-lg transition-all duration-200"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>

            {/* Slide indicators at bottom with dark background */}
            <div className="bg-gradient-to-r from-secondary-900 to-secondary-800 px-4 py-3 flex justify-center gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-white w-8'
                      : 'bg-white bg-opacity-40 hover:bg-opacity-60 w-2'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageCarousel
