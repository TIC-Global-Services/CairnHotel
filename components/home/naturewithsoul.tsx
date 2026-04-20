"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import slide1 from '@/assets/Home/slide1.jpg'
import slide2 from '@/assets/Home/slide2.jpg'
import slide3 from '@/assets/Home/slide3.jpg'

const contentData = [
    {
        label: "NATURE WITH SOUL",
        title: "Rooted in Timeless \n Landscapes",
        description: "Nestled in the heart of breathtaking natural surroundings, The Cairn Hotel blends scenic beauty with refined modern comfort.",
        image: slide1
    },
    {
        label: "A SERENE ESCAPE",
        title: "Designed for \n Calm Moments",
        description: "At Cairn Hotel, we believe true luxury lies in tranquility. Thoughtfully curated interiors, soft earthy tones.",
        image: slide2
    },
    {
        label: "WARM WELCOME",
        title: "Where Nature Meets \n Elegance",
        description: "Natural materials, warm lighting, and contemporary design shape every corner of the hotel. Surrounded by scenic landscapes and quiet beauty.",
        image: slide3
    }
]

const CircleDot = () => (
    <div className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] rounded-full border border-gray-300 flex items-center justify-center">
        <div className="w-[4px] h-[4px] md:w-[5px] md:h-[5px] rounded-full bg-gray-400" />
    </div>
)

const NatureWithSoul = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <section className="relative w-full bg-white text-black py-10 md:py-0">
            <div className="px-[5%] md:px-[10%]  flex flex-col md:flex-row relative">

                {/* Left column - pinned via sticky */}
                <div className="w-full md:w-1/2 pt-12 pb-4 md:py-0 md:h-screen relative md:sticky top-0 md:top-0 flex items-center justify-center z-10 bg-white md:bg-transparent">
                    {/* Stacking elements */}
                    <div className="relative w-[85%] max-w-[480px] aspect-4/5 mt-6 md:mt-0">
                        {/* Decorative background cards to give the "stack" look */}
                        <div className="absolute inset-0 bg-[#F4EBD9] rounded-2xl transform -rotate-4 -translate-x-3 -translate-y-3 md:-translate-x-5 md:-translate-y-5 shadow-sm" />
                        <div className="absolute inset-0 bg-[#6F3A21] rounded-2xl transform -rotate-2 -translate-x-1.5 -translate-y-1.5 md:-translate-x-2 md:-translate-y-2 shadow-sm" />

                        {/* Foreground Animated Images (Stacking Effect) */}
                        {contentData.map((data, i) => {
                            const isActive = activeIndex === i;
                            const isPast = activeIndex > i;
                            const isFuture = activeIndex < i;

                            return (
                                <motion.div
                                    key={i}
                                    initial={false}
                                    animate={{
                                        y: isFuture ? 60 : (isPast ? -10 : 0),
                                        scale: isFuture ? 0.85 : (isPast ? 0.95 : 1),
                                        opacity: isFuture ? 0 : 1,
                                        rotate: isFuture ? 4 : (isPast ? -2 : 0),
                                        filter: isPast ? 'brightness(0.6)' : 'brightness(1)'
                                    }}
                                    transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                                    className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
                                    style={{ zIndex: isActive ? 30 : (isPast ? 10 + i : -10) }}
                                >
                                    <Image
                                        src={data.image}
                                        alt={data.title.replace('\n', ' ')}
                                        fill
                                        className="object-cover"
                                        priority={i === 0}
                                    />
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

                {/* Right column - scrolling text content (Desktop) */}
                <div className="hidden md:flex w-full md:w-1/2 flex-col pt-[10vh] md:pt-0 pb-[10vh]">
                    {contentData.map((data, i) => (
                        <motion.div
                            key={i}
                            // Fire active state when 50% of the block is visible in viewport
                            onViewportEnter={() => setActiveIndex(i)}
                            viewport={{ amount: 0.5 }}
                            className="min-h-[60vh] md:min-h-screen flex flex-col items-center justify-center px-6 md:px-16 text-center"
                        >
                            {/* Circular dots and Label */}
                            <div className="flex items-center gap-4 mb-6 opacity-70">
                                <CircleDot />
                                <span className="text-[0.7rem] md:text-xs tracking-[0.2em] uppercase text-[#2A0800] font-medium">
                                    {data.label}
                                </span>
                                <CircleDot />
                            </div>

                            {/* Title */}
                            <h2 className="text-[2.2rem] md:text-[2.25rem] font-light text-[#2A0800] leading-[1.1] mb-6 md:mb-8">
                                {data.title.split('\n').map((line, j) => (
                                    <React.Fragment key={j}>
                                        {line}
                                        <br />
                                    </React.Fragment>
                                ))}
                            </h2>

                            {/* Description */}
                            <p className="text-gray-500 text-sm md:text-base leading-[1.8] max-w-[380px] font-light">
                                {data.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile text content with slider controls */}
                <div className="flex md:hidden w-full flex-col px-6 pt-8 pb-16 min-h-[45vh]">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="flex flex-col items-center text-center flex-1"
                    >
                        {/* Circular dots and Label */}
                        <div className="flex items-center gap-4 mb-6 opacity-70">
                            <CircleDot />
                            <span className="text-[0.7rem] tracking-[0.2em] uppercase text-[#2A0800] font-medium">
                                {contentData[activeIndex].label}
                            </span>
                            <CircleDot />
                        </div>

                        {/* Title */}
                        <h2 className="text-[2.2rem] font-light text-[#2A0800] leading-[1.1] mb-5 whitespace-pre-line">
                            {contentData[activeIndex].title}
                        </h2>

                        {/* Description */}
                        <p className="text-gray-500 text-sm leading-[1.8] max-w-[380px] font-light mb-10">
                            {contentData[activeIndex].description}
                        </p>
                    </motion.div>

                    {/* Controls */}
                    <div className="flex items-center justify-center gap-8 mt-auto">
                        <button 
                            onClick={() => setActiveIndex(prev => (prev === 0 ? contentData.length - 1 : prev - 1))}
                            className="p-3 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-colors focus:outline-none"
                            aria-label="Previous slide"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                        </button>
                        
                        {/* Dot indicators */}
                        <div className="flex gap-3">
                           {contentData.map((_, i) => (
                               <button 
                                   key={i} 
                                   onClick={() => setActiveIndex(i)}
                                   className={`w-2.5 h-2.5 rounded-full transition-colors ${i === activeIndex ? 'bg-[#6F3A21]' : 'bg-gray-300'}`}
                                   aria-label={`Go to slide ${i + 1}`}
                               />
                           ))}
                        </div>

                        <button 
                            onClick={() => setActiveIndex(prev => (prev === contentData.length - 1 ? 0 : prev + 1))}
                            className="p-3 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-colors focus:outline-none"
                            aria-label="Next slide"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                        </button>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default NatureWithSoul
