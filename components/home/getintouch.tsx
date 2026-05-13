import React from 'react'
import Image from 'next/image'
import getintouchbg from '@/assets/Home/get_in_touch.jpg'
import Link from 'next/link'

const GetInTouch = () => {
    return (
        <section className="w-full py-24 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto flex flex-col justify-center items-center">
                
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
                    <div className="w-full lg:w-3/5 flex flex-col md:items-start items-center text-left">
                        <p className="text-[#343A40] text-base md:text-lg leading-snug md:leading-loose mb-10 font-normal max-w-3xl">
                            Utah is a place where every landscape tells a different story. Red rock canyons, high desert views, alpine forests, and rugged mountain peaks create a setting that feels both adventurous and unforgettable. From winter skiing and scenic drives to hiking, mountain biking, and rock climbing, the state offers year-round experiences for travelers who want to explore, unwind, and reconnect with the natural beauty of the West.
                        </p>
                        <Link href={'https://visitcedarcity.com/about-us-cedar-city/'} target='_blank'>
                        <button className="px-6 md:px-8 py-3 md:py-3.5 bg-[#4D2F27] hover:bg-[#4A3326] transition-colors duration-300 text-white text-sm tracking-tight font-medium uppercase rounded-full">
                            EXPLORE MORE
                        </button>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default GetInTouch