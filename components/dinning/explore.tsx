"use client"

import React from 'react'
import { motion } from 'framer-motion'
import TextScrollReveal from '../reuseable/TextScrollReveal'

const Explore = () => {
    // We split the text into two variables to maintain the two distinct brand colors using 
    // the generic reusable string-based component.
    const text1 = "Discover thoughtfully prepared dishes, comforting flavours, and simple details that make every meal feel easy."
  

    return (
        <section className="w-full bg-[#FFFFFF] py-24 md:py-40 px-4 md:px-8 flex flex-col items-center justify-center text-center overflow-hidden">
            
            {/* Top Subtitle Component */}
            <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-xs md:text-base font-light uppercase text-[#2A0800] mb-4 md:mb-6"
            >
                • EXPLORE OUR HOTEL •
            </motion.p>

            <div className="max-w-7xl mx-auto text-[32px] sm:text-5xl md:text-6xl lg:text-[68px] font-normal leading-tight md:leading-[1.3] tracking-tight">
                
                <TextScrollReveal 
                    text={text1} 
                    className="text-[#3D2E26] inline" 
                />                
            </div>

        </section>
    )
}

export default Explore