'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Snowflake } from 'lucide-react'

import summer from '@/assets/things-to-do/summer_bg.jpg'
import winter from '@/assets/things-to-do/winter_bg.jpg'
import { SeasonOverlay } from './SeasonOverlay'

const LetsExplore = () => {
    const [activeSeason, setActiveSeason] = useState<'summer' | 'winter' | null>(null)

    return (
        <section className="bg-[#0A0A0A] min-h-[90vh] flex flex-col justify-center text-white py-24 px-[5%] md:px-[5%] relative">
            <div className="max-w-7xl mx-auto w-full">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-5 md:gap-20 mb-10 md:mb-32">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-[1.5rem] md:text-[3rem] font-medium leading-[1.1] tracking-tight max-w-xl"
                    >
                        Lets explore <br /> 
                        the world together
                    </motion.h2>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-base md:text-right md:text-2xl md:max-w-xl md:pt-4"
                    >
                        Trek through vibrant summer trails or glide through snowy winter slopes each season invites you to explore, discover, and experience nature in a new way.
                    </motion.p>
                </div>

                {/* Choose Season Title */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="flex flex-col items-center mb-5 md:mb-16"
                >
                    <span className="text-base md:text-3xl font-semibold uppercase text-white">
                        Choose Season
                    </span>
                </motion.div>

                {/* Seasonal Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 px-[5%]">
                    {/* Summer Card */}
                    <div className="relative w-full aspect-4/3 md:aspect-3/2 rounded-2xl md:rounded-4xl overflow-hidden cursor-pointer group" onClick={() => setActiveSeason('summer')}>
                        <motion.div layoutId="season-card-summer" className="absolute inset-0 w-full h-full bg-black">
                            <motion.div layoutId="season-image-wrap-summer" className="relative w-full h-full">
                                <Image src={summer} alt="Summer Season" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                            </motion.div>
                        </motion.div>
                        
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                            <button className="px-4 md:px-8 py-2 md:py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/20 flex items-center gap-3 shadow-2xl hover:bg-white/10 transition-colors">
                                <Sun className="w-4 h-4 md:w-5 md:h-5 text-amber-400 fill-amber-400" />
                                <span className="font-medium md:font-semibold tracking-wider text-xs md:text-sm">SUMMER</span>
                            </button>
                        </div>
                    </div>

                    {/* Winter Card */}
                    <div className="relative w-full aspect-4/3 md:aspect-3/2 rounded-4xl overflow-hidden cursor-pointer group" onClick={() => setActiveSeason('winter')}>
                        <motion.div layoutId="season-card-winter" className="absolute inset-0 w-full h-full bg-black">
                            <motion.div layoutId="season-image-wrap-winter" className="relative w-full h-full">
                                <Image src={winter} alt="Winter Season" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                            </motion.div>
                        </motion.div>

                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                            <button className="px-4 md:px-8 py-2 md:py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/20 flex items-center gap-3 shadow-2xl hover:bg-white/10 transition-colors">
                                <Snowflake className="w-4 h-4 md:w-5 md:h-5 text-blue-300 fill-blue-300" />
                                <span className="font-medium md:font-semibold tracking-wider text-xs md:text-sm">WINTER</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* FULL SCREEN OVERLAY */}
            <AnimatePresence>
                {activeSeason && (
                    <SeasonOverlay 
                        key="season-overlay"
                        activeSeason={activeSeason} 
                        onClose={() => setActiveSeason(null)}
                        imageSrc={activeSeason === 'summer' ? summer : winter}
                    />
                )}
            </AnimatePresence>
        </section>
    )
}

export default LetsExplore