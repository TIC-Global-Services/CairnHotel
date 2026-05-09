"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import gamedayImg from '@/assets/hotel/gameday.png'
import shakespeareImg from '@/assets/hotel/shakespeare.png'
import petfriendlyImg from '@/assets/hotel/petfriendly.png'

const packagesMap: Record<string, any> = {
  gameday: {
    title: "Game Day Package",
    image: gamedayImg,
    modalTitle: "Game Day Package details",
    description: "Stay close to the action with The Cairn Hotel's Game Day Package, perfect for guests attending events at Southern Utah University, the Utah Summer Games, tournaments, competitions, or local sporting events. Located less than two miles from SUU and key Cedar City event venues, this package gives guests a comfortable place to land before and after the big day. With late checkout included, you can enjoy a more relaxed morning after cheering on your team.",
    includes: [
      "Overnight accommodations",
      "Late checkout until 1:00 PM",
      "Clear game-day bag",
      "Convenient location less than two miles from SUU",
      "Complimentary bottled water"
    ]
  },
  petfriendly: {
    title: "Pet-Friendly Stay Package",
    image: petfriendlyImg,
    modalTitle: "Pet-Friendly Stay Package details",
    description: "Bring your furry friend along for the adventure. Our pet-friendly package ensures that your pet is treated to the same level of luxury as you are, with special amenities and easy access to outdoor spaces.",
    includes: [
      "Pet-friendly accommodations",
      "Welcome pet treat",
      "Pet bed and bowls provided",
      "Easy access to walking trails",
      "Late checkout until 12:00 PM"
    ]
  },
  shakespeare: {
    title: "Shakespeare Festival Package",
    image: shakespeareImg,
    modalTitle: "Shakespeare Festival Package details",
    description: "Immerse yourself in the world of theater with our exclusive Shakespeare Festival Package. Enjoy premium seating, exclusive behind-the-scenes tours, and luxurious accommodations just minutes from the stage.",
    includes: [
      "Premium festival tickets",
      "Overnight accommodations",
      "Complimentary pre-show dinner",
      "Festival program guide",
      "Late checkout until 12:00 PM"
    ]
  }
}

