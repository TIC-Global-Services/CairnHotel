import React from 'react'
import Image from 'next/image'
import bgimage from '@/assets/Home/groundedbg.jpg'

const Grounded = () => {
    return (
        <div className="relative w-full flex flex-col items-center overflow-hidden">
            <div>
                <h2 className="text-4xl md:text-5xl mb-10 lg:text-[4rem] !leading-[1.1] text-[#2A2A2A]">
                    <span className="font-light tracking-wide text-[#3a3a3a]">Grounded in Nature.</span>
                    <br />
                    <span className="font-medium text-[#1a1a1a]">Elevated in Luxury.</span>
                </h2>
                {/* <div className="absolute inset-x-0 -top-[30%] h-90 bg-gradient-to-b from-[#CBD0D4]/20 via-[#EDEFF0] to-[#FFFFFF]"></div> */}
            </div>
            <div className="w-full h-[100dvh] relative">
                <Image
                    src={bgimage}
                    alt="Grounded in Nature"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-x-0 -top-[29.5%] h-64 bg-gradient-to-t from-white/50 to-transparent"></div>
            </div>
        </div>
    )
}

export default Grounded