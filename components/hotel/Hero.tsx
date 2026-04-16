'use client'

import React, { useRef, memo } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import layer1 from '@/assets/hotel/hero/Layer1.png'
import layer2 from '@/assets/hotel/hero/layer2.png'
import layer3 from '@/assets/hotel/hero/layer3.png'
import layer4 from '@/assets/hotel/hero/layer4.png'
import layer5 from '@/assets/hotel/hero/layer5.png'
import trucking from '@/assets/hotel/trucking.svg'
import mountain from '@/assets/hotel/mountain.svg'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP)
}

const LAYER_CONFIG = [
    {
        src: layer5,
        alt: 'Sky',
        z: 'z-0',
        yPercent: 10,
        priority: true
    },

    {
        src: layer4,
        alt: 'Far cliff',
        z: 'z-10',
        yPercent: 8,
        priority: false
    },

    {
        src: layer3,
        alt: 'Mid cliff',
        z: 'z-[15]',
        yPercent: 15,
        priority: false
    },

    {
        src: layer2,
        alt: 'Center rock',
        z: 'z-[25]',
        yPercent: 5,
        priority: false
    },

    {
        src: layer1,
        alt: 'Foreground wall',
        z: 'z-[35]',
        yPercent: 25,
        priority: true
    },
] as const

