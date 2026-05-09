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
            ref={sectionRef}
            className="w-full py-24 md:py-32 lg:py-52 bg-white flex flex-col items-center justify-center px-6 lg:px-12 relative overflow-hidden"
        >
            {/* Decorative geometric shapes – top right */}
            <div className="absolute top-0 right-0 w-[480px] h-[680px] pointer-events-none select-none">
                {/* Sage green */}
                <div
                    className="absolute top-[-20px] right-[-70px] w-[340px] h-[280px] bg-[#9BAA8A]"
                    style={{ clipPath: 'polygon(18% 0%, 100% 0%, 100% 82%, 82% 100%, 0% 100%, 0% 18%)' }}
                />
                {/* Peach / warm terracotta */}
                <div
                    className="absolute top-[210px] right-[-90px] w-[400px] h-[270px] bg-[#CC9060]"
                    style={{ clipPath: 'polygon(18% 0%, 100% 0%, 100% 82%, 82% 100%, 0% 100%, 0% 18%)' }}
                />
                {/* Dusty rose / mauve */}
                <div
                    className="absolute top-[420px] right-[-50px] w-[440px] h-[290px] bg-[#A87878]"
                    style={{ clipPath: 'polygon(18% 0%, 100% 0%, 100% 82%, 82% 100%, 0% 100%, 0% 18%)' }}
                />
            </div>

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

            {/* Left-aligned body paragraph */}
            <div
                ref={ctaRef}
                className="max-w-[1214px] w-full"
            >
                <p className="text-lg md:text-2xl lg:text-[38px] font-sans font-medium leading-[50px] tracking-normal text-[#111111] max-w-[1061px]">
                    The Cairn Hotel is an elegant retreat in the heart of Cedar City, Utah, where nature-inspired design meets modern comfort. Thoughtfully curated accommodations offer warmth, relaxation, and a refined sense of place, surrounded by the region&apos;s breathtaking red rock landscapes and serene mountain views. Whether visiting for adventure, business, or a peaceful escape, guests will find a welcoming stay rooted in comfort, hospitality, and the beauty of Southern Utah
                </p>
            </div>
        </section>
    )
}

export default Discover
