"use client"

import React from 'react'
import img1 from '@/assets/dining/knowmore-1.jpg'
import img2 from '@/assets/dining/knowmore-2.jpg'
import img3 from '@/assets/dining/knowmore-3.jpg'
import img4 from '@/assets/dining/knowmore-4.jpg'
import Image from 'next/image'

const images = [img1, img2, img3, img4]
// By duplicating the array 3 times, we can cleanly translate exactly 1/3 of the width 
// to create an ultra-smooth, lightweight infinite CSS marquee directly along the rotated axis
const repeatedImages = [...images, ...images, ...images]

const KnowMore = () => {
  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden flex flex-col justify-between px-6 md:px-12 lg:px-20 py-12 md:py-24">
      
   
      <style>{`
        @keyframes slide-diagonal {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        .animate-diagonal-marquee {
          display: flex;
          width: max-content;
          animation: slide-diagonal 40s linear infinite;
        }
      `}</style>

      {/* Top Left Text Block */}
      <div className="relative z-10 flex flex-col items-start w-full pointer-events-none">
        <h2 className="text-[32px] sm:text-[44px] md:text-[56px] font-semibold uppercase  text-[#0a0a0a] leading-none drop-shadow-sm">
          KNOW MORE
        </h2>
        <span className="text-[20px] sm:text-[26px] md:text-[34px] font-light italic uppercase text-[#333] ml-14 sm:ml-20 md:ml-[15%] mt-5 tracking-wide drop-shadow-sm">
          ABOUT US
        </span>
      </div>

      {/* Rotated Infinite Image Strip */}
      <div className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200vw] -rotate-10 flex justify-center items-center pointer-events-none ">
        
        <div className="animate-diagonal-marquee gap-4 sm:gap-6 pr-4 sm:pr-6 scale-[1.05] sm:scale-110">
          {repeatedImages.map((src, i) => (
            <div 
              key={i} 
              className="relative w-[210px] sm:w-[280px] lg:w-[380px] aspect-square rounded-2xl overflow-hidden shrink-0 shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
            >
              <Image 
                src={src} 
                fill 
                className="object-cover" 
                alt={`Culinary showcase ${i}`} 
                sizes="(max-width: 768px) 50vw, 33vw"
                priority={i < 4}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Right Text Block */}
      <div className="relative z-10 flex flex-col items-end w-full mt-[10%] pointer-events-none">
        <h2 className="text-[40px] sm:text-[56px] md:text-[76px] lg:text-[96px] font-medium text-[#A1A1A1] text-right leading-[1.05]  uppercase drop-shadow-sm">
          IT'S MORE THAN A <br /> 
          DESTINATION...
        </h2>
      </div>

    </section>
  )
}

export default KnowMore