'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import hotel1 from '@/assets/hotel/stay_at_carin1.jpg'
import hotel2 from '@/assets/hotel/stay_at_carin2.jpg'
import hotel3 from '@/assets/hotel/stay_at_carin3.jpg'
import hotel4 from '@/assets/hotel/stay_at_carin4.jpg'
import hotel5 from '@/assets/hotel/stay_at_carin5.jpg'

const slides = [
  { id: 1, title: 'MEETING ROOM', image: hotel1 },
  { id: 2, title: 'BUSINESS AREA', image: hotel2 },
  { id: 3, title: 'CONFERENCE HALL', image: hotel3 },
  { id: 4, title: 'PRIVATE LOUNGE', image: hotel4 },
  { id: 5, title: 'EXECUTIVE SUITE', image: hotel5 },
]

const PrivateEvent = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Hydration-safe responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto Move Carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [currentIndex])

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % slides.length)
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)

  const getDiff = (index: number) => {
    let diff = index - currentIndex
    if (diff < -2) diff += slides.length
    if (diff > 2) diff -= slides.length
    return diff
  }

  const getLayout = (diff: number) => {
    if (isMobile) {
      if (diff === 0) return { left: "0%", width: "100%", height: "100%", top: "0%", opacity: 1, zIndex: 10 }
      if (diff === 1) return { left: "105%", width: "100%", height: "100%", top: "0%", opacity: 0, zIndex: 9 }
      if (diff === -1) return { left: "-105%", width: "100%", height: "100%", top: "0%", opacity: 0, zIndex: 9 }
      return { left: "105%", width: "100%", height: "100%", top: "0%", opacity: 0, zIndex: 1 }
    } else {
      if (diff === 0) return { left: "0%", width: "63%", height: "100%", top: "0%", opacity: 1, zIndex: 10 }
      if (diff === 1) return { left: "65%", width: "35%", height: "78%", top: "11%", opacity: 1, zIndex: 9 }
      if (diff > 1) return { left: "105%", width: "35%", height: "78%", top: "11%", opacity: 0, zIndex: 8 }
      if (diff < 0) return { left: "-65%", width: "63%", height: "100%", top: "0%", opacity: 0, zIndex: 8 }
    }
  }

  return (
    <section className="relative w-full py-20 lg:py-32 bg-[#FCFBF8] overflow-hidden">
      <div className="px-6 md:px-12 xl:px-24 mx-auto flex flex-col gap-14 lg:gap-20">
        
        {/* Header Content */}
        <div className="max-w-4xl flex flex-col gap-4 md:gap-6">
          <h2 className="text-[#4D2F27] text-2xl md:text-4xl lg:text-[40px] font-medium tracking-wide uppercase">
            Private Event Areas At Cairn Hotel
          </h2>
          <p className="text-[#51615E] text-sm md:text-lg lg:text-xl md:leading-[1.65] leading-snug font-normal md:max-w-6xl">
            Host seamless and productive corporate gatherings in a refined, distraction-free environment
            designed for focus and collaboration. Our meeting spaces are equipped with modern
            presentation facilities, comfortable seating, and adaptable layouts to suit everything from small
            team discussions to larger conferences.
          </p>
        </div>

        {/* Carousel Region */}
        <div className="relative w-full h-[380px] md:h-[500px] lg:h-[550px] z-10 xl:-mr-[10%]">
          {slides.map((slide, index) => {
            const diff = getDiff(index)
            const layout = getLayout(diff)

            return (
              <motion.div
                key={slide.id}
                initial={false}
                animate={layout as any}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
                className="absolute rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer shadow-md"
                onClick={() => {
                  if (diff === 1) handleNext()
                  if (diff === -1) handlePrev()
                }}
                drag={diff === 0 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset }) => {
                  if (offset.x < -50) handleNext()
                  else if (offset.x > 50) handlePrev()
                }}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={diff === 0 || diff === 1}
                />
                
                {/* Subtle dark gradient overlay based on active status */}
                <div 
                  className={`absolute inset-0 transition-colors duration-500 pointer-events-none ${
                    diff === 0 ? 'bg-black/10' : 'bg-black/30'
                  }`} 
                />
                
                {/* Pill Tag Overlay */}
                <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20 pointer-events-none">
                  <div className="px-5 py-2 md:px-6 md:py-[10px] rounded-full border border-white/60 bg-white/20 backdrop-blur-md">
                    <span className="text-white text-xs md:text-sm font-medium tracking-wider uppercase drop-shadow-sm">
                      {slide.title}
                    </span>
                  </div>
                </div>

              </motion.div>
            )
          })}
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center md:justify-start lg:ml-[31%] -mt-6 z-20">
          <div className="flex items-center gap-2 md:gap-3">
            {slides.map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`rounded-full transition-all duration-500 hover:bg-[#483A35]/80 ${
                  i === currentIndex 
                  ? 'w-6 h-1.5 md:w-8 md:h-[6px] bg-[#4D2F27]' 
                  : 'w-1.5 h-1.5 md:w-[6px] md:h-[6px] bg-[#D1D1D1]'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default PrivateEvent