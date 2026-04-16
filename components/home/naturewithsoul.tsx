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
                <div className="w-full md:w-1/2 h-[50vh] md:h-screen sticky top-0 md:top-0 flex items-center justify-center overflow-hidden md:overflow-visible z-10 bg-white md:bg-transparent">
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

                {/* Right column - scrolling text content */}
                <div className="w-full md:w-1/2 flex flex-col pt-[10vh] md:pt-0 pb-[10vh]">
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
                                <span className="text-[0.7rem] md:text-xs tracking-[0.2em] uppercase text-gray-500 font-medium">
                                    {data.label}
                                </span>
                                <CircleDot />
                            </div>

                            {/* Title */}
                            <h2 className="text-[2.2rem] md:text-[3.5rem] font-light text-[#4a3227] leading-[1.1] mb-6 md:mb-8">
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
                
            </div>
        </section>
    )
}

export default NatureWithSoul
