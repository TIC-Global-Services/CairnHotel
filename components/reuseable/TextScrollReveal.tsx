"use client"
import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface TextScrollRevealProps {
    text: string
    className?: string
}

const TextScrollReveal = ({ text, className }: TextScrollRevealProps) => {
    const containerRef = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        // Register ScrollTrigger to ensure it's loaded in this context
        gsap.registerPlugin(ScrollTrigger);

        const words = text.split(" ");
        const container = containerRef.current;
        if (!container) return;

        // Reset content to be words wrapped in spans
        container.innerHTML = words
            .map(word => `<span class="opacity-20 inline-block mr-[0.2em] transition-opacity duration-300">${word}</span>`)
            .join("");

        const spans = container.querySelectorAll("span");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top 80%",
                end: "bottom 40%",
                scrub: 0.5,
                // markers: true, // For debugging
            }
        });

        tl.to(spans, {
            opacity: 1,
            stagger: 0.1,
            ease: "none"
        });

        return () => {
            if (tl.scrollTrigger) tl.scrollTrigger.kill();
            tl.kill();
        };
    }, [text]);

    return (
        <p 
            ref={containerRef} 
            className={`${className} leading-relaxed whitespace-pre-line`}
            suppressHydrationWarning // Because we modify innerHTML on client
        >
            {text}
        </p>
    )
}

export default TextScrollReveal
