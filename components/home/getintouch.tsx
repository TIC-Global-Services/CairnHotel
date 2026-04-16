import React from 'react'
import Image from 'next/image'
import getintouchbg from '@/assets/Home/get_in_touch.jpg'

const GetInTouch = () => {
    return (
        <section className="w-full py-24 px-4 md:px-8 lg:px-16">
            <div className="max-w-6xl mx-auto flex flex-col justify-center items-center">
                
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-wide text-[#1A1A1A] mb-5 md:mb-16 text-center" style={{ fontFamily: 'var(--font-clash-display), sans-serif' }}>
                    GET IN TOUCH
                </h2>

                {/* Content Grid */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 w-full">
                    
                    {/* Image Section */}
                    <div className="w-full lg:w-1/2 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-sm">
                        <Image 
                            src={getintouchbg} 
                            alt="Dramatic landscapes in Utah" 
                            fill 
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>

                    {/* Text & Action Section */}
                    <div className="w-full lg:w-1/2 flex flex-col md:items-start items-center text-left">
                        <p className="text-[#6B6B6B] text-base md:text-lg leading-snug md:leading-loose mb-10 font-light max-w-lg">
                            Utah is a western U.S. state known for its dramatic landscapes, red rock deserts, alpine forests, and world-class mountain terrain. It offers year-round outdoor adventures ranging from skiing and mountain biking, and rock climbing.
                        </p>
                        
                        <button className="px-6 md:px-8 py-3 md:py-3.5 bg-[#5A3F30] hover:bg-[#4A3326] transition-colors duration-300 text-white text-xs tracking-[0.1em] uppercase rounded-full">
                            EXPLORE MORE
                        </button>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default GetInTouch