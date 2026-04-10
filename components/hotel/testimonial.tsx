'use client'

import { UserRound, ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useState, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const testimonialData = [
    {
        id: 1,
        name: "Gokul",
        shortDesc: "Staying at Carin Hotel was an unforgettable experience. Surrounded by stunning red rock mountains and peaceful nature, it was the perfect escape from the city. The rooms were beautifully designed, the views were breathtaking, and the staff made us feel welcome from the moment we arrived.",
        location: "Florida, TamilNadu",
        image: <UserRound size={32} className="text-gray-400" />,
    },
    {
        id: 2,
        name: "Subash",
        shortDesc: "The rooms were beautifully designed, the views were breathtaking, and the staff made us feel welcome from the moment we arrived. A truly memorable stay with excellent hospitality throughout.",
        location: "California, USA",
        image: <UserRound size={32} className="text-gray-400" />,
    },
    {
        id: 3,
        name: "Karthik",
        shortDesc: "The staff was very friendly and the food was delicious. I would definitely recommend this hotel to my friends and family. The overall ambiance provided the perfect getaway we needed.",
        location: "UK",
        image: <UserRound size={32} className="text-gray-400" />,
    },
]

const Testimonial = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    const containerRef = useRef<HTMLElement>(null)
    const slidesRef = useRef<(HTMLDivElement | null)[]>([])

    const { contextSafe } = useGSAP({ scope: containerRef })

    // Initialize slides styles
    useGSAP(() => {
        slidesRef.current.forEach((el, index) => {
            if (index === currentIndex) {
                gsap.set(el, { opacity: 1, x: 0, autoAlpha: 1, zIndex: 10 })
            } else {
                gsap.set(el, { opacity: 0, autoAlpha: 0, x: 50, zIndex: 0 })
            }
        })
    }, [])

    const goToSlide = contextSafe((newIndex: number, direction: 'left' | 'right') => {
        if (isAnimating || newIndex === currentIndex) return
        setIsAnimating(true)

        const currentSlide = slidesRef.current[currentIndex]
        const nextSlide = slidesRef.current[newIndex]

        // Distance to slide
        const slideOffset = 60
        const outX = direction === 'right' ? -slideOffset : slideOffset
        const inX = direction === 'right' ? slideOffset : -slideOffset

        // Animate out current slide
        gsap.to(currentSlide, {
            x: outX,
            opacity: 0,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power3.inOut",
            zIndex: 0
        })

        // Animate in next slide
        gsap.fromTo(nextSlide,
            { x: inX, opacity: 0, autoAlpha: 0, zIndex: 10 },
            {
                x: 0,
                opacity: 1,
                autoAlpha: 1,
                duration: 0.7,
                ease: "power3.inOut",
                onComplete: () => {
                    setCurrentIndex(newIndex)
                    setIsAnimating(false)
                }
            }
        )
    })

    const handleNext = () => {
        const newIndex = (currentIndex + 1) % testimonialData.length
        goToSlide(newIndex, 'right')
    }

    const handlePrev = () => {
        const newIndex = (currentIndex - 1 + testimonialData.length) % testimonialData.length
        goToSlide(newIndex, 'left')
    }

    return (
        <section ref={containerRef} className="relative w-full py-24 md:py-32 bg-[#FEF8ED78] overflow-hidden flex items-start justify-center font-sans min-h-screen">

            <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0">
                <h1 className="text-[12vw] font-black text-black/[0.03] uppercase tracking-tight leading-none mt-10">
                    Testimonials
                </h1>
            </div>

            <div className="relative max-w-6xl z-10 w-full px-6 md:px-12 xl:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-end">

                <div className="flex flex-col items-start pt-10 md:pt-0">
                    <div className="uppercase text-sm font-semibold tracking-widest text-black mb-4">
                        Our Client
                    </div>
                    <h2 className="text-4xl md:text-6xl font-semibold text-black leading-tight mb-8">
                        Stories from<br />Our Guests
                    </h2>
                    <p className="text-[#606060] text-lg md:text-xl font-normal mb-12 max-w-lg leading-relaxed px-8">
                        Our guests are at the heart of everything we do. Discover what travellers have to say about their stay, their adventures, they experienced at Carin Hotel.
                    </p>

                    <div className="flex gap-4 pl-10">
                        <button
                            onClick={handlePrev}
                            disabled={isAnimating}
                            className="w-10 h-10 rounded-full border border flex items-center justify-center hover:bg-black hover:text-white transition-all hover:border-black group disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Previous Testimonial"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors" strokeWidth={1.5} />
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={isAnimating}
                            className="w-10 h-10 rounded-full border border flex items-center justify-center hover:bg-black hover:text-white transition-all hover:border-black group disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Next Testimonial"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors" strokeWidth={1.5} />
                        </button>
                    </div>
                </div>

                {/* Right Column: Slider Container */}
                <div className="relative w-full h-[200px] flex items-center">
                    <div className="relative w-full h-full flex justify-start lg:justify-end">

                        {testimonialData.map((testimonial, index) => (
                            <div
                                key={testimonial.id}
                                ref={(el) => { slidesRef.current[index] = el }}
                                className="absolute inset-0 flex flex-col justify-center max-w-xl top-50 w-full"
                            >
                                {/* Large stylized quote symbol matching the design purely by text */}
                                <div className="text-[14rem] text-[#C2C2C233] absolute -top-40 font-serif leading-0 h-14 flex items-center justify-start -ml-20 select-none">
                                    “
                                </div>

                                <p className="text-xl md:text-[22px] lg:text-2xl text-[#606060] font-light leading-relaxed mb-10 w-full">
                                    {testimonial.shortDesc}
                                </p>

                                <div className="flex items-center gap-5 mt-auto">
                                    <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center shrink-0 border border-black/5">
                                        {testimonial.image}
                                    </div>
                                    <div className="flex flex-col">
                                        <h4 className="text-lg font-medium text-black leading-tight mb-1">{testimonial.name}</h4>
                                        <span className="text-sm tracking-wide text-gray-500 font-normal">{testimonial.location}</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

            </div>
        </section>
    )
}

export default Testimonial