const PackagesOverview = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  useEffect(() => {
    if (selectedPackage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedPackage]);

  return (
    <section className="w-full py-20 md:py-32 bg-white px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 md:mb-16 gap-6 md:gap-12">
          <h2 className="text-[3rem] md:text-[4rem] font-bold text-black leading-[1] tracking-[-0.03em]">
            Cairn<br/>Packages
          </h2>
          <p className="text-[#4A4A4A] text-[13px] md:text-[15px] font-light max-w-[500px] leading-[1.8]">
            Experience the Cedar City in every season with our exclusive offers for
            adventure, relaxation, indulgence, and unforgettable moments.
          </p>
        </div>
        
        {/* Divider */}
        <div className="w-full h-[1px] bg-black/10 mb-16 md:mb-24"></div>

        {/* Cards Wrapper */}
        <div className="relative flex justify-center items-center h-[480px] md:h-[820px] w-full max-w-[1400px] mx-auto">
          
          {/* Left Card (Game Day) */}
          <div onClick={() => setSelectedPackage('gameday')} className="absolute left-[2%] md:left-0 top-10 md:top-[70px] w-[240px] md:w-[538px] aspect-[538/710] rounded-[2rem] overflow-hidden shadow-2xl -rotate-[12deg] transform-gpu transition-all duration-500 hover:-rotate-6 hover:scale-105 hover:z-20 cursor-pointer group">
            <Image src={gamedayImg} alt="Game Day Package" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end items-center pb-8 px-4 opacity-90 transition-opacity group-hover:opacity-100">
              <h3 className="text-white font-medium text-lg md:text-xl mb-3 text-center tracking-wide">
                Game Day Package
              </h3>
              <button className="text-white text-[10px] md:text-[11px] uppercase tracking-widest px-6 py-2 rounded-full border border-white/60 hover:bg-white hover:text-black transition-colors font-light">
                More Info
              </button>
            </div>
          </div>

          {/* Right Card (Pet Friendly) */}
          <div onClick={() => setSelectedPackage('petfriendly')} className="absolute right-[2%] md:right-0 top-10 md:top-[70px] w-[240px] md:w-[538px] aspect-[538/710] rounded-[2rem] overflow-hidden shadow-2xl rotate-[12deg] transform-gpu transition-all duration-500 hover:rotate-6 hover:scale-105 hover:z-20 cursor-pointer group">
            <Image src={petfriendlyImg} alt="Pet-Friendly Stay Package" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end items-center pb-8 px-4 opacity-90 transition-opacity group-hover:opacity-100">
              <h3 className="text-white font-medium text-lg md:text-xl mb-3 text-center tracking-wide">
                Pet-Friendly Stay Package
              </h3>
              <button className="text-white text-[10px] md:text-[11px] uppercase tracking-widest px-6 py-2 rounded-full border border-white/60 hover:bg-white hover:text-black transition-colors font-light">
                More Info
              </button>
            </div>
          </div>

          {/* Center Card (Shakespeare) */}
          <div onClick={() => setSelectedPackage('shakespeare')} className="absolute z-10 w-[300px] md:w-[538px] aspect-[538/710] rounded-[2rem] overflow-hidden shadow-2xl transform-gpu transition-all duration-500 hover:scale-105 cursor-pointer group">
            <Image src={shakespeareImg} alt="Shakespeare Festival Package" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end items-center pb-10 px-4">
              <h3 className="text-white font-medium text-xl md:text-2xl mb-4 text-center tracking-wide drop-shadow-md">
                Shakespeare Festival Package
              </h3>
              <button className="text-white text-[11px] md:text-[12px] uppercase tracking-widest px-7 py-2.5 rounded-full border border-white/80 hover:bg-white hover:text-black transition-colors font-light">
                More Info
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Modal Overlay */}
      {selectedPackage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12"
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity cursor-pointer" 
            onClick={() => setSelectedPackage(null)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative w-full max-w-[1350px] max-h-[95vh] bg-white rounded-[2.5rem] shadow-2xl overflow-y-auto md:overflow-hidden flex flex-col md:flex-row z-10 animate-in fade-in zoom-in-95 duration-300">
            {/* Close button */}
            <button 
              onClick={() => setSelectedPackage(null)}
              className="absolute top-6 right-6 md:top-8 md:right-8 z-20 w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-black hover:bg-gray-200 hover:scale-105 transition-all"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {/* Left side image */}
            <div className="w-full md:w-[48%] p-6 md:p-12 flex items-center justify-center">
              <div className="relative w-full aspect-[534/660] rounded-[2rem] overflow-hidden shadow-lg">
                <Image 
                  src={packagesMap[selectedPackage].image} 
                  alt={packagesMap[selectedPackage].title} 
                  fill 
                  className="object-cover" 
                />
              </div>
            </div>

            {/* Right side content */}
            <div className="w-full md:w-[52%] p-6 md:p-12 md:pl-0 flex flex-col justify-center">
              <h2 className="text-3xl md:text-5xl font-sans font-medium text-black mb-6 md:mb-8 tracking-tight leading-tight">
                {packagesMap[selectedPackage].modalTitle}
              </h2>
              
              <p className="text-[#4A4A4A] font-light leading-[1.8] text-[15px] md:text-[17px] mb-10 max-w-[650px]">
                {packagesMap[selectedPackage].description}
              </p>

              <h4 className="font-semibold text-black text-[15px] md:text-[17px] mb-6">
                Package includes:
              </h4>

              <div className="flex flex-wrap gap-3 md:gap-4">
                {packagesMap[selectedPackage].includes.map((item: string, i: number) => (
                  <div 
                    key={i}
                    className="bg-[#FFF6E9] px-5 py-3 rounded-full text-[13px] md:text-[14px] text-[#5A4A3A] font-medium"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  )
}

export default PackagesOverview
