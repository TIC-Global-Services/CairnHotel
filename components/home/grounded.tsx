import React from 'react'
import Image from 'next/image'
import bgimage from '@/assets/Home/groundedbg.jpg'
import { ChevronDown } from 'lucide-react'

const Grounded = () => {
    return (
        <div className="relative w-full h-[100dvh] flex flex-col items-center justify-center mt-10">
            {/* Background Image Container */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                <Image
                    src={bgimage}
                    alt="Grounded in Nature"
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>
            {/* Top Gradient for text legibility */}
            <div className="absolute inset-x-0 top-0 h-[40vh] md:h-[35vh] bg-gradient-to-b from-[#FAF9F8] via-[#FAF9F8]/60 to-transparent z-10 pointer-events-none"></div> 

            {/* Overlapping Text */}
            <div className="absolute -top-10 left-0 w-full flex flex-col items-center justify-center z-20 text-center -translate-y-1/2">
                <h2 className="text-4xl md:text-5xl lg:text-[4rem] xl:text-[5rem] text-[#4a4a4a]  tracking-tight">
                    Grounded in Nature.
                </h2>
                <h2 className="text-4xl md:text-5xl lg:text-[4rem] xl:text-[5rem] font-semibold text-black tracking-tight">
                    Elevated in Luxury.
                </h2>
            </div>
        </div>
    )
}

export default Grounded