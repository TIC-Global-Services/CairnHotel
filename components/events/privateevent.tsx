'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

import windsor from '@/assets/events/windsor.png'
import windsorEast from '@/assets/events/windsor_east.png'

const slides = [
  { 
    id: 1, 
    label: 'THE WINDSOR -CAPACITY 75',
    title: 'Our spacious pre-function area is a perfect setting..', 
    image: windsor,
    detail: 'Our spacious pre-function area is a perfect setting for your next meeting, reception, or gathering in Cedar City, Utah, at The Cairn Hotel. Our event team is here to help you with thoughtful planning, creative ideas, and personalized support to make your event or meeting successful.'
  },
  { 
    id: 2, 
    label: 'THE WINDSOR EAST -CAPACITY-57',
    title: 'Host the perfect event', 
    image: windsorEast,
    detail: 'Host the perfect event or corporate meetings in Cedar City at The Cairn Hotel. Our flexible meeting spaces are designed for productive gatherings, featuring modern technology, complimentary Wi-Fi, audiovisual equipment, and a spacious, comfortable setting for your guests.'
  },
  { 
    id: 3, 
    label: 'THE WINDSOR WEST -CAPACITY-18',
    title: 'Whether you are hosting a business meeting..', 
    image: windsorEast,
    detail: 'Whether you are hosting a business meeting, corporate event, or small group gathering, our boardroom offers an ideal setting for a productive and professional experience in Cedar City. This modern meeting space includes Wi-Fi, comfortable seating, and access to off-site catering options to support a seamless event from start to finish'
  },
]

const PrivateEvent = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleNext = () => {
    setExpandedId(null)
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }
  
  const handlePrev = () => {
    setExpandedId(null)
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  // Auto-play logic: 3 second interval
  useEffect(() => {
    // Only auto-play if no card is currently expanded
    if (expandedId !== null) return

    const interval = setInterval(() => {
      handleNext()
    }, 3000)

    return () => clearInterval(interval)
  }, [expandedId, currentIndex]) // Re-run if expandedId or currentIndex changes to reset timer

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
        <div className="relative w-full h-[320px] md:h-[400px] lg:h-[460px] mt-10">
          <div className="relative w-full h-full">
            <AnimatePresence initial={false}>
              {slides.map((slide, index) => {
                const isActive = index === currentIndex
                const isNext = index === (currentIndex + 1) % slides.length
                
                if (!isActive && !isNext) return null

                return (
                  <motion.div
                    key={slide.id}
                    initial={{ 
                      opacity: 0, 
                      x: isNext ? '100%' : '-100%',
                      scale: 0.8
                    }}
                    animate={{ 
                      opacity: isActive ? 1 : 0.6,
                      scale: isActive ? 1 : 0.8,
                      x: isActive ? '0%' : '65%', // Reduced offset for smaller cards
                      zIndex: isActive ? 20 : 10,
                      filter: isActive ? 'blur(0px)' : 'blur(2px)'
                    }}
                    exit={{ 
                      opacity: 0, 
                      x: '-100%',
                      scale: 0.8
                    }}
                    transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                    className={`absolute top-0 left-0 w-[75%] md:w-[60%] lg:w-[58%] h-full cursor-pointer`}
                    onClick={() => {
                      if (isNext) handleNext()
                    }}
                  >
                    {/* Inner wrapper for image clipping */}
                    <div className="relative w-full h-full rounded-[30px] md:rounded-[40px] overflow-hidden shadow-2xl">
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        {/* Main Content */}
                        <AnimatePresence>
                          {expandedId !== slide.id && (isActive || isNext) && (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: isActive ? 1 : 0.4 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-x-0 bottom-12 flex flex-col items-center justify-center p-6 text-center text-white"
                            >
                              <span className="text-[10px] md:text-[11px] font-medium tracking-[0.1em] mb-2 opacity-90 uppercase">
                                {slide.label}
                              </span>
                              <h3 className="text-sm md:text-lg lg:text-[20px] font-medium max-w-xl leading-snug">
                                {slide.title}
                              </h3>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Expandable Overlay */}
                        <AnimatePresence>
                          {expandedId === slide.id && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 bg-[#FEF9E1] z-30 p-8 md:p-12 lg:p-16 flex flex-col items-center justify-center text-center"
                            >
                              <button 
                                onClick={(e) => { e.stopPropagation(); setExpandedId(null); }}
                                className="absolute top-6 right-6 text-[#4D2F27] text-2xl hover:scale-110 transition-transform"
                              >
                                ✕
                              </button>
                              <p className="text-[#4D2F27] text-base md:text-lg lg:text-[22px] font-medium leading-relaxed max-w-3xl">
                                {slide.detail}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                    </div>

                    {/* The Dynamic "+" Button (Outside the overflow-hidden wrapper) */}
                    {(isActive || isNext) && (
                      <motion.button
                        layoutId={`plus-${slide.id}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          if (!isActive) {
                             handleNext()
                             return
                          }
                          setExpandedId(expandedId === slide.id ? null : slide.id)
                        }}
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-[#FEF9E1] rounded-full flex items-center justify-center shadow-xl z-40 transition-all ${!isActive ? 'opacity-0' : 'opacity-100'}`}
                        whileHover={isActive ? { scale: 1.1 } : {}}
                        whileTap={isActive ? { scale: 0.9 } : {}}
                      >
                        <motion.span 
                          animate={{ rotate: expandedId === slide.id ? 45 : 0 }}
                          className="text-[#4D2F27] text-xl md:text-2xl font-light"
                        >
                          +
                        </motion.span>
                      </motion.button>
                    )}
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-12">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'bg-[#4D2F27] scale-125' : 'bg-[#D1D1D1]'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default PrivateEvent