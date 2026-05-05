import React from 'react'
import Image from 'next/image'
import gamedayImg from '@/assets/hotel/gameday.png'
import shakespeareImg from '@/assets/hotel/shakespeare.png'
import petfriendlyImg from '@/assets/hotel/petfriendly.png'

const PackagesOverview = () => {
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
        <div className="relative flex justify-center items-center h-[500px] md:h-[600px] w-full max-w-[950px] mx-auto">
          
          {/* Left Card (Game Day) */}
          <div className="absolute left-[5%] md:left-[10%] top-12 md:top-20 w-[240px] md:w-[320px] aspect-[3/4.2] rounded-[2rem] overflow-hidden shadow-2xl -rotate-[12deg] transform-gpu transition-all duration-500 hover:-rotate-6 hover:scale-105 hover:z-20 cursor-pointer group">
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
          <div className="absolute right-[5%] md:right-[10%] top-12 md:top-20 w-[240px] md:w-[320px] aspect-[3/4.2] rounded-[2rem] overflow-hidden shadow-2xl rotate-[12deg] transform-gpu transition-all duration-500 hover:rotate-6 hover:scale-105 hover:z-20 cursor-pointer group">
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
          <div className="absolute z-10 w-[280px] md:w-[360px] aspect-[3/4.2] rounded-[2rem] overflow-hidden shadow-2xl transform-gpu transition-all duration-500 hover:scale-105 cursor-pointer group">
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
    </section>
  )
}

export default PackagesOverview
