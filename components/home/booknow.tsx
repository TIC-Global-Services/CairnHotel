"use client"
import React from 'react'
import Image from 'next/image'
import { OrbitingCircles } from '@/components/ui/orbiting-circles'

import image1 from '@/assets/Home/hotel-1.jpg'
import image2 from '@/assets/Home/hotel-2.jpg'
import image3 from '@/assets/Home/hotel-3.jpg'
import image4 from '@/assets/Home/hotel-4.jpg'
import image5 from '@/assets/Home/hotel-5.jpg'
import image6 from '@/assets/Home/hotel-6.jpg'
import bgimg from '@/assets/Home/booknow_bg.png'

const hotelGallery = [image1, image2, image3, image4, image5, image6];

const BookNow = () => {
    return (
        <section className="relative w-full h-screen min-h-[700px] overflow-hidden flex items-center justify-center bg-neutral-900">
            {/* Background Image with Cinematic Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={bgimg}
                    alt="Cairn Hotel Background"
                    fill
                    className="object-cover opacity-60 scale-105"
                    priority
                />
                {/* <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" /> */}
            </div>

            {/* Orbiting Gallery Container */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                
                {/* Inner Static White Ring */}
                <OrbitingCircles
                    className="hidden" // No orbiting items here
                    duration={0}
                    radius={160}
                    path={true}
                />

                {/* Outer Orbiting Layer */}
                <OrbitingCircles
                    className="w-[120px] h-[90px] md:w-[150px] md:h-[110px] lg:w-[100px] lg:h-[150px] border-none bg-transparent"
                    duration={40}
                    radius={320}
                    path={true}
                >
                    {hotelGallery.map((img, i) => (
                        <div key={i} className="relative size-full overflow-hidden rounded-[1rem] md:rounded-[1.5rem] group hover:scale-110 transition-transform duration-500">
                           <Image 
                                src={img} 
                                alt={`Gallery Photo ${i + 1}`} 
                                fill 
                                className="object-cover" 
                            />
                        </div>
                    ))}
                </OrbitingCircles>

                {/* Central CTA Content */}
                <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-2xl transform-gpu">
                    <span className="text-[10px] md:text-[11px] font-sans tracking-[0.25em] uppercase text-white/80 mb-6 font-medium">
                        CAIRN HOTEL
                    </span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-sans font-medium text-white leading-[1.2] lg:leading-[1.1] tracking-wide mb-8">
                        ENJOY A COZY<br />STAY
                    </h2>
                    
                    <button className="group relative px-6 md:px-8 py-2 md:py-3 rounded-full border border-white/40 bg-white/5 text-white backdrop-blur-sm transition-all hover:bg-white hover:text-black hover:border-white duration-500">
                        <span className="relative z-10 font-sans tracking-[0.1em] text-xs md:text-sm font-light">Book now</span>
                    </button>
                </div>

            </div>

            {/* Cinematic Blur Edges */}
            {/* <div className="absolute inset-0 pointer-events-none border-[40px] md:border-[80px] border-transparent shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] z-30" /> */}
        </section>
    )
}

export default BookNow