import React from 'react'
import Image from 'next/image'
import bgimage from '@/assets/Home/groundedbg.jpg'

const Grounded = () => {
    return (
        <div className="relative w-full flex flex-col items-center overflow-hidden">
            <div>
                <h2 className="text-2xl md:text-5xl md:mb-10 lg:text-[4rem] !leading-[1.1] text-[#2A2A2A]">
                    <span className="font-light tracking-wide text-[#3a3a3a]">Grounded in Nature.</span>
                    <br />
                    <span className="font-medium text-[#1a1a1a]">Elevated in Luxury.</span>
                </h2>

                <div className="absolute inset-x-0 top-0 h-[10vh] bg-gradient-to-b from-white via-white/30 to-transparent z-10"></div>

                {/* Text Content */}
            </div>
            <div className="w-full h-dvh relative">
                <Image
                    src={bgimage}
                    alt="Grounded in Nature"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-x-0 top-0 h-[50vh] md:h-[20vh] bg-gradient-to-b from-white via-white/10 to-transparent z-10"></div>
            </div>
        </div>
    )
}

export default Grounded