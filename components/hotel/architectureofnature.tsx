"use client"
import React, { useEffect, useRef, useState } from 'react'
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
        description: "STATE PARK . ONE DAY PARK",
        full_description: "Cedar Breaks National Monument, just 23 miles from The Cairn, rises above 10,000 feet to reveal a breathtaking natural amphitheater of crimson, coral, and amber rock. In summer it blooms with wildflowers. Come winter, its snowfields draw cross-country skiers and those in search of rare mountain stillness."
    },
    {
        image: nature2,
        title: "ZION NATIONAL PARK",
        description: "TOP 10 NATIONAL PARK IN THE USA",
        full_description: "Zion National Park is one of America's most beloved natural wonders, and it is well within reach from Cedar City. Its towering sandstone walls rise thousands of feet above the valley floor, carved over millions of years by the Virgin River. From the iconic Angel's Landing to the cool, narrow corridors of The Narrows."
    },
    {
        image: nature3,
        title: "BRYCE CANYON NATIONAL PARK",
        description: "TOP 10 NATIONAL PARK IN THE USA",
        full_description: "Bryce Canyon National Park, a short drive east, is home to the largest concentration of hoodoos on earth — those extraordinary spires of red, orange, and white rock that glow at sunrise like something from another world. Nearby, the Kolob Canyons section of Zion National Park offers towering cliffs and cathedral-like canyon passages."
    },
    {
        image: nature4,
        title: "KOLOB CANYONS",
        description: "SCENIC DISTRICT",
        full_description: "The Kolob Canyons district of Zion National Park is located at Exit 40 on Interstate 15, 40 miles north of Zion Canyon and 17 miles south of Cedar City. A five-mile scenic drive along the Kolob Canyons Road allows visitors to view the crimson canyons and gain access to various trails and scenic viewpoints. Here in the northwest corner of the park."
    }
]

