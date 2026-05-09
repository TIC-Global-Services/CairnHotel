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
            className="w-full py-24 md:py-32 lg:py-52 bg-white flex flex-col items-center justify-center px-6 lg:px-12 relative overflow-hidden"
        >
            {/* Centered heading */}
            <div className="max-w-[1214px] w-full text-center flex flex-col items-center">
                <p
                    ref={textRef}
                    className="text-xl md:text-2xl lg:text-[50px] font-sans font-normal leading-[86.4px] tracking-normal mb-8 md:mb-12 text-[#888888]"
                >
                    The new Cairn Hotel features inviting interiors,<br />
                    nature-inspired earth tones, and thoughtful design<br />
                    details that reflect the warmth, refinement, and<br />
                    natural beauty of Southern Utah
                </p>
            </div>


        </section>
    )
}

export default Discover
