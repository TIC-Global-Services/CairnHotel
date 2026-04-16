'use client'

import React from 'react'
import { motion } from 'framer-motion'
import abstractshap from '@/assets/Home/Abstract-shape.png'
import Image from 'next/image'

const Unforgettable = () => {
  return (
    <section className="relative w-full py-30 lg:py-48 bg-[#FCFBF8] overflow-hidden">
      <div className=" px-6 md:px-12 xl:px-24 flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* Left Side: Text Content */}
        <div className="w-full lg:w-[60%] flex flex-col gap-10 z-10">
          <p className="text-[#333333] text-sm md:text-lg lg:text-xl font-normal md:leading-relaxed leading-snug font-sans tracking-wide">
            Host unforgettable private events at Cairn Hotel, where elegant spaces and thoughtful service come together to create seamless experiences. From corporate meetings and workshops to intimate celebrations and special occasions, each event is tailored to your needs with flexible setups, modern amenities, and curated catering.
          </p>
          <p className="text-[#333333] text-sm md:text-lg lg:text-xl font-normal md:leading-relaxed leading-snug font-sans tracking-wide">
            Whether you&apos;re gathering for business or celebration, every detail is designed to ensure comfort, style, and lasting impressions. At Cairn Hotel, every private event is crafted to feel both effortless and exceptional. With versatile venues, refined interiors, and a dedicated team handling every detail, your gatherings—be it corporate functions, social celebrations, or intimate occasions—are elevated into memorable experiences.
          </p>
        </div>

        {/* Right Side: Image Alignment */}
        <div className="w-full lg:w-[60%] h-[500px] lg:h-[120vh] absolute -right-[55%] md:-right-[20%]">
            <motion.div 
              className="relative w-full h-full"
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
                <Image 
                    src={abstractshap} 
                    alt="abstract-shape" 
                    fill 
                    className='object-cover object-right opacity-20'
                    priority
                />
            </motion.div>
        </div>

      </div>
    </section>
  )
}

export default Unforgettable