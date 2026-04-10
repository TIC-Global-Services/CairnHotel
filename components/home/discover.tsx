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
        if (!textRef.current || !ctaRef.current) return

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
        .from(ctaRef.current, {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        }, "-=0.8")

    }, { scope: sectionRef })

    return (
        <section 
          
            className="w-full py-24 md:py-32 lg:py-52 bg-[#FCFAF8] flex flex-col items-center justify-center px-6 lg:px-12"
        >
            <div className="max-w-4xl w-full text-center flex flex-col items-center">
                <p 
                    ref={textRef}
                    className="text-2xl md:text-3xl lg:text-[50px] font-sans font-normal leading-[1.35] md:leading-relaxed tracking-tight mb-16 md:mb-24 bg-linear-to-b from-[#4D2F27] via-[#331F1ABF] via-27% to-[#331F1ABF] to-[75.08%] bg-clip-text text-transparent"
                >
                    Cozy interiors, earthy tones inspired by nature, and thoughtfully crafted details that make every stay at The Cairn Hotel feel warm, refined, and truly personal.
                </p>

                
                <div 
                    ref={ctaRef}
                    className="flex flex-col items-center gap-3 group cursor-pointer"
                >
                    <div className="flex items-center justify-center gap-3">
                        <span className="text-base md:text-2xl font-sans tracking-[0.35em] font-medium text-[#4D2F27] uppercase">
                            Discover
                        </span>
                        <ArrowDown className='text-[#4D2F27] size-6'/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Discover
