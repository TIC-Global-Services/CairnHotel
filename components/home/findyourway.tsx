import React from 'react'
import Image from 'next/image'

import carienhelp from '@/assets/Home/carien_help.jpg'
const FindYourWay = () => {
    return (
        <section className="relative h-screen min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src={carienhelp}
                    alt="Cairn Canyon Background"
                    fill
                    priority
                    className="object-cover"
                />
                {/* Dark Overlay for better text readability and premium feel */}
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center px-4">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-sans text-white uppercase mb-4 leading-tight">
                    LET OUR CAIRN HELP <br />
                    YOU FIND YOUR WAY
                </h2>

                <button
                    className="
    relative px-12 py-3 
    text-white tracking-widest font-medium
    rounded-full 
    bg-white/10
    backdrop-blur-sm
    border border-white/20
    hover:bg-white/20  transition-all duration-300
    before:absolute before:inset-0 before:rounded-full before:p-[1px] 
    before:[mask-composite:xor]
  "
                >
                    EXPLORE
                </button>
            </div>
        </section>
    )
}

export default FindYourWay