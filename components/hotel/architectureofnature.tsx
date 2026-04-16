"use client"
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import nature1 from '@/assets/hotel/nature-1.jpg'
import nature2 from '@/assets/hotel/nature-2.jpg'
import nature3 from '@/assets/hotel/nature-3.jpg'
import nature4 from '@/assets/hotel/nature-4.jpg'

const data = [
    {
        image: nature1,
        title: "CEDAR BREAKS",
        description: "STATE PARK . ONE DAY PARK"
    },
    {
        image: nature2,
        title: "ZION NATIONAL PARK",
        description: "TOP 10 NATIONAL PARK IN THE USA"
    },
    {
        image: nature3,
        title: "BRYCE CANYON NATIONAL PARK",
        description: "TOP 10 NATIONAL PARK IN THE USA"
    },
    {
        image: nature4,
        title: "KOLOB CANYONS",
        description: "SCENIC DISTRICT"
    }
]

const ArchitectureOfNature = () => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            let mm = gsap.matchMedia();

            // Desktop Performance Optimized Animation
            mm.add("(min-width: 768px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: "20% top",
                        end: "bottom 20%",
                        scrub: 1.5, // 1.5 for buttery smooth tracking
                        pin: true,
                        anticipatePin: 1,
                    }
                });

                // 1. Arrange straight perfectly horizontally arrayed
                tl.to('.nature-card', {
                    y: 0,
                    duration: 2,
                    ease: "power2.inOut"
                }, 0);

                tl.to(wrapperRef.current, {
                    x: "-42vw",
                    duration: 2,
                    ease: "power2.inOut"
                }, 0);
   
                tl.to(containerRef.current, {
                    y: "10vh",
                    duration: 2,
                    ease: "power2.inOut"
                }, 0);

        
                tl.fromTo(".bg-text",
                    { opacity: 0.1, y: 100 },
                    { opacity: 0.25, y: -50, duration: 2, ease: "none" },
                    0
                );
            });

            mm.add("(max-width: 767px)", () => {
                // Restore native vertical scrolling for mobile by skipping the pin logic
            });

        }, triggerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={triggerRef} className="relative w-full h-auto md:h-[130dvh] bg-[#f5f3f0] overflow-hidden">
            <div className="relative w-full h-full flex flex-col items-center pt-12 md:pt-20 lg:pt-24 px-4 lg:px-24">

                {/* Header Content */}
                <div className="w-full flex flex-col lg:flex-row justify-between items-start md:items-center gap-6 lg:gap-8 z-10">
                    <div className="flex flex-col">
                        <h2 className="text-sm md:text-[2.75rem] font-bold md:font-semibold text-[#352520]  whitespace-nowrap leading-none tracking-wide">
                            THE ARCHITECTURE OF
                        </h2>
                        <h2 className="text-sm md:text-5xl font-medium italic text-[#5c4033] mt-0.5 md:mt-2">
                            NATURE
                        </h2>
                    </div>
                    <p className="max-w-xl text-[#352520] text-[10px] md:text-2xl leading-relaxed md:leading-relaxed font-normal md:font-light">
                        Cairn Hotel Is Designed To Exist In Harmony With The
                        Mountains. Inspired By Natural Stone, Open Landscapes,
                        And Timeless Alpine Structures.
                    </p>
                </div>

                {/* Cards Container */}
                {/* flex-1 w/ items-center automatically handles vertical math boundaries so children won't clip */}
                <div ref={containerRef} className="relative flex-1 w-full flex items-center justify-start z-10 overflow-visible mt-10 md:mt-0">


                    <div ref={wrapperRef} className="flex flex-col md:flex-row gap-6 md:gap-[3vw] pl-0 md:pl-[11vw] w-full md:w-max items-center pb-24 md:pb-0 z-10">
                        {data.map((item, index) => (
                            <div
                                key={index}
                                className={`nature-card flex-shrink-0 w-[55vw] md:w-[24vw] bg-white p-3 md:p-5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)] rounded-sm border border-black/5
                                    ${index === 0 ? 'md:-translate-y-8' : ''}
                                    ${index === 1 ? 'md:translate-y-20' : ''}
                                    ${index === 2 ? 'md:-translate-y-2' : ''}
                                    ${index === 3 ? 'md:translate-y-32' : ''}
                                `}
                            >
                                <div className="relative aspect-4/5 overflow-hidden mb-4 md:mb-5">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 hover:scale-105"
                                        sizes="(max-width: 768px) 80vw, 24vw"
                                    />
                                </div>
                                <h3 className="text-xs md:text-[14px] font-extrabold text-[#1a1a1a] mb-1.5 md:mb-2 tracking-wide uppercase">
                                    {item.title}
                                </h3>
                                <p className="text-[9px] md:text-[10px] text-[#6b6b6b] uppercase tracking-[0.15em] font-bold">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Background Large Text */}
                <div className="bg-text absolute bottom-0 md:bottom-[-5%] left-0 w-full pointer-events-none select-none z-0 overflow-hidden flex justify-center pb-4 md:pb-0">
                    <h1 className="text-[17vw] md:text-[11vw] font-bold text-[#e1dbd6] md:text-black leading-none whitespace-nowrap">
                        SOUTHERN UTAH
                    </h1>
                </div>

            </div>
        </section>
    )
}

export default ArchitectureOfNature



