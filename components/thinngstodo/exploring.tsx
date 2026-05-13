"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

import exploring1 from '@/assets/things-to-do/exploring-1.jpg'
import exploring2 from '@/assets/things-to-do/exploring-2.png'
import exploring3 from '@/assets/things-to-do/exploring-3.jpg'


const images = [exploring1, exploring2, exploring3]

const Exploring = () => {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    return (
        <section className="w-full bg-white flex max-h-screen items-center justify-center mt-5 mb-10 md:mb-0 lg:py-20 px-4 lg:px-12 overflow-hidden">
            <div className="w-full md:px-[5%] flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                
                {/* Left Text Content */}
                <div className="w-full lg:w-[45%] flex flex-col items-start justify-center order-2 lg:order-1">
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-xs sm:text-xs font-semibold tracking-[3.12px] text-[#132430] uppercase mb-3 lg:mb-8"
                    >
                        Explore Places
                    </motion.p>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-[1.5rem] sm:text-[4rem] lg:text-6xl font-semibold text-[#0c1627] leading-[1.05] tracking-tight mb-6 lg:mb-8"
                    >
                        Exploring <br className="hidden lg:block"/>
                        Utah's<br />
                        Scenery
                    </motion.h2>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-sm sm:text-lg lg:text-lg font-normal text-[#132430CC] leading-[1.5] max-w-md"
                    >
                        Experience the raw beauty of Utah, where dramatic canyons, towering peaks, and endless landscapes create unforgettable views. Every journey reveals a new perspective of nature's breathtaking artistry.
                    </motion.p>
                </div>

                {/* Right Image Container (Crossfade Slider) */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="w-full lg:w-[40%] relative aspect-[2/3] lg:aspect-[3/4] rounded-xl overflow-hidden shadow-2xl bg-gray-100 order-1 lg:order-2"
                >
                    <AnimatePresence>
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            <Image 
                                src={images[currentIndex]} 
                                alt={`Utah Scenery ${currentIndex + 1}`} 
                                fill 
                                className="object-cover"
                                priority={currentIndex === 0}
                            />
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
                
            </div>
        </section>
    )
}

export default Exploring