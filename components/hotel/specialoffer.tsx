'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import hotel1 from '@/assets/Home/hotel-1.jpg'

// Adding an extra item to demonstrate the "Show more" functionality
const offerDetails = [
    {
        id: 1,
        fromdata: "2026/06/04",
        todate: "2026/10/04",
        type: "Rooms",
        offer: "Stays of 3 nights",
        image: hotel1   
    },
    {
        id: 2,
        fromdata: "2026/06/04",
        todate: "2026/10/04",
        type: "Rooms",
        offer: "Stays of 3 nights",
        image: hotel1   
    },
    {
        id: 3,
        fromdata: "2026/11/01",
        todate: "2026/12/15",
        type: "Suites",
        offer: "Weekend Getaways",
        image: hotel1   
    }
]

const SpecialOffer = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedOffers = showAll ? offerDetails : offerDetails.slice(0, 2);

  return (
    <section className="w-full py-20 pt-[10%] bg-white">
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 xl:px-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 lg:gap-16 mb-6 md:mb-12">
           <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium text-black max-w-lg leading-[1.1] tracking-tight">
              Special Offers for Every Season
           </h2>
           <p className="text-base md:text-xl font-normal max-w-3xl leading-snug md:leading-relaxed">
              Experience the Cedar City in every season with our exclusive offers for adventure, relaxation, indulgence, and unforgettable moments.
           </p>
        </div>

        {/* Divider line */}
        <div className="w-full h-[1px] bg-gray-200 hidden md:block mb-5 md:mb-16"></div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 transition-all duration-500 ease-in-out">
           {displayedOffers.map((offer) => (
             <div key={offer.id} className="group relative w-full h-[400px] md:h-[480px] rounded-[32px] overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300">
                
                {/* Background Image */}
                <Image 
                  src={offer.image}
                  alt={offer.type}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"></div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between z-10">
                   
                   {/* Top Date Pill */}
                   <div className="self-start px-5 py-2 rounded-full border border-white/60 bg-white/10 backdrop-blur-md text-white text-[14px] font-light tracking-wide">
                      {offer.fromdata.replace(/-/g, '/')} - {offer.todate.replace(/-/g, '/')}
                   </div>

                   {/* Bottom Content */}
                   <div className="flex flex-col items-start text-white">
                      <h3 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">{offer.type}</h3>
                      <p className="text-[#E0E0E0] text-sm font-light tracking-wide mb-6">{offer.offer}</p>
                      
                      <button className="px-6 py-2 rounded-full border border-white/60 hover:bg-white hover:text-black transition-colors duration-300 text-[14px] font-medium tracking-wide">
                         More Info
                      </button>
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* Show More Button (only displays if total > 2) */}
        {offerDetails.length > 2 && (
          <div className="flex justify-center w-full">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 rounded-full border border-[#B0B0B0] text-[#7A7A7A] hover:bg-black hover:text-white hover:border-black transition-all duration-300 text-[15px] font-normal tracking-wide"
            >
              {showAll ? "Show less" : "Show more"}
            </button>
          </div>
        )}

      </div>
    </section>
  )
}

export default SpecialOffer