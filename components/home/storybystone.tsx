"use client"
import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

                const storyItems = gsap.utils.toArray<HTMLElement>('.story-item');
                const stoneImages = gsap.utils.toArray<HTMLElement>('.stone-image');

                storyItems.forEach((item, i) => {
                    const label = item.querySelector('.story-label');
                    const words = item.querySelectorAll('.word-inner');

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

                    if (i < stories.length - 1) {
                        tl.to(item, { opacity: 0, y: -20, duration: 0.5 });
                    }
                });
            });


            mm.add("(max-width: 1023px)", () => {
                gsap.set(['.story-label', '.word-inner', '.stone-image'], { opacity: 1, y: 0, scale: 1, filter: "none", rotation: 0 });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full min-h-screen bg-white overflow-hidden py-24 lg:py-0">
            <div className="px-6 lg:px-12 h-screen flex flex-col lg:flex-row items-center gap-10 justify-between pointer-events-none">

                {/* Left Side: Content */}
                <div ref={contentRef} className="relative w-full lg:w-1/2 h-[40vh] lg:h-screen flex items-center mb-10 lg:mb-0">
                    <div className="relative w-full pointer-events-auto">
                        {stories.map((story, i) => (
                            <div
                                key={i}
                                className={`story-item ${i === 0 ? 'relative' : 'absolute top-0 left-0'} w-full`}
                            >
                                <span className="story-label block text-[10px] md:text-sm font-sans tracking-[0.2em] uppercase text-[#7a6559] mb-4 md:mb-8 font-semibold lg:opacity-0 lg:translate-y-4">
                                    {story.label}
                                </span>
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-sans font-medium text-neutral-800 max-w-xl leading-[1.2] lg:leading-[1.1] tracking-tight">
                                    {story.title.split(" ").map((word, wIdx) => (
                                        <span key={wIdx} className="inline-block overflow-hidden pb-1 mr-[0.25em]">
                                            <span className="word-inner inline-block lg:opacity-0 lg:translate-y-8">{word}</span>
                                        </span>
                                    ))}
                                </h2>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Stone Stack - Absolute positioning for perfect layering */}
                <div
                    ref={stonesRef}
                    className="relative w-full lg:w-1/2 h-[40vh] lg:h-sceen flex items-end justify-center lg:justify-end"
                >
                    <div className="relative w-full lg:w-[30vw] h-full -bottom-[90%] left-[20%] -translate-x-[10%]">
                        {stories.map((story, i) => (
                            <div
                                key={i}
                                className="stone-image absolute bottom-0 lg:opacity-0"
                                style={{
                                    zIndex: i + 1,
                                    transform: `translate(-50%, ${i * 50}px)`,
                                    bottom: `${(i * 17) + -5}%` 
                                }}
                            >
                                <Image
                                    src={story.image}
                                    alt={`Story Stone ${i + 1}`}
                                    width={1000}
                                    height={1000}
                                    className="w-[200px] md:w-[300px] lg:w-[70vw] h-auto pointer-events-none drop-shadow-2xl"
                                    priority
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}

export default StoryByStone
