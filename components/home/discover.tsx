"use client"
import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Discover = () => {
    const sectionRef = useRef<HTMLElement>(null)
    const textRef = useRef<HTMLParagraphElement>(null)
    const ctaRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (!textRef.current) return

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
            }
        })

        tl.from(textRef.current, {
            y: 30,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        })

    }, { scope: sectionRef })

    return (
        <section
            ref={sectionRef}
            className="w-full pt-24 md:pt-32 lg:pt-52 pb-16 md:pb-20 lg:pb-32 bg-white flex flex-col items-center justify-center px-2 lg:px-12 relative overflow-hidden"
        >
            {/* Centered heading */}
            <div className="max-w-[1214px] w-full text-center flex flex-col items-center">
                <p
                    ref={textRef}
                    className="text-xl md:text-2xl lg:text-[50px] font-sans font-normal leading-[1.5] md:leading-[1.8] lg:leading-[2] tracking-normal mb-8 md:mb-12 bg-gradient-to-b from-[#4D2F27] via-[#331F1A]/75 to-black/30 bg-clip-text text-transparent"
                >
                    The new Cairn Hotel features inviting interiors,<br />
                    nature-inspired earth tones, and thoughtful design<br />
                    details that reflect the warmth, refinement, and<br />
                    natural beauty of Southern Utah
                </p>

                {/* Mobile-only: DISCOVER + downward arrow */}
                <div className="flex md:hidden items-center gap-2 mt-10 text-[#4D2F27]">
                    <span className="text-base font-normal tracking-[0.1em] uppercase">Discover</span>
                    <ArrowDown className="w-4 h-4" strokeWidth={2} />
                </div>
            </div>


        </section>
    )
}

export default Discover
