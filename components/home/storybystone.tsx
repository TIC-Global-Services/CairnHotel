"use client"
import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import stone1 from '@/assets/Home/stone-1.png'
import stone2 from '@/assets/Home/stone-2.png'
import stone3 from '@/assets/Home/stone-3.png'
import stone4 from '@/assets/Home/stone-4.png'

const stories = [
    {
        label: "BUILT STONE BY STONE",
        title: "Inspired by the ancient desert markers found across Utah’s red rock landscapes, the concept of Cairn began with a simple philosophy that true luxury is layered, grounded, and thoughtfully placed.",
        image: stone1,
    },
    {
        label: "1. THE FOUNDATION",
        title: "It begins with a single stone strong, steady, and grounded. This base represents strength and stability, carefully placed to support everything that follows.",
        image: stone2,
    },
    {
        label: "2. THE BALANCE",
        title: "The next stones are added with patience and precision. Each layer is thoughtfully positioned, creating harmony, structure, and a sense of purpose.",
        image: stone3,
    },
    {
        label: "3. THE COMPLETION",
        title: "The final stone rests at the top a symbol of balance achieved. Together, stone by stone, they form something lasting, meaningful, and beautifully complete.",
        image: stone4,
    },
];

const StoryByStone = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const stonesRef = useRef<HTMLDivElement>(null);

    // Mobile Slider State
    const [currentSlide, setCurrentSlide] = useState(0);
    const handleNext = () => setCurrentSlide(prev => Math.min(prev + 1, stories.length - 1));
    const handlePrev = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            let mm = gsap.matchMedia();

            mm.add("(min-width: 1024px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: `+=${stories.length * 150}%`,
                        pin: true,
                        scrub: 1,
                    }
                });

                const storyItems = gsap.utils.toArray<HTMLElement>('.desktop-story-item');
                const stoneImages = gsap.utils.toArray<HTMLElement>('.desktop-stone-image');

                storyItems.forEach((item, i) => {
                    const label = item.querySelector('.story-label');
                    const words = item.querySelectorAll('.word-inner');

                    // Make the first slide visible by default per requirements
                    if (i === 0) {
                        gsap.set([label, ...Array.from(words)], { opacity: 1, y: 0 });
                        gsap.set(stoneImages[i], { opacity: 1, y: 0, scale: 1, rotation: 0, filter: "blur(0px)" });
                        tl.to({}, { duration: 0.8 }); // Wait time before fading
                    } else {
                        tl.fromTo([label, ...Array.from(words)],
                            { opacity: 0, y: 30 },
                            { opacity: 1, y: 0, duration: 0.8, stagger: 0.02, ease: "power3.out" }
                        );

                        tl.fromTo(stoneImages[i],
                            {
                                opacity: 0,
                                y: -90,
                                scale: 1.01,
                                rotation: (i % 2 === 0 ? 5 : -5),
                                filter: "blur(10px)"
                            },
                            {
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                rotation: 0,
                                filter: "blur(0px)",
                                duration: 0.9,
                                ease: "power3.out"
                            },
                            "<0.2"
                        );
                        tl.to({}, { duration: 0.8 });
                    }

                    if (i < stories.length - 1) {
                        tl.to(item, { opacity: 0, y: -20, duration: 0.5 });
                    }
                });
            });

            mm.add("(max-width: 1023px)", () => {
                // Kill GSAP animations for mobile entirely to let React state take over
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full lg:min-h-screen bg-white overflow-hidden px-[2%] py-10 lg:py-0">

            {/* DESKTOP VIEW */}
            <div className="hidden lg:flex px-12 h-screen flex-row items-center gap-10 justify-between pointer-events-none">
                {/* Left Side: Content */}
                <div ref={contentRef} className="relative w-1/2 h-screen flex items-center">
                    <div className="relative w-full pointer-events-auto">
                        {stories.map((story, i) => (
                            <div
                                key={i}
                                className={`desktop-story-item ${i === 0 ? 'relative' : 'absolute top-0 left-0'} w-full`}
                            >
                                <span className="story-label block text-sm font-sans tracking-[0.2em] uppercase text-[#7a6559] mb-8 font-semibold opacity-0 translate-y-4">
                                    {story.label}
                                </span>
                                <h2 className="text-4xl font-sans font-medium text-neutral-800 max-w-xl leading-[1.1] tracking-tight">
                                    {story.title.split(" ").map((word, wIdx) => (
                                        <span key={wIdx} className="inline-block overflow-hidden pb-1 mr-[0.25em]">
                                            <span className="word-inner inline-block opacity-0 translate-y-8">{word}</span>
                                        </span>
                                    ))}
                                </h2>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Stone Stack */}
                <div ref={stonesRef} className="relative w-1/2 h-screen flex items-end justify-end">
                    <div className="relative w-[30vw] h-full left-[20%] -translate-x-[10%]">
                        {stories.map((story, i) => (
                            <div
                                key={i}
                                className="desktop-stone-image absolute bottom-0 opacity-0"
                                style={{
                                    zIndex: i + 1,
                                    transform: `translate(-50%, ${i * 50}px)`,
                                    bottom: `${(i * 8) - 5}%`
                                }}
                            >
                                <Image
                                    src={story.image}
                                    alt={`Story Stone ${i + 1}`}
                                    width={1000}
                                    height={1000}
                                    className="w-[70vw] h-auto pointer-events-none drop-shadow-2xl"
                                    priority
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* MOBILE VIEW */}
            <div className="flex lg:hidden flex-col items-center justify-between min-h-[80vh] w-full px-[5%] relative pt-10">
                {/* Slide Header */}
                <div className="h-[40px] flex flex-col items-center justify-center w-full mb-8">
                    <span className="text-[13px] font-sans tracking-[0.2em] uppercase text-[#7a6559] font-bold mb-10 text-center">
                        {stories[currentSlide].label}
                    </span>
                </div>

                {/* Stones Stack Image Box */}
                <div className="relative w-full h-[300px] flex flex-col items-end justify-end pt-20 pointer-events-none">
                    {stories.map((story, i) => (
                        <Image
                            key={i}
                            src={story.image}
                            alt={`Stone Stack ${i}`}
                            width={500}
                            height={500}
                            className={`absolute left-1/2 -translate-x-1/2 w-[240px] drop-shadow-2xl transition-all duration-700 ease-out origin-center
                                ${i <= currentSlide ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-[1.05] -translate-y-11 blur-sm'}
                            `}
                            style={{
                                zIndex: i + 1,
                                bottom: `${i * 35}px`,
                            }}
                        />
                    ))}
                </div>

                {/* Bottom Title Text & Controls */}
                <div className="flex flex-col items-center justify-center -translate-y-10 md:translate-y-0 flex-1 w-full mb-8 md:pt-4">
                    <div className="w-full flex items-center justify-start text-center px-4">
                        <h2 className="text-[18px] md:text-2xl font-sans font-medium text-neutral-800 leading-[1.3] transition-all duration-300">
                            {stories[currentSlide].title}
                        </h2>
                    </div>

                    {/* Controls */}
                    <div className="flex gap-4 mt-8">
                        <button
                            onClick={handlePrev}
                            disabled={currentSlide === 0}
                            className="w-10 h-10 rounded-full border border-black flex items-center justify-center text-black disabled:opacity-30 disabled:border-gray-300 disabled:text-gray-300 transition-all focus:outline-none"
                            aria-label="Previous Stone"
                        >
                            <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={currentSlide === stories.length - 1}
                            className="w-10 h-10 rounded-full border-black bg-black flex items-center justify-center text-white disabled:opacity-30 disabled:bg-gray-300 transition-all focus:outline-none"
                            aria-label="Next Stone"
                        >
                            <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default StoryByStone