const Hero = memo(() => {
    const containerRef = useRef<HTMLDivElement>(null)
    const layerRefs = useRef<(HTMLImageElement | null)[]>([])

    const hotelTextRef = useRef<HTMLDivElement>(null)
    const descTextRef = useRef<HTMLDivElement>(null)
    const discoverRef = useRef<HTMLDivElement>(null)
    const adventureRef = useRef<HTMLDivElement>(null)
    const discoveryRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        requestAnimationFrame(() => {
            gsap.set([adventureRef.current, discoveryRef.current], {
                opacity: 0,
                force3D: true,
            })
            gsap.set(layerRefs.current.filter(Boolean), { force3D: true })


            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1.2,
                    fastScrollEnd: true,
                    preventOverlaps: true,
                },
            })

        LAYER_CONFIG.forEach((cfg, i) => {
                const el = layerRefs.current[i]
                if (el) tl.to(el, { yPercent: cfg.yPercent, force3D: true, ease: 'none' }, 0)
            })

            tl.to(hotelTextRef.current, { yPercent: -35, force3D: true, ease: 'none' }, 0)
            tl.to(descTextRef.current, { yPercent: -25, force3D: true, ease: 'none' }, 0)
            tl.to(discoverRef.current, { yPercent: -35, force3D: true, ease: 'none' }, 0)
            gsap.fromTo(adventureRef.current,
                { xPercent: 20, opacity: 0 },
                {
                    xPercent: 0, opacity: 1, force3D: true, ease: 'power2.out',
                    scrollTrigger: {
                        trigger: adventureRef.current,
                        start: 'top 90%',
                        end: 'top 55%',
                        scrub: 1,
                        fastScrollEnd: true,
                    },
                }
            )

            gsap.fromTo(discoveryRef.current,
                { xPercent: -20, opacity: 0 },
                {
                    xPercent: 0, opacity: 1, force3D: true, ease: 'power2.out',
                    scrollTrigger: {
                        trigger: discoveryRef.current,
                        start: 'top 90%',
                        end: 'top 55%',
                        scrub: 1,
                        fastScrollEnd: true,
                    },
                }
            )
        })
    }, { scope: containerRef })

    return (
        <div ref={containerRef} className="relative w-full overflow-hidden"> 
            <div className="absolute inset-0 w-full h-full">
                {LAYER_CONFIG.map((cfg, i) => (
                    <Image
                        key={cfg.alt}
                        ref={(el) => { layerRefs.current[i] = el }}
                        src={cfg.src}
                        alt={cfg.alt}
                        sizes="100vw"
                        loading={cfg.priority ? undefined : 'lazy'}
                        priority={cfg.priority}
                        className={`absolute inset-0 w-full h-full object-cover object-top pointer-events-none ${cfg.z}`}
                        style={{ willChange: 'transform' }}
                    />
                ))}

                
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60 pointer-events-none z-[38]" />
            </div>

            
            <div className="relative z-[10]">

                
                <div className="flex flex-col items-center justify-center z-10 pt-[28vh] md:pt-[30vh] pb-[5vh] md:pb-[25vh]">
                    <div ref={hotelTextRef} style={{ willChange: 'transform' }}>
                        <h1 className="text-[6rem] md:text-[10rem] lg:text-[14rem] leading-none font-semibold uppercase text-white select-none mix-blend-overlay opacity-90">
                            HOTEL
                        </h1>
                    </div>

                    <div ref={descTextRef} className="mt-4 md:mt-6 max-w-2xl  text-center px-6" style={{ willChange: 'transform' }}>
                        <p className="text-white/80 text-[11px] md:text-sm lg:text-xl leading-relaxed tracking-wide capitalize">
                            Cairn Hotel Is A Place Where Timeless Design, Natural Materials,
                            And Hospitality Come Together To Create An Experience
                            That Is Thoughtfully Crafted To Reflect Harmony With Nature.
                        </p>
                    </div>

                    <div ref={discoverRef} className="hidden md:flex mt-6 md:mt-8 flex-col items-center gap-2" style={{ willChange: 'transform' }}>
                        <span className="text-white/70 text-xs md:text-sm tracking-[0.2em] uppercase">
                            Discover
                        </span>
                        <svg width="12" height="24" viewBox="0 0 12 24" fill="none" className="text-white/50">
                            <path d="M6 0v22M1 17l5 5 5-5" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className='relative z-[40]'>

                <div className="flex justify-center md:justify-end px-6 md:px-16 lg:px-24 pb-[3vh] md:pb-[22vh]">
                    <div ref={adventureRef} className="max-w-xl flex flex-col items-start text-center md:block md:text-left" style={{ willChange: 'transform, opacity' }}>
                        <div className="mb-3 md:mb-4">
                        <Image src={trucking} alt="trucking" width={28} height={28} />
                        </div>

                        <h2 className="text-xl md:text-2xl lg:text-3xl font-medium md:font-bold text-white leading-tight mb-3 md:mb-4 tracking-tight">
                            Adventures Begin At The Cairn
                        </h2>

                        <p className="text-white text-xs md:text-xl text-left leading-relaxed mb-5 md:mb-6 max-w-3xl capitalize">
                            The Cairn Hotel Is The Perfect Retreat For Hiking
                            Enthusiasts, Surrounded By Scenic Mountain Trails
                            And Breathtaking Natural Landscapes.
                            A Place Where Adventure Meets Comfort.
                        </p>

                        <button className="px-6 md:px-8 py-2.5 md:py-3 bg-white md:bg-white/10 backdrop-blur-md border border-white md:border-white/40 rounded-full text-black md:text-white uppercase tracking-[0.2em] md:font-normal font-semibold text-[10px] md:text-xs hover:bg-white/25 transition-all duration-300 cursor-pointer">
                            Explore More
                        </button>
                    </div>
                </div>

      
                <div className="flex justify-start px-6 md:px-16 lg:px-24 pb-[8vh] md:pb-[16vh]">
                    <div ref={discoveryRef} className="max-w-xl flex flex-col items-start text-center md:block md:text-left" style={{ willChange: 'transform, opacity' }}>
                        <div className="mb-3">
                            <Image src={mountain} alt="mountain" width={32} height={24} />
                        </div>

                        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white leading-tight mb-2 md:mb-3 tracking-tight">
                            Discovery Southern Utah
                        </h2>

                        <p className="text-white text-xs md:text-xl text-left leading-relaxed mb-4 md:mb-5 max-w-3xl capitalize">
                            Surrounded By Breathtaking Landscapes, The Cairn
                            Hotel Offers Access To A Variety Of Scenic Mountain
                            Routes Perfect For Hikers And Nature Enthusiasts.
                        </p>

                        <button className="px-5 md:px-7 py-2 md:py-2.5 bg-white md:bg-white/10 backdrop-blur-md border border-white md:border-white/40 rounded-full text-black md:text-white uppercase tracking-[0.2em] md:font-normal font-semibold text-[10px] md:text-xs hover:bg-white/25 transition-all duration-300 cursor-pointer">
                            Explore More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
})

Hero.displayName = 'Hero'
export default Hero