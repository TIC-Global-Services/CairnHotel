'use client'

import React from 'react'
import { motion } from 'framer-motion'
import abstractshap from '@/assets/Home/Abstract-shape.png'
import Image from 'next/image'

const Unforgettable = () => {
  return (
    <section className="relative w-full py-30 lg:py-48 bg-[#FCFBF8] overflow-hidden">
      <div className=" px-6 md:px-12 xl:px-24 flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* Left Side: Text Content — matching Figma 778x484 container */}
        <div className="w-full lg:max-w-[778px] flex flex-col z-10 lg:ml-[117px] mt-[50px] lg:mt-0">
          <p className="text-[#333333] text-lg md:text-[24px] font-normal leading-[1.4] md:leading-[33px] tracking-[0.07em] font-sans mb-0">
            Located in the heart of Cedar City, Utah, The Cairn Hotel offers an elegant setting, attentive service, and flexible event support for gatherings of all kinds. From intimate celebrations to corporate meetings and special events, our team is here to help create a seamless and memorable experience.
          </p>
          <p className="text-[#333333] text-lg md:text-[24px] font-normal leading-[1.4] md:leading-[33px] tracking-[0.07em] font-sans">
            With a spacious banquet hall, off-site catering options, and partnerships with trusted local event venues, The Cairn Hotel makes planning simple and personalized. Whether you are hosting a wedding celebration, business meeting, retreat, or social gathering, we&apos;ll help bring your vision to life with care, detail, and genuine hospitality.
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