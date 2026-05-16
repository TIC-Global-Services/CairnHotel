"use client"
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import storyofcarinimg from '@/assets/hotel/story_of_carin.jpg'
import abstractShape from '@/assets/Home/Abstract-shape.png'

const StoryOfCairn = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Animate Background Graphic
            gsap.fromTo('.bg-shape', 
                { opacity: 0, x: 100 },
                { 
                    opacity: 0.1, 
                    x: 0, 
                    duration: 1.5, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                }
            );

            // Animate Image
            gsap.fromTo(imageRef.current,
                { opacity: 0, x: -50, scale: 0.95 },
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    }
                }
            );

            // Animate Content
            const elements = contentRef.current?.children;
            if (elements) {
                gsap.fromTo(Array.from(elements),
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 60%",
                        }
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full min-h-dvh bg-[#0c0705] flex items-center justify-center overflow-hidden pt-[2dvh] pb-[10dvh] md:py-[10dvh] px-6 lg:px-24">
            {/* Background Graphic */}
            <div className="bg-shape absolute -right-80 top-1/2 -translate-y-1/2 w-[60%] h-full opacity-50 pointer-events-none select-none">
                <Image
                    src={abstractShape}
                    alt="background graphic"
                    fill
                    className="object-contain object-right"
                />
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center gap-12 lg:gap-32">
                {/* Left Side: Image */}
                <div ref={imageRef} className="w-full lg:w-1/2 flex items-center justify-center">
                    <div className="relative aspect-[4/5] h-[537px] md:h-auto md:w-full w-auto max-w-[600px] max-h-[80dvh] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        <Image
                            src={storyofcarinimg}
                            alt="The Cairn Hotel Legacy"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Right Side: Content */}
                <div ref={contentRef} className="w-full lg:w-1/2 flex flex-col items-start gap-4 md:gap-8 pl-2 md:pl-0 ">
                    <span className="text-[8px] md:text-[10px] font-semibold tracking-[0.4em] uppercase text-[#FFFFFFCC]">
                        OUR LEGACY
                    </span>
                    
                    <h2 className="text-2xl md:text-6xl lg:text-[2.5rem] font-semibold text-white leading-[1.1] tracking-tight">
                         THE STORY OF <br />
                        THE CAIRN HOTEL
                    </h2>

                    <p className="text-sm md:text-lg text-[#b8b8b8] max-w-lg leading-relaxed font-light">
                        Born from a passion for hospitality and a deep appreciation for nature, The Cairn Hotel was created as a peaceful retreat for travellers seeking comfort, elegance, and meaningful experiences. Inspired by the beauty of its surroundings, the hotel reflects a perfect harmony between modern luxury and timeless charm.
                    </p>


                </div>
            </div>
        </section>
    )
}

export default StoryOfCairn
