import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageCarouselProps {
  images: string[];
  autoplay?: boolean;
  interval?: number;
  showThumbnails?: boolean;
  className?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  autoplay = false,
  interval = 3000,
  showThumbnails = false,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Handle autoplay
  useEffect(() => {
    if (!autoplay || isHovering || images.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoplay, interval, images.length, isHovering]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  return (
    <div 
      className={`relative rounded-lg overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative aspect-[16/9] w-full bg-primary-100">
        <AnimatePresence initial={false} custom={1}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="absolute inset-0 w-full h-full object-cover"
            custom={1}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
        
        {/* Navigation arrows - only show on hover or for touch devices */}
        {images.length > 1 && (
          <>
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-1.5 shadow-md opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity group-hover:opacity-100 sm:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-primary-800">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-1.5 shadow-md opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity group-hover:opacity-100 sm:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-primary-800">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
        
        {/* Dot indicators */}
        {images.length > 1 && !showThumbnails && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Thumbnails */}
      {showThumbnails && images.length > 1 && (
        <div className="flex mt-2 space-x-2 overflow-x-auto scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              className={`flex-shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition-colors ${
                index === currentIndex ? 'border-accent-500' : 'border-transparent'
              }`}
              onClick={() => goToSlide(index)}
            >
              <img
                src={image}
                alt={`Thumbnail ${index}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;