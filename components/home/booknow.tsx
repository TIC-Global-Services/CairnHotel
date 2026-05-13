"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { OrbitingCircles } from '@/components/ui/orbiting-circles'

import image1 from '@/assets/gallery/g01.jpg'
import image2 from '@/assets/gallery/g05.jpg'
import image3 from '@/assets/gallery/g06.jpg'
import image4 from '@/assets/gallery/g07.jpg'
import image5 from '@/assets/gallery/g09.jpg'
import image6 from '@/assets/gallery/g11.jpg'
import bgimg from '@/assets/Home/booknow_bg.png'

const hotelGallery = [image1, image2, image3, image4, image5, image6];

const BookNow = () => {
    const [mounted, setMounted] = useState(false);
    const [outerRadius, setOuterRadius] = useState(320);

    useEffect(() => {
        setMounted(true);
        const updateSizes = () => {
            if (window.innerWidth < 768) {
                setOuterRadius(150); // Mobile
            } else if (window.innerHeight < 850 && window.innerWidth >= 1024) {
                setOuterRadius(300); // Low-height desktop
            } else {
                setOuterRadius(350); // Normal desktop
            }
        };

        updateSizes();
        window.addEventListener('resize', updateSizes);
        return () => window.removeEventListener('resize', updateSizes);
    }, []);

    return (
        <section className="relative w-full h-[80vh] md:h-screen md:min-h-[700px] overflow-hidden flex items-center justify-center bg-neutral-900">
            {/* Background Image with Cinematic Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={bgimg}
                    alt="Cairn Hotel Background"
                    fill
                    className="object-cover opacity-60 scale-105"
                    priority
                />
            </div>

            {/* Orbiting Gallery Container */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                
                {mounted && (
                    <>
                        {/* Inner Static White Ring */}
                        <OrbitingCircles
                            className="hidden" // No orbiting items here
                            duration={0}
                            radius={outerRadius * 0.6}
                            path={true}
                        />

                        {/* Outer Orbiting Layer */}
                        <OrbitingCircles
                            className="w-[70px] h-[55px] md:w-[150px] md:h-[110px] lg:w-[13dvh] lg:h-[18dvh] border-none bg-transparent"
                            duration={40}
                            radius={outerRadius}
                            path={true}
                        >
                            {hotelGallery.map((img, i) => (
                                <div key={i} className="relative size-full overflow-hidden rounded-[8px] md:rounded-[1.5rem] group hover:scale-110 transition-transform duration-500">
                                   <Image 
                                        src={img} 
                                        alt={`Gallery Photo ${i + 1}`} 
                                        fill 
                                        className="object-cover" 
                                    />
                                </div>
                            ))}
                        </OrbitingCircles>
                    </>
                )}

                {/* Central CTA Content */}
                <div className="relative z-20 flex flex-col items-center text-center px-[5%] max-w-2xl transform-gpu">
                    <span className="text-xs md:text-sm font-light  uppercase text-[#FFF7E0] mb-3 md:mb-6 ">
                        CAIRN HOTEL
                    </span>
                    <h2 className="text-[20px] md:text-5xl lg:text-5xl font-sans font-normal text-[#FFF7E0] leading-[1.3] lg:leading-[1.1] tracking-wide mb-6 md:mb-8 whitespace-nowrap">
                        ENJOY A COZY<br />
                        <span className="hidden md:inline">STAY</span>
                        <span className="md:hidden">WEEKEND STAY</span>
                    </h2>
                    
                    {/* <button className="group relative px-6 md:px-8 py-2 md:py-3 rounded-full border border-white/40 bg-white/5 text-white backdrop-blur-sm transition-all hover:bg-white hover:text-black hover:border-white duration-500 mt-2 md:mt-0">
                        <span className="relative z-10 font-sans tracking-[0.1em] text-[10px] md:text-sm font-light uppercase md:normal-case">Book now</span>
                    </button> */}
                </div>

            </div>
        </section>
    )
}

export default BookNow