"use client"

import React from 'react'
import img1 from '@/assets/dining/knowmore-1.jpg'
import img2 from '@/assets/dining/knowmore-2.jpg'
import img3 from '@/assets/dining/knowmore-3.jpg'
import img4 from '@/assets/dining/knowmore-4.jpg'
import Image from 'next/image'

const images = [img1, img2, img3, img4]

const repeatedImages = [...images, ...images, ...images]

const KnowMore = () => {
  return (
    <section className="relative w-full min-h-[80vh] md:min-h-screen bg-white overflow-hidden flex flex-col justify-between px-6 md:px-12 lg:px-20 py-12 md:py-24">


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
      <div className="relative z-10 flex flex-col items-start w-full  pointer-events-none">
        <h2 className="text-[32px] sm:text-[44px] md:text-[50px] font-semibold uppercase  text-[#0a0a0a] leading-none drop-shadow-sm">
          KNOW MORE
        </h2>
        <span className="text-[20px] sm:text-[26px] md:text-[30px] font-light italic uppercase text-[#333] ml-25 sm:ml-[12%] md:ml-[12%] tracking-wide drop-shadow-sm">
          ABOUT US
        </span>
      </div>

      {/* Rotated Infinite Image Strip */}
      <div className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200vw] -rotate-10 flex justify-center items-center pointer-events-none ">

        <div className="animate-diagonal-marquee gap-4 sm:gap-6 pr-4 sm:pr-6 scale-[1.05] sm:scale-110">
          {repeatedImages.map((src, i) => (
            <div
              key={i}
              className="relative w-[210px] sm:w-[280px] lg:w-[38dvh] aspect-square rounded-2xl overflow-hidden shrink-0 shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
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
      <div className="relative z-10 flex flex-col items-end w-full md:mt-[15%] pointer-events-none">
        <h2 className="text-4xl sm:text-[56px] md:text-[74px] font-medium text-[#0000006B] text-right leading-[1.05]  uppercase">
          IT'S MORE THAN A <br className='hidden md:block' />
          DESTINATION...
        </h2>
      </div>

    </section>
  )
}

export default KnowMore