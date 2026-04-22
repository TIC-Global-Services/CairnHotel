"use client"

import React from 'react'
import Image from 'next/image'
import image1 from '@/assets/dining/maque-1.jpg'
import image2 from '@/assets/dining/maque-2.png'
import image3 from '@/assets/dining/maque-3.jpg'
import image4 from '@/assets/dining/maque-4.jpg'

const images = [image1, image2, image3, image4]

const repeatedImages = [...images, ...images, ...images, ...images]

const Marquee = () => {
  return (
    <section className="w-full overflow-hidden flex flex-col">
      <style>{`
        @keyframes pure-css-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .css-marquee-container {
          display: flex;
          width: max-content;
          animation: pure-css-marquee 35s linear infinite;
        }
        .css-marquee-container:hover {
          animation-play-state: paused;
        }
      `}</style>
      
    
      <div className="css-marquee-container  gap-4 pr-4">
        {repeatedImages.map((img, i) => (
          <div 
            key={i} 
            className="relative h-[250px] sm:h-[350px] lg:h-[450px] aspect-[4/5] rounded-xl overflow-hidden shrink-0 opacity-100 transition-opacity duration-300 cursor-pointer"
          >
            <Image 
              src={img} 
              alt={`Dining showcase ${i}`} 
              fill 
              className="object-cover" 
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              priority={i < 4}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Marquee