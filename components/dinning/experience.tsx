"use client"

import React from 'react'
import image1 from '@/assets/dining/getaway-1.png'
import image2 from '@/assets/dining/getaway-2.png'
import image3 from '@/assets/dining/getaway-3.png'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Experience = () => {
  return (
    <section className="w-full py-[30%] md:py-20 px-4 md:px-8 bg-[#FFF7E057] overflow-hidden">
      <div className="flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="font-medium text-sm md:text-xl md:mb-4 mb-2 text-[#1a1a1a]">
            -Mountain Retreat Experience-
          </p>
          <h2 className="text-xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#1a1a1a] uppercase">
            Your Mountain Getaway
          </h2>
        </motion.div>

      
        <div className="relative w-full max-w-7xl mx-auto mb-10 sm:mb-24 px-2 sm:px-8">
          <div className="flex justify-between items-start">
         
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="w-[47%] md:w-[45%] aspect-[1.6] rounded-3xl overflow-hidden relative shadow-lg"
            >
              <Image 
                src={image1} 
                alt="Mountain retreat food left" 
                fill 
                className="object-cover" 
                // sizes="(max-width: 768px) 50vw, 33vw"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="w-[47%] md:w-[45%] aspect-[1.6] rounded-3xl overflow-hidden relative shadow-lg"
            >
              <Image 
                src={image3} 
                alt="Mountain retreat food right" 
                fill 
                className="object-cover" 
                // sizes="(max-width: 768px) 50vw, 33vw"
              />
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-[55%] md:w-[50%] aspect-[1.6] rounded-3xl overflow-hidden relative mx-auto -mt-[20%] md:-mt-[18%] shadow-2xl z-10"
          >
            <Image 
              src={image2} 
              alt="Mountain retreat food center" 
              fill 
              className="object-cover" 
            //   sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>

        {/* Bottom Text */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="md:max-w-4xl text-center md:px-4"
        >
          <p className="text-sm md:text-lg lg:text-xl font-medium leading-relaxed md:leading-loose text-[#1a1a1a]">
            Experience The Beauty Of Nature At Cairn Hotel, Where Breathtaking Red Rock Landscapes And Peaceful Mountain Surroundings Create The Perfect Setting For Relaxation And Adventure.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience