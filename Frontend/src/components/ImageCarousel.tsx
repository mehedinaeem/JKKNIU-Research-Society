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

  if (images.length === 0) return null

  return (
    <div className="w-full">
      {/* Enhanced background with gradient - Full width */}
      <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-200 rounded-full opacity-10 -mr-40 -mt-40"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary-200 rounded-full opacity-10 -ml-36 -mb-36"></div>
        
        {/* Main carousel container */}
        <div className="relative z-10 py-4 md:py-8">
          <div className="bg-white rounded-none md:rounded-xl overflow-hidden shadow-2xl">
            {/* Main image display area */}
            <div className="relative w-full bg-secondary-900">
              {/* Responsive height container */}
              <div className="relative w-full pb-[56.25%]">
                <img
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                />
                {/* Left arrow */}
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-70 hover:bg-opacity-100 text-secondary-900 p-3 rounded-full shadow-lg transition-all duration-200"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={28} />
                </button>
                {/* Right arrow */}
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-70 hover:bg-opacity-100 text-secondary-900 p-3 rounded-full shadow-lg transition-all duration-200"
                  aria-label="Next image"
                >
                  <ChevronRight size={28} />
                </button>
              </div>

              {/* Dark bottom bar with indicators and counter */}
              <div className="bg-gradient-to-r from-secondary-900 to-secondary-800 px-6 py-4 flex items-center justify-between">
                <div className="text-white text-sm font-semibold">
                  {currentIndex + 1} / {images.length}
                </div>
                <div className="flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'bg-white w-8'
                          : 'bg-white bg-opacity-40 hover:bg-opacity-60 w-2'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageCarousel

