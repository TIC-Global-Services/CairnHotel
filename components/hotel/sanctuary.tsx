'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import alpenglow from '@/assets/hotel/Alpenglow.jpg'
import highlands from '@/assets/hotel/Highlands.jpg'
import scenic from '@/assets/hotel/scenic_view.jpg'

const Sanctuary = () => {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    })

    // Parallax effects for images
    const yTopLeft = useTransform(scrollYProgress, [0, 1], [40, -40])
    const yTopRight = useTransform(scrollYProgress, [0, 1], [60, -60])
    const yBottomCenter = useTransform(scrollYProgress, [0, 1], [-20, 20])

    return (
        <section
            ref={containerRef}
            className="relative w-fulln h-screen bg-white overflow-hidden flex items-center justify-center  font-sans tracking-wide"
        >
            {/* Background Text Stack */}
            <div className="absolute inset-0 flex flex-col items-center justify-center md:translate-y-[-5%] pointer-events-none">
                {/* Top Text - lightly visible top half */}
                <div className="overflow-hidden h-[15vw] md:h-[10vw] flex items-end justify-center">
                    <h2 className="text-[20vw] md:text-[10vw] font-medium text-gray-200 leading-none translate-y-[20%] uppercase">
                        Sanctuary
                    </h2>
                </div>
                
                {/* Middle Text - medium visible top half */}
                <div className="overflow-hidden h-[15vw] md:h-[8vw] flex items-end justify-center">
                    <h2 className="text-[20vw] md:text-[11vw] font-medium text-gray-300 leading-none translate-y-[25%] uppercase">
                        Sanctuary
                    </h2>
                </div>

                {/* Bottom Text - completely visible */}
                <div className="flex items-center justify-center">
                    <h2 className="text-[20vw] md:text-[12vw] font-medium text-[#4a3227] leading-none uppercase">
                        Sanctuary
                    </h2>
                </div>
            </div>

            {/* Images Container */}
            <div className="relative w-full h-full ">
                {/* Top Left - SCENIC VIEW */}
                <motion.div
                    style={{ y: yTopLeft }}
                    className="absolute top-[10%] md:top-[5%] left-[5%] md:left-[3%] flex flex-col items-center group cursor-pointer"
                >
                    <span className="text-black font-normal tracking-widest  md:text-3xl group-hover:-translate-y-1 transition-transform duration-300">
                        SCENIC VIEW
                    </span>
                    <div className="w-[140px] h-[140px] md:w-[220px] md:h-[250px] relative rounded-xl overflow-hidden shadow-xl">
                        <Image
                            src={scenic}
                            alt="Scenic View"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    </div>
                </motion.div>

                {/* Top Right - HIGHLANDS */}
                <motion.div
                    style={{ y: yTopRight }}
                    className="absolute top-[10%] md:top-[5%] right-[5%] md:right-[3%] flex flex-col items-center group cursor-pointer"
                >
                    <span className="text-black font-normal tracking-widest md:text-3xl group-hover:-translate-y-1 transition-transform duration-300">
                        HIGHLANDS
                    </span>
                    <div className="w-[140px] h-[140px] md:w-[220px] md:h-[250px] relative rounded-xl overflow-hidden shadow-xl">
                        <Image
                            src={highlands}
                            alt="Highlands"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    </div>
                </motion.div>

                {/* Bottom Center - ALPENGLOW */}
                <motion.div
                    style={{ y: yBottomCenter }}
                    className="absolute bottom-[10%] md:bottom-[2%] left-1/2 -translate-x-1/2 flex flex-col items-center group cursor-pointer z-10 pt-10"
                >
                    <div className="w-[350px] h-[160px] md:w-[480px] md:h-[240px] relative rounded-xl overflow-hidden shadow-2xl mb-4">
                        <Image
                            src={alpenglow}
                            alt="Alpenglow"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    </div>
                    <span className="text-black font-light tracking-widest md:text-3xl group-hover:translate-y-1 transition-transform duration-300">
                        ALPENGLOW
                    </span>
                </motion.div>
            </div>
        </section>
    )
}

export default Sanctuary