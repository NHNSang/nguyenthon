'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const images = [
  {
    src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1200',
    alt: 'Modern Architecture Building'
  },
  {
    src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200',
    alt: 'Architectural Design'
  },
  {
    src: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1200',
    alt: 'Construction Site'
  },
  {
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200',
    alt: 'Modern Building Interior'
  }
]

interface ImageCarouselProps {
  onSlideChange?: (index: number) => void;
}

export default function ImageCarousel({ onSlideChange }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % images.length;
        onSlideChange?.(newIndex);
        return newIndex;
      });
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [onSlideChange])

  return (
    <div className="relative h-[200px] md:h-[400px] w-full overflow-hidden rounded-lg shadow-sm shadow-primary">
      <div 
        className="flex h-full w-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="min-w-full">
            <Image
              src={image.src}
              alt={image.alt}
              height={800}
              width={600}
              className="object-cover h-full w-full"
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
      
      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-10 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-primary w-14' : 'bg-white/50'
            }`}
            onClick={() => {
              setCurrentIndex(index);
              onSlideChange?.(index);
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
} 