const ArchitectureOfNature = () => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [selectedCard, setSelectedCard] = useState<number | null>(null);

    useEffect(() => {
        if (selectedCard !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedCard]);

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
        <section ref={triggerRef} className="relative w-full h-auto md:h-[160dvh] bg-[#f5f3f0] overflow-hidden">
            <div className="relative w-full h-full flex flex-col items-center pt-12 md:pt-10 lg:pt-20 px-4 lg:px-24">

                {/* Header Content */}
                <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-0 z-10">
                    <div className="flex flex-col">
                        <h2 className="text-lg md:text-[2.75rem] font-bold md:font-semibold text-[#4D2F27] whitespace-nowrap leading-none tracking-wide">
                            THE ARCHITECTURE OF
                        </h2>
                        <h2 className="text-lg md:text-5xl font-medium italic text-[#4D2F27] mt-0.5 md:mt-2">
                            NATURE
                        </h2>
                    </div>
                    <p className="w-full lg:w-[52%] text-[#352520] text-sm md:text-2xl leading-tight md:leading-tight font-normal md:font-normal">
                        Nestled beneath the towering sandstone cliffs and wide-open skies of canyon country, The Cairn Hotel invites you to slow down and arrive fully. Inspired by the ancient beauty of the Colorado Plateau, with its burning sunsets, silent mesas, and sage-scented air, we reflect a perfect harmony between modern luxury and the timeless character of the American Southwest. This is a place to feel the warmth of the desert, rest deeply, and leave changed.
                    </p>
                </div>

                {/* Cards Container */}
                {/* flex-1 w/ items-center automatically handles vertical math boundaries so children won't clip */}
                <div ref={containerRef} className="relative flex-1 w-full flex items-center justify-start z-10 overflow-visible mt-10 md:mt-0">


                    <div ref={wrapperRef} className="flex flex-col md:flex-row gap-6 md:gap-[3vw] pl-0 md:pl-[11vw] w-full md:w-max items-center pb-24 md:pb-34 z-10">
                        {data.map((item, index) => (
                            <div
                                key={index}
                                className={`nature-card flex-shrink-0 w-[90vw] md:w-[24vw] bg-white p-3 md:p-5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)] rounded-sm border border-black/5
                                    ${index === 0 ? 'md:-translate-y-8' : ''}
                                    ${index === 1 ? 'md:translate-y-20' : ''}
                                    ${index === 2 ? 'md:-translate-y-2' : ''}
                                    ${index === 3 ? 'md:translate-y-32' : ''}
                                `}
                            >
                                <div className="relative aspect-3/2 md:aspect-4/5 overflow-hidden mb-4 md:mb-5">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 hover:scale-105"
                                        sizes="(max-width: 768px) 85vw, 24vw"
                                    />
                                </div>
                                <h3 className="text-xs md:text-base font-semibold text-[#1a1a1a] mb-1.5 md:mb-2 tracking-wide uppercase">
                                    {item.title}
                                </h3>
                                <p className="text-[9px] md:text-sm uppercase font-normal mb-3 md:mb-5">
                                    {item.description}
                                </p>
                                <button
                                    onClick={() => setSelectedCard(index)}
                                    className="text-[10px] md:text-xs font-semibold text-black border-b border-black pb-0.5 hover:text-gray-500 transition-colors uppercase tracking-[0.1em]"
                                >
                                    VIEW MORE
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Background Large Text */}
                <div className="bg-text absolute bottom-0 md:bottom-[-5%] left-0 w-full pointer-events-none select-none z-0 overflow-hidden pb-4 md:pb-0">
                    {/* Desktop: static centered text */}
                    <h1 className="hidden md:flex justify-center text-[11vw] font-bold text-black leading-none whitespace-nowrap">
                        SOUTHERN UTAH
                    </h1>
                    {/* Mobile: marquee scrolling text — 3 copies for seamless loop */}
                    <div className="flex md:hidden animate-marquee-mobile w-max">
                        <span className="text-[17vw] font-bold text-[#e1dbd6] leading-none whitespace-nowrap">
                            SOUTHERN UTAH&nbsp;&bull;&nbsp;
                        </span>
                        <span className="text-[17vw] font-bold text-[#e1dbd6] leading-none whitespace-nowrap">
                            SOUTHERN UTAH&nbsp;&bull;&nbsp;
                        </span>
                        <span className="text-[17vw] font-bold text-[#e1dbd6] leading-none whitespace-nowrap">
                            SOUTHERN UTAH&nbsp
                        </span>
                    </div>
                </div>
            </div>

            {/* Modal Overlay */}
            {selectedCard !== null && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-start p-4 sm:p-6 md:p-12"
                    data-lenis-prevent="true"
                    onWheel={(e) => e.stopPropagation()}
                    onTouchMove={(e) => e.stopPropagation()}
                >
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity cursor-pointer" 
                        onClick={() => setSelectedCard(null)}
                    ></div>
                    
                    {/* Modal Content */}
                    <div className="relative w-full max-w-5xl max-h-[90vh] bg-white shadow-2xl overflow-y-auto md:overflow-hidden  flex flex-col md:flex-row z-10 animate-in fade-in zoom-in-95 rounded-lg duration-200">
                        {/* Close button */}
                        <button 
                            onClick={() => setSelectedCard(null)}
                            className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-md rounded-full text-black hover:bg-gray-200 hover:scale-105 transition-all"
                            aria-label="Close modal"
                        >
                            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>

                        {/* Image Panel */}
                        <div className="w-full md:w-1/2 relative min-h-[40dvh] sm:min-h-[50dvh] md:min-h-[60dvh]">
                            <Image
                                src={data[selectedCard].image}
                                alt={data[selectedCard].title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        
                        {/* Content Panel */}
                        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-14 flex flex-col justify-center bg-[#fdfdfc]">
                            <h3 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] mb-2 uppercase tracking-wide">
                                {data[selectedCard].title}
                            </h3>
                            <p className="text-[10px] md:text-xs text-[#6b6b6b] uppercase tracking-[0.2em] font-medium mb-6 md:mb-10 pb-6 border-b border-gray-200">
                                {data[selectedCard].description}
                            </p>
                            <div className="prose prose-sm md:prose-base text-gray-700 leading-relaxed font-light">
                                <p>{data[selectedCard].full_description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </section>
    )
}

export default ArchitectureOfNature



