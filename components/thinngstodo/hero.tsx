"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

import banner from '@/assets/things-to-do/thingstoto_bg.jpg'
import hiking from '@/assets/things-to-do/hike.jpg'
import skiing from '@/assets/things-to-do/skiing.jpg'

// Built as requested using an organized Array Of Objects to easily feed the slider state
const experiences = [
    {
        id: 1,
        tag: "1. HIKE",
        title: "MOUNTAIN AS A PLACE\nOF ADVENTURE",
        mobiletitle:"MOUNTAIN AS A PLACE OF ADVENTURE",
        desc1: "Mountains offer a thrilling escape for those seeking adventure and discovery.",
        desc2: "The crisp mountain air, rugged landscapes, and endless horizons invite explorers to push their limits while embracing the beauty and serenity of nature.",
        image: hiking
    },
    {
        id: 2,
        tag: "2. SKIING",
        title: "WINTER WONDERLAND\nEXPERIENCE",
        mobiletitle:"WINTER WONDERLAND EXPERIENCE",
        desc1: "Hit the snowy slopes and weave through breathtaking alpine trails in fresh powder.",
        desc2: "Our nearby resorts offer world-class facilities and cozy lodge atmospheres, giving you the perfect balance of thrill and comfortable serenity.",
        image: skiing
    }
]

const Hero = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % experiences.length)
    }

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + experiences.length) % experiences.length)
    }

    const activeItem = experiences[activeIndex]

    return (
        <div className='relative w-full min-h-[120vh] md:min-h-[140vh] flex flex-col items-center gap-50 md:gap-100 justify-start overflow-hidden pt-[20vh] pb-[10vh]'>
            {/* Background Layer completely behind everything */}
            <div className="absolute inset-0 z-0">
                <Image src={banner} alt="banner" fill className='object-cover object-center' priority />
                <div className='absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-black/80' />
            </div>

            {/* Top Typography Node */}
            <div className='relative z-10 flex flex-col mt-[30%] md:mt-[10%] items-center justify-center w-full px-[5%] mb-[10vh]'>
                <h1 className='text-[4rem] md:text-[10rem] lg:text-[10rem] text-center font-semibold uppercase text-white leading-[0.6] md:leading-none drop-shadow-2xl'>THINGS <br className='md:hidden'/> <span className='text-[2rem] md:text-[10rem] lg:text-[10rem]'>TO DO</span></h1>
                <p className='text-sm md:text-base lg:text-xl font-medium md:max-w-3xl text-center mt-4 mb-8 text-white drop-shadow'>
                    <span className="md:hidden">
                        Let Us Host Your Group To Create An Unforgettable<br />
                        Experience For You. We're Experienced With Hosting<br />
                        Families, Companies, Tour Buses, And More.
                    </span>
                    <span className="hidden md:flex flex-col">
                        <span>Let Us Host Your Group To Create An Unforgettable Experience For You. We're</span>
                        <span>Experienced With Hosting Families, Companies, Tour Buses, And More.</span>
                    </span>
                </p>
                <a href="https://www.choicehotels.com/en-in/utah/cedar-city/choice-hotels/ut094" target="_blank" rel="noopener noreferrer" className='px-6 py-2.5 md:px-12 md:py-3.5 rounded-full border-2 bg-white/5  border-[#FFFFFF1A] hover:bg-white/10 uppercase backdrop-blur-xs text-white transition-colors duration-300 text-sm font-medium tracking-widest shadow-lg'>Book Now</a>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-center justify-center gap-[5%] lg:gap-[12%] w-full px-[5%] lg:px-[8%]">

                <div className="relative w-[70%] sm:w-[50%] lg:w-[25%] shrink-0">
                    
                    <div className="relative aspect-[3/5] w-full mt-[5%] lg:mt-0">
                        <div className="absolute top-[-5%] left-[-8%] w-full h-full rounded-2xl border border-white/40 drop-shadow-sm pointer-events-none" />

                        <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, filter: 'blur(4px)' }}
                                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, filter: 'blur(4px)' }}
                                    transition={{ duration: 0.5 }}
                                    className="relative w-full h-full"
                                >
                                    <Image
                                        src={activeItem.image}
                                        fill
                                        className="object-cover"
                                        alt={activeItem.tag}
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Pagination Remote Array */}
                    <div className="w-full flex items-center justify-between mt-[15%] lg:mt-[12%] px-[5%] lg:px-0">
                        <button onClick={handlePrev} className="cursor-pointer p-3 lg:p-4 rounded-full border border-white/30 text-white hover:bg-white/20 backdrop-blur-sm transition-all group shadow-md hover:scale-105 active:scale-95" aria-label="Previous Activity">
                            <svg className="w-4 h-4 lg:w-5 lg:h-5 text-white/80 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <div className="flex gap-3">
                            {experiences.map((_, i) => (
                                <button key={i} aria-label={`slide indicator ${i}`} onClick={() => setActiveIndex(i)} className={`cursor-pointer w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-white scale-125 shadow-[0_0_8px_white]' : 'bg-white/40 hover:bg-white/70'}`} />
                            ))}
                        </div>

                        <button onClick={handleNext} className="cursor-pointer p-3 lg:p-4 rounded-full border border-white/30 text-white hover:bg-white/20 backdrop-blur-sm transition-all group shadow-md hover:scale-105 active:scale-95" aria-label="Next Activity">
                            <svg className="w-4 h-4 lg:w-5 lg:h-5 text-white/80 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Right: Stateful Description Injection Node */}
                <div className="flex flex-col text-white w-full lg:w-[45%] mt-[15%] lg:mt-0 relative z-10 pl-[10%] pr-[10%] lg:px-0 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="flex flex-col w-full"
                        >
                            <h3 className="text-sm text-center md:text-3xl font-semibold tracking-widest drop-shadow-md">
                                {activeItem.tag}
                            </h3>
                            <h2 className="hidden md:block text-base text-center md:text-left md:text-4xl lg:text-[44px] font-medium mt-[4%] uppercase whitespace-pre-line tracking-tight leading-tight drop-shadow-lg">
                                {activeItem.title}
                            </h2>
                            <h2 className="md:hidden text-base font-medium mt-[2%] uppercase">
                                {activeItem.mobiletitle}
                            </h2>

                            <div className="flex flex-row items-center gap-[5%] mt-[5%] md:mt-[10%]">
                                <p className="text-sm sm:text-base lg:text-lg font-medium text-white/90 leading-relaxed md:max-w-[65%]">
                                    {activeItem.desc1}
                                </p>
                                <hr className="grow border-t border-white/50" />
                            </div>

                            <p className="text-sm sm:text-base lg:text-lg font-medium text-white/90 leading-relaxed md:max-w-[85%] mt-[6%]">
                                {activeItem.desc2}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </div>
    )
}

export default Hero