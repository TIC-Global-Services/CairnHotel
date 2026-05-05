'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import gamedayImg from '@/assets/hotel/gameday.png'
import shakespeareImg from '@/assets/hotel/shakespeare.png'
import petfriendlyImg from '@/assets/hotel/petfriendly.png'

const packagesData = [
  {
    id: 1,
    image: gamedayImg,
    alt: "Game Day Package",
    title1: "Game Day Package",
    title2: "details",
    desc: "Stay close to the action with The Cairn Hotel's Game Day Package, perfect for guests attending events at Southern Utah University, the Utah Summer Games, tournaments, competitions, or local sporting events. Located less than two miles from SUU and key Cedar City event venues, this package gives guests a comfortable place to land before and after the big day. With late checkout included, you can enjoy a more relaxed morning after cheering on your team.",
    includes: [
      "Overnight accommodations",
      "Late checkout until 1:00 PM",
      "Clear game-day bag",
      "Convenient location less than two miles from SUU",
      "Complimentary bottled water"
    ]
  },
  {
    id: 2,
    image: shakespeareImg,
    alt: "Shakespeare Festival Package",
    title1: "Shakespeare Festival",
    title2: "Package details",
    desc: "Immerse yourself in the magic of live theater with The Cairn Hotel's Shakespeare Festival Package. Perfectly situated for guests attending the renowned Utah Shakespeare Festival and local cultural events. Located just minutes from the main stages in Cedar City, this package offers a refined sanctuary to relax before and after the performances. With late checkout included, you can enjoy a leisurely morning following a spectacular night of arts.",
    includes: [
      "Overnight accommodations",
      "Late checkout until 1:00 PM",
      "Festival welcome amenities",
      "Convenient location near festival venues",
      "Complimentary bottled water"
    ]
  },
  {
    id: 3,
    image: petfriendlyImg,
    alt: "Pet-Friendly Stay Package",
    title1: "Pet-Friendly Stay",
    title2: "Package details",
    desc: "Bring your furry best friend along for the adventure with The Cairn Hotel's Pet-Friendly Stay Package. Surrounded by beautiful trails and outdoor spaces, our hotel is the perfect getaway for you and your pet. Enjoy a comfortable, stress-free stay with special amenities designed just for your companion. With late checkout included, you and your pet can enjoy a relaxed morning before heading out to explore the scenic landscapes.",
    includes: [
      "Overnight accommodations",
      "Late checkout until 1:00 PM",
      "Welcome pet treats and bowls",
      "Access to nearby pet-friendly trails",
      "Complimentary bottled water"
    ]
  }
]

const GameDayPackage = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % packagesData.length)
    }, 5000) // Auto-slides every 5 seconds
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="w-full py-20 md:py-32 bg-[#F6F5F2] overflow-hidden relative">
      {/* Sliding Container */}
      <div 
        className="flex transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{ 
          width: `${packagesData.length * 100}%`,
          transform: `translateX(-${currentIndex * (100 / packagesData.length)}%)` 
        }}
      >
        {packagesData.map((pkg) => (
          <div 
            key={pkg.id} 
            className="shrink-0 px-6 md:px-12"
            style={{ width: `${100 / packagesData.length}%` }}
          >
            <div className="max-w-[1050px] mx-auto flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-20 items-center justify-center">
              
              {/* Left Side: Image */}
              <div className="relative w-full max-w-[380px] md:w-[45%] shrink-0 aspect-[10/13] rounded-[24px] overflow-hidden shadow-sm">
                <Image 
                  src={pkg.image} 
                  alt={pkg.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>

              {/* Right Side: Content */}
              <div className="flex flex-col items-start text-left md:w-[55%] pt-4 md:pt-0">
                <h2 className="text-[2.5rem] md:text-[3.5rem] lg:text-[45px] font-bold text-[#111] mb-5 leading-[1.05] tracking-[-0.03em]">
                  {pkg.title1}<br/>{pkg.title2}
                </h2>
                
                <p className="text-[#3a3a3a] text-[11px] md:text-[12px] font-light leading-[1.8] tracking-[0.01em] mb-8 max-w-[90%]">
                  {pkg.desc}
                </p>

                <h4 className="text-[#111] font-bold text-[10px] md:text-[11px] mb-3 tracking-wide">
                  Package includes:
                </h4>

                <div className="flex flex-wrap gap-2.5 md:gap-3">
                  {pkg.includes.map((item, idx) => (
                    <span key={idx} className="bg-[#FCF8E9] text-[#3a3a3a] px-3.5 py-1.5 rounded-full text-[9px] md:text-[10px] font-medium tracking-[0.01em]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-12 gap-3">
        {packagesData.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === i ? 'bg-[#111] w-6' : 'bg-[#111]/20'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default GameDayPackage
