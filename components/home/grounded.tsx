import React from 'react'
import Image from 'next/image'
import bgimage from '@/assets/Home/groundedbg.jpg'
import { ChevronDown } from 'lucide-react'

const Grounded = () => {
    return (
        <div className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
            {/* Background Image Container */}
            <div className="absolute inset-0 w-full h-full z-0">
                <Image
                    src={bgimage}
                    alt="Grounded in Nature"
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>
            
            {/* Top Gradient for text legibility */}
            <div className="absolute inset-x-0 top-0 h-[40vh] md:h-[35vh] bg-gradient-to-b from-white/80 via-white/40 to-transparent z-10 pointer-events-none"></div>

            {/* Text Overlay */}
            <div className="absolute top-[12%] z-20 flex flex-col items-center justify-center text-center px-4 w-full">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.5rem] !leading-[1.2] md:!leading-[1.1] tracking-tight">
                    <span className="font-medium text-[#5a5a5a]">Grounded in Nature.</span>
                    <br />
                    <span className="font-semibold text-[#1a1a1a]">Elevated in Luxury.</span>
                </h2>
            </div>
            
            {/* Scroll Indicator */}
            <div className="absolute bottom-8 md:bottom-12 z-20 flex justify-center w-full">
                <div className="flex flex-col items-center justify-center text-white/70 animate-bounce">
                    <ChevronDown strokeWidth={1.5} size={28} />
                </div>
            </div>
        </div>
    )
}

export default Grounded