"use client"
import React, { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

import exploreBg from '@/assets/hotel/explore_bg.jpg'
import room1 from '@/assets/hotel/hotel_1.jpg'
import room2 from '@/assets/hotel/stay-2.jpg'
import room3 from '@/assets/hotel/stay-3.jpg'
import room4 from '@/assets/Home/hotel-2.jpg'
// import room5 from '@/assets/Home/hotel-5.jpg'
import { 
    Armchair, Wifi, Monitor,
    Sun, Lock, Wine,
    Bath, Droplets, Leaf,
    Building, Utensils, Bell,
    Palette, Flame, Tv,
    Bed,
    Users,
    X
} from 'lucide-react'
import Link from 'next/link'

const staysData = [
    {
        id: 1,
        name: "Mount Elmo deluxe",
        shortDesc: "Comfortable room with views of Mount Helm, high-quality furnishings, and parking directly in front of the hotel. Pets are not allowed.",
        fullDesc: "Comfortable room with views of Mount Helm, high-quality furnishings, and parking directly in front of the hotel. Pets are not allowed. Experience comfort and tranquility in the Mount Elmo Deluxe room, thoughtfully designed to provide a relaxing stay surrounded by scenic mountain beauty.",
        extraDesc: "Large windows allow natural light to fill the space while offering peaceful views of the surrounding landscape.",
        beds: 1,
        bath: 1,
        people: 4,
        image: room1,
        amenities: [
            { title: "1 Beds", icon: <Image src="/bed.svg" alt="" width={20} height={20} /> },
            { title: "1 Bath", icon: <Image src="/shower.svg" alt="" width={20} height={20} /> },
            { title: "4 People", icon: <Image src="/people1.svg" alt="" width={20} height={20} /> }
        ],
    },
    {
        id: 2,
        name: "Fitness Center",
        shortDesc: "Stay active and energized in our compact fitness center, equipped with essential workout machines for a quick and effective session during your stay.",
        fullDesc: "Stay active during your stay in our well-equipped fitness center, designed for quick and effective workouts. Featuring essential cardio machines and a clean, comfortable setting, it’s ideal for maintaining your routine with ease.  ",
        extraDesc: "Keep up with your wellness routine in our dedicated fitness centre, featuring essential workout equipment for a balanced exercise session. ",
        beds: 2,
        bath: 2,
        people: 6,
        image: room2,
        amenities: [
            { title: "Cardio", icon: <Image src="/running.svg" alt="" width={20} height={20} /> },
            { title: "Workout", icon: <Image src="/workout.svg" alt="" width={20} height={20} /> },
            { title: "Open Daily", icon: <Image src="/timer.svg" alt="" width={20} height={20} /> }
        ],
    },
    {
        id: 3,
        name: "Indoor Heated Pool",
        shortDesc: "Relax and unwind by our serene swimming pool, designed for comfort and leisure. Enjoy crystal-clear waters, sun loungers, and a peaceful ambiance perfect for both relaxation and recreation.",
        fullDesc: "Enjoy a relaxing escape in our indoor heated pool, designed to provide comfort in every season. The warm, temperature-controlled water creates a soothing environment, perfect for unwinding after a long day of travel or exploration.",
        extraDesc: "Surrounded by a calm and private setting, this space offers the ideal balance of relaxation and quiet, whether you prefer a gentle swim or simply soaking in the warmth.",
        beds: 1,
        bath: 1,
        people: 2,
        image: room3,
        amenities: [
            { title: "Heated Water", icon: <Image src="/wave.svg" alt="" width={20} height={20} /> },
            { title: "Jacuzzi Style", icon: <Image src="/Jacuzzi.svg" alt="" width={20} height={20} /> },
            { title: "Quiet & Private", icon: <Image src="/lock.svg" alt="" width={12} height={12} /> }
        ],
    },
    {
        id: 4,
        name: "Infinity Pool Retreat",
        shortDesc: "Relax and unwind by our serene swimming pool, designed for comfort and leisure. Enjoy crystal-clear waters, sun loungers, and a peaceful ambiance perfect for both relaxation and recreation.",
        fullDesc: "Unwind by our refreshing outdoor pool, where calm waters and open skies create the perfect setting for relaxation. Whether you're taking a leisurely swim or lounging poolside, this space is designed for comfort and ease.",
        extraDesc: "Enjoy a peaceful atmosphere with plenty of space to relax, soak up the sun, and spend quality time with family and friends.",
        beds: 3,
        bath: 2,
        people: 8,
        image: room4,
        amenities: [
            { title: "Pool Access", icon: <Image src="/swimming.svg" alt="" width={20} height={20} /> },
            { title: "Sun Deck", icon: <Image src="/sun.svg" alt="" width={20} height={20} /> },
            { title: "Family Friendly", icon: <Image src="/people1.svg" alt="" width={20} height={20} /> }
        ],
    },
    // {    
    //     id: 5,
    //     name: "Redrock Heritage Room",
    //     shortDesc: "Inspired by the ancient geology of Southern Utah, this room features bespoke stone textures and curated artisan decor.",
    //     fullDesc: "Inspired by the ancient geology of Southern Utah, this room features bespoke stone textures and curated artisan decor. A tribute to the landscape that defines the Cairn experience.",
    //     extraDesc: "Locally sourced art pieces adorn the walls, telling the story of the region.",
    //     beds: 2,
    //     bath: 1,
    //     people: 4,
    //     image: room5,
    //     amenities: [
    //         { title: "Artisan Decor", icon: <Palette size={20} strokeWidth={1.5} /> },
    //         { title: "Heated Floors", icon: <Flame size={20} strokeWidth={1.5} /> },
    //         { title: "Smart TV", icon: <Tv size={20} strokeWidth={1.5} /> }
    //     ],
    // },
]
const ExploreStay = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [expandedCard, setExpandedCard] = useState<number | null>(null)
    const numberRef = useRef<HTMLSpanElement>(null)
    const cardContainerRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)

    const animateNumberChange = useCallback((newIndex: number) => {
        if (!numberRef.current) return
        const el = numberRef.current
        
        const goingForward = newIndex > activeIndex
        gsap.to(el, {
            y: goingForward ? -20 : 20,
            opacity: 0,
            duration: 0.25,
            ease: "power2.in",
            onComplete: () => {
                setActiveIndex(newIndex)
                gsap.set(el, { y: goingForward ? 20 : -20 })
                gsap.to(el, { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" })
            }
        })
    }, [activeIndex])

    const animateCardTransition = useCallback((newIndex: number) => {
        if (!cardContainerRef.current) return
        gsap.to(cardContainerRef.current, {
            opacity: 0,
            x: newIndex > activeIndex ? -20 : 20,
            duration: 0.25,
            ease: "power2.in",
            onComplete: () => {
                animateNumberChange(newIndex)
                gsap.set(cardContainerRef.current, { x: newIndex > activeIndex ? 20 : -20 })
                gsap.to(cardContainerRef.current, {
                    opacity: 1,
                    x: 0,
                    duration: 0.4,
                    ease: "power2.out",
                })
            }
        })
    }, [activeIndex, animateNumberChange])

    const goNext = useCallback(() => {
        if (activeIndex < staysData.length - 1) {
            animateCardTransition(activeIndex + 1)
        }
    }, [activeIndex, animateCardTransition])

    const goPrev = useCallback(() => {
        if (activeIndex > 0) {
            animateCardTransition(activeIndex - 1)
        }
    }, [activeIndex, animateCardTransition])

    const openCard = useCallback((index: number) => {
        setExpandedCard(index)
        requestAnimationFrame(() => {
            if (overlayRef.current) {
                gsap.fromTo(overlayRef.current,
                    { opacity: 0, scale: 0.98 },
                    { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
                )
                const els = overlayRef.current.querySelectorAll('.detail-animate')
                gsap.fromTo(els,
                    { opacity: 0, y: 15 },
                    { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power3.out", delay: 0.1 }
                )
            }
        })
    }, [])

    const closeCard = useCallback(() => {
        if (overlayRef.current) {
            gsap.to(overlayRef.current, {
                opacity: 0,
                scale: 0.98,
                duration: 0.35,
                ease: "power2.in",
                onComplete: () => setExpandedCard(null)
            })
        }
    }, [])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (expandedCard !== null && e.key === 'Escape') closeCard()
            if (expandedCard === null) {
                if (e.key === 'ArrowRight') goNext()
                if (e.key === 'ArrowLeft') goPrev()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [expandedCard, closeCard, goNext, goPrev])

    const current = staysData[activeIndex]
    const progress = ((activeIndex) / (staysData.length - 1)) * 100

    return (
        <section className="relative w-full h-screen overflow-hidden flex flex-col justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={exploreBg}
                    alt="Explore background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Preload adjacent card images so transitions are instant */}
            <div className="hidden" aria-hidden="true">
                {activeIndex > 0 && (
                    <Image src={staysData[activeIndex - 1].image} alt="" priority />
                )}
                {activeIndex < staysData.length - 1 && (
                    <Image src={staysData[activeIndex + 1].image} alt="" priority />
                )}
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between px-4 md:px-16 lg:px-24 gap-8 lg:gap-8 mt-4">

                {/* Left: Title & Description */}
                <div className="flex flex-col gap-4 md:gap-5 w-full lg:w-[40%] flex-shrink-0 items-center md:items-start">
                    <div className="text-center md:text-left">
                        <h2 className="text-[2rem] md:text-[4.315rem] font-semibold text-white uppercase leading-none">
                            EXPLORE
                        </h2>
                        <div className="flex items-center justify-center md:justify-start gap-3 mt-1 md:pl-70">
                            <span className="text-3xl md:text-[3.15rem] font-medium text-white">Our</span>
                            <span className="text-3xl md:text-[3.15rem] font-medium italic text-[#FFEBD3]">Stay</span>
                        </div>
                    </div>
                    <p className="text-white text-base md:text-xl font-normal max-w-lg leading-tight border-white/20 mt-4 md:mt-6 text-center md:text-left">
                        Discover Thoughtfully Designed Rooms And Suites Where Comfort, Nature, And Timeless Mountain Elegance Come Together.
                    </p>
                    <Link href={'https://www.choicehotels.com/en-in/utah/cedar-city/choice-hotels/ut094'} target='_blank'>
                    <button className="flex items-center justify-center gap-0 mt-1 md:mt-8 group bg-white rounded-full py-2 md:py-4 px-6 md:px-12 shadow-lg hover:shadow-xl transition-shadow self-center md:self-start">
                        <span className="text-[#1a1a1a] text-xs md:text-base font-medium tracking-[0.1em] uppercase">
                            BOOK NOW
                        </span>
                    </button>
                    </Link>
                </div>

                {/* Right: Room Card */}
                <div
                    ref={cardContainerRef}
                    className="w-full lg:w-full xl:w-full h-[400px] md:h-[60vh] cursor-pointer group"
                    onClick={() => openCard(activeIndex)}
                >
                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl flex border border-white/10 group-hover:border-white/30 transition-colors">
                        {/* Background Split */}
                        <div className="w-[15%] md:w-[35%] h-full bg-white hidden md:block z-0"></div>
                        <div className="w-full md:w-[75%] h-full relative z-0">
                            <Image
                                src={current.image}
                                alt={current.name}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                        </div>

                        {/* Floating Glass Text Box */}
                        <div className="absolute top-[55%] md:top-1/2 left-4 md:left-[8%] -translate-y-1/2 w-[90%] md:w-[60%] bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-10 border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.1)] z-10">
                            <h4 className="text-base md:text-[26px] font-medium text-[#1a1a1a] mb-1">{current.name}</h4>
                            <p className="text-black text-sm leading-snug md:leading-relaxed mb-3">
                                {current.shortDesc}
                            </p>
                            <div className="flex flex-wrap items-center gap-3 md:gap-6 pt-1">
                                {current.amenities.map((amenity, i) => (
                                    <div key={i} className="flex items-center gap-2 text-black">
                                        {amenity.icon}
                                        <span className="text-xs md:text-base font-medium">{amenity.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="mt-5 md:mt-0 md:mb-0 ml-6 md:ml-0 mb-10 md:absolute bottom-8 right-8 md:bottom-12 md:right-24 z-10 w-[85%] md:w-[60%] lg:w-[45%] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={goPrev}
                        disabled={activeIndex === 0}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/50 flex items-center justify-center text-white disabled:opacity-30 hover:bg-white/10 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m15 18-6-6 6-6"/></svg>
                    </button>
                    <button
                        onClick={goNext}
                        disabled={activeIndex === staysData.length - 1}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/50 flex items-center justify-center text-white disabled:opacity-30 hover:bg-white/10 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m9 18 6-6-6-6"/></svg>
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="flex-1 mx-6 h-[1px] bg-white/30 relative">
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 h-[2px] bg-white transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
                </div>

                {/* Slide Number */}
                <div className="overflow-hidden h-6 flex items-center">
                    <span ref={numberRef} className="text-white text-lg md:text-xl font-medium tracking-wider">
                        {String(activeIndex + 1).padStart(2, '0')}
                    </span>
                </div>
            </div>

            {/* Expanded Card Overlay (Modal) */}
            {expandedCard !== null && (
                <div
                    ref={overlayRef}
                    className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-8"
                    style={{ opacity: 0 }}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={closeCard} />

                    {/* Detail Card Container */}
                    <div className="relative w-full max-w-[1200px] h-[100dvh] md:h-[85vh] rounded-none md:rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]">

                        {/* Full-cover background image — spans both panels for true glass effect */}
                        <div className="absolute inset-0 z-0">
                            <Image
                                src={staysData[expandedCard].image}
                                alt={staysData[expandedCard].name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Overlay layout on top of image */}
                        <div className="relative z-10 flex flex-col md:flex-row h-full md:justify-start">

                        {/* Left: Info Panel (Frosted glass overlay over the image) */}
                        <div className="w-full md:w-[45%] h-auto md:h-full bg-white/30 md:bg-white/20 backdrop-blur-xs md:backdrop-blur-2xl p-6 pt-8 pb-6 md:p-12 flex flex-col justify-end md:justify-center border-white/20 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] md:shadow-none">
                            
                            <h3 className="detail-animate text-[18px] md:text-[32px] font-semibold text-[#1a1a1a] mb-4 md:mb-6 leading-none tracking-tight">
                                {staysData[expandedCard].name}
                            </h3>
                            
                            <p className="detail-animate text-black text-base md:text-base leading-snug md:leading-relaxed mb-4 md:mb-6 font-medium md:font-normal">
                                {staysData[expandedCard].fullDesc}
                            </p>
                            
                            <p className="detail-animate text-black text-base md:text-base leading-snug md:leading-relaxed mb-6 md:mb-10 font-medium md:font-normal">
                                {staysData[expandedCard].extraDesc}
                            </p>

                            {/* Amenities List */}
                            <div className="grid grid-cols-2 gap-3 md:space-y-5 md:block">
                                {staysData[expandedCard].amenities.map((amenity, i) => (
                                    <div key={i} className="detail-animate flex  items-center gap-3 md:gap-4">
                                        <div className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center text-[#1a1a1a] shadow-sm">
                                            {amenity.icon}
                                        </div>
                                        <span className="text-base md:text-[16px] font-medium md:font-medium text-[#1a1a1a]">{amenity.title}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Book Now inside panel — mobile only */}
                            <Link href="https://www.choicehotels.com/en-in/utah/cedar-city/choice-hotels/ut094" target="_blank" className="md:hidden mt-6 flex items-center justify-center w-fit mx-auto px-8 py-2.5 bg-white rounded-full shadow-lg cursor-pointer">
                                <span className="text-[#1a1a1a] text-xs font-bold tracking-[0.1em] uppercase">BOOK NOW</span>
                            </Link>
                        </div>

                        {/* Close Button Top Right */}
                        <button
                            onClick={closeCard}
                            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full flex items-center justify-center text-white hover:text-black hover:bg-white transition-colors duration-300 z-50 drop-shadow-md cursor-pointer bg-transparent"
                        >
                            {/* Mobile Arrow Right, Desktop X */}
                           <X className='text-black'/>
                        </button>

                        {/* Book Now Button Over Image (Bottom Center / Bottom Right) */}
                        <Link href="https://www.choicehotels.com/en-in/utah/cedar-city/choice-hotels/ut094" target="_blank" className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:bottom-8 md:right-8 items-center justify-center gap-0 group w-[35%] md:w-fit py-2 md:py-3 bg-white rounded-full p-1 md:pl-6 shadow-[0_10px_30px_rgba(0,0,0,0.15)] md:shadow-2xl hover:shadow-white/20 transition-all z-20 cursor-pointer">
                            <span className="text-[#1a1a1a] text-xs md:text-xs font-bold md:font-medium tracking-[0.1em] uppercase md:pr-4">
                                BOOK NOW
                            </span>
                        </Link>
                    </div>
                </div>
                </div>
            )}
        </section>
    )
}

export default ExploreStay