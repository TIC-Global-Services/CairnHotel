"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import gamedayImg from '@/assets/hotel/gameday-no-text.png'
import shakespeareImg from '@/assets/hotel/shakespeare-no-text.png'
import petfriendlyImg from '@/assets/hotel/petfriendly-no-text.png'
import gamedayImgText from '@/assets/hotel/gameday.png'
import shakespeareImgText from '@/assets/hotel/shakespeare.png'
import petfriendlyImgText from '@/assets/hotel/petfriendly.png'  

const packagesMap: Record<string, any> = {
  gameday: {
    title: "Game Day Package",
    image: gamedayImg,
    textImage: gamedayImgText,
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
    textImage: petfriendlyImgText,
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
    textImage: shakespeareImgText,
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
    return () => { document.body.style.overflow = ''; };
  }, [selectedPackage]);

  const handleCardClick = (pkg: string) => {
    setSelectedPackage(prev => prev === pkg ? null : pkg);
  };

  return (
    <section className="w-full pt-20 md:pt-32 pb-12 md:pb-32 bg-white px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-center mb-10 md:mb-16 gap-6 md:gap-12">
          <h2 className="text-[3rem] md:text-[4rem] font-bold text-black leading-[1] tracking-[-0.03em] text-center md:text-left">
            Cairn<br/>Packages
          </h2>
          <p className="text-[16px] md:text-[20px] font-normal leading-tight max-w-[700px] text-center md:text-left">
            Experience the Cedar City in every season with our exclusive offers for
            adventure, relaxation, indulgence, and unforgettable moments.
          </p>
        </div>
        
        {/* Divider */}
        <div className="w-full h-[1px] bg-black/10 mb-16 md:mb-24"></div>

        {/* Cards Wrapper */}
        <div className="relative flex justify-center items-center h-[320px] md:h-[820px] w-full max-w-[1400px] mx-auto">

          {/* Left Card (Game Day) */}
          <div onClick={() => handleCardClick('gameday')} className="absolute left-[2%] md:left-0 top-5 md:top-[70px] w-[140px] md:w-[538px] aspect-[538/710] rounded-[2rem] overflow-hidden shadow-2xl -rotate-[12deg] transform-gpu transition-all duration-500 hover:-rotate-6 hover:scale-105 hover:z-20 cursor-pointer group">
            <Image src={gamedayImg} alt="Game Day Package" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end items-center pb-8 px-4 opacity-90 transition-opacity group-hover:opacity-100">
              <h3 className="text-white font-medium text-xs md:text-xl mb-1.5 md:mb-3 text-center tracking-wide">
                Game Day Package
              </h3>
              <button className="text-white text-[10px] md:text-[15px] uppercase tracking-widest px-3 md:px-6 py-1.5 md:py-2 rounded-full border border-white hover:bg-white hover:text-black transition-colors font-normal">
                More Info
              </button>
            </div>
          </div>

          {/* Right Card (Pet Friendly) */}
          <div onClick={() => handleCardClick('petfriendly')} className="absolute right-[2%] md:right-0 top-5 md:top-[70px] w-[140px] md:w-[538px] aspect-[538/710] rounded-[2rem] overflow-hidden shadow-2xl rotate-[12deg] transform-gpu transition-all duration-500 hover:rotate-6 hover:scale-105 hover:z-20 cursor-pointer group">
            <Image src={petfriendlyImg} alt="Pet-Friendly Stay Package" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end items-center pb-8 px-4 opacity-90 transition-opacity group-hover:opacity-100">
              <h3 className="text-white font-medium text-xs md:text-xl mb-1.5 md:mb-3 text-center tracking-wide">
                Pet-Friendly Stay Package
              </h3>
              <button className="text-white text-[10px] md:text-[15px] uppercase tracking-widest px-3 md:px-6 py-1.5 md:py-2 rounded-full border border-white hover:bg-white hover:text-black transition-colors font-normal">
                More Info
              </button>
            </div>
          </div>

          {/* Center Card (Shakespeare) */}
          <div onClick={() => handleCardClick('shakespeare')} className="absolute z-10 -top-4 w-[170px] md:w-[538px] aspect-[538/710] rounded-[2rem] overflow-hidden shadow-2xl transform-gpu transition-all duration-500 hover:scale-105 cursor-pointer group">
            <Image src={shakespeareImg} alt="Shakespeare Festival Package" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end items-center pb-10 px-4">
              <h3 className="text-white font-medium text-sm md:text-2xl mb-2 md:mb-4 text-center tracking-wide drop-shadow-md">
                Shakespeare Festival Package
              </h3>
              <button className="text-white text-[10px] md:text-[15px] uppercase tracking-widest px-4 md:px-7 py-1.5 md:py-2.5 rounded-full border border-white hover:bg-white hover:text-black transition-colors font-normal">
                More Info
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Popup Package Detail */}
      {selectedPackage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPackage(null)}
          />

          {/* Popup Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative bg-white rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh] w-full max-w-[1060px] p-8 md:p-12 z-10"
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedPackage(null)}
              className="absolute top-5 right-5 md:top-6 md:right-6 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-black transition-all z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="flex flex-col md:flex-row gap-8 md:gap-14">

              {/* Left: Image Card */}
              <div className="relative w-full max-w-[340px] aspect-[3/4] rounded-2xl overflow-hidden shadow-md shrink-0 mx-auto md:mx-0">
                <Image
                  src={packagesMap[selectedPackage].textImage}
                  alt={`${packagesMap[selectedPackage].title} Image`}
                  fill
                  className="object-cover"
                  sizes="340px"
                />
              </div>

              {/* Right: Content */}
              <div className="flex-1 flex flex-col justify-center min-w-0">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05, ease: 'easeOut' }}
                >
                  <h2 className="text-2xl md:text-3xl font-normal text-black mb-5 leading-tight tracking-tight">
                    {packagesMap[selectedPackage].modalTitle}
                  </h2>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
                  className="text-[#4A4A4A] font-normal leading-[1.7] text-[15px] md:text-[16px] mb-6"
                >
                  {packagesMap[selectedPackage].description}
                </motion.p>

                <motion.h4
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
                  className="text-xs font-semibold uppercase tracking-wider text-black/50 mb-4"
                >
                  Package includes
                </motion.h4>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
                  className="flex flex-wrap gap-2"
                >
                  {packagesMap[selectedPackage].includes.map((item: string, i: number) => (
                    <div
                      key={i}
                      className="bg-[#FFF7E0] px-3.5 py-1.5 rounded-full text-[11px] md:text-[12px] text-[#5A4A3A] font-medium whitespace-nowrap"
                    >
                      {item}
                    </div>
                  ))}
                </motion.div>
              </div>

            </div>
          </motion.div>
        </div>
      )}

    </section>
  )
}

export default PackagesOverview
