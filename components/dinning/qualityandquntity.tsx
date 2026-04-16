"use client"

import React, { useState, useEffect } from 'react'
import discover from '@/assets/dining/quality-1.jpg'
import taste from '@/assets/dining/quality-2.jpg'
import flavors from '@/assets/dining/quality-3.jpg'
import Image, { StaticImageData } from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface CardData {
  id: number
  image: StaticImageData
  tag: string
  subtitle: string
  title: string
}

const QualityAndQuantity = () => {
  const cards: CardData[] = [
    {
      id: 1,
      image: discover,
      tag: "• FEATURED •",
      subtitle: "SIGNATURE DISHES",
      title: "Discover our chef's creations"
    },
    {
      id: 2,
      image: taste,
      tag: "• FEATURED •",
      subtitle: "GOURMET EXPERIENCE",
      title: "A taste of refined dining"
    },
    {
      id: 3,
      image: flavors,
      tag: "• FEATURED •",
      subtitle: "SEASONAL MENU",
      title: "Flavors inspired by the season"
    }
  ]

  return (
    <section className="w-full bg-white py-10 md:py-24 px-2 md:px-8">
      <div className="px-[5%] flex flex-col">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-start md:mb-20 mb-10 gap-10">
          <div className="md:max-w-3xl">
            <p className="text-sm md:text-lg  uppercase  md:tracking-[0.25em] font-medium md:mb-3 mb-2 text-[#1a1a1a]">QUALITY & QUANTITY</p>
            <h2 className="text-2xl md:text-[4.4rem] font-semibold leading-[1.05] text-[#1a1a1a] tracking-tight">
              Experience <br className='hidden md:block'/> Comfort in <br className='hidden md:block'/> Every Detail
            </h2>
          </div>
          <div className="md:max-w-xl md:pb-2">
            <p className="text-[#a3a3a3] text-sm md:text-3xl font-light leading-[1.6]">
              A comfortable and peaceful stay with simple interiors and essential amenities. Simple, clean spaces with all the basic comforts for a pleasant stay.
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-x-12 gap-y-16">
          {cards.map((card) => (
            <HoverCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}

const HoverCard = ({ card }: { card: CardData }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const active = isHovered || isMobile

  return (
    <div 
      className="flex flex-col items-center relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#4A3B32] text-white/80 text-xs sm:text-xs font-light md:font-semibold tracking-[0.2em] px-4 md:px-6 py-1 md:py-2 rounded-xl z-40 shadow-md">
          {card.tag}
        </div>
      {/* Image Container */}
      <div className="w-full aspect-[3/4] relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.1)] transition-transform duration-500 ease-out hover:-translate-y-2 cursor-pointer">
        <Image 
          src={card.image} 
          alt={card.title} 
          fill 
          className="object-cover transition-transform duration-800 hover:scale-105" 
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        
        {/* Dark Gradient Overlay for text readability */}
        <AnimatePresence>
          {active && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.3 }}
               className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent z-10"
             />
          )}
        </AnimatePresence>
        
        {/* Top Tag */}
        

        {/* Text Area (Reveals on Hover) */}
        <div className="absolute bottom-12 left-0 w-full flex flex-col items-center justify-center text-center px-4 z-20 pointer-events-none">
          <AnimatePresence>
            {active && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center w-full"
              >
                <p className="text-[#d8d8d8] text-[10px] sm:text-xs uppercase tracking-[0.25em] mb-2 font-medium drop-shadow-md">
                  {card.subtitle}
                </p>
                <p className="text-white text-lg sm:text-[22px] font-medium tracking-wide drop-shadow-lg">
                  {card.title}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Plus Button - Overlapping the bottom edge */}
      <motion.button 
        className="w-14 h-14 rounded-full bg-[#FFFBF0] text-[#1a1a1a] shadow-xl flex items-center justify-center -mt-7 z-30 relative cursor-pointer"
        whileHover={{ scale: 1.1 }}
        animate={{ rotate: active ? 135 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </motion.button>
    </div>
  )
}

export default QualityAndQuantity