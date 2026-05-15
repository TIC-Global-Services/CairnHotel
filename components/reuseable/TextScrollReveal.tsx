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

        const isMobile = window.innerWidth < 768

        // Reset content to be words wrapped in spans — group on mobile for perf
        if (isMobile) {
            const chunks: string[] = []
            for (let i = 0; i < words.length; i += 3) {
                chunks.push(words.slice(i, i + 3).join(' '))
            }
            container.innerHTML = chunks
                .map(chunk => `<span class="opacity-20 inline-block mr-[0.2em]" style="will-change:opacity">${chunk}</span>`)
                .join("")
        } else {
            container.innerHTML = words
                .map(word => `<span class="opacity-20 inline-block mr-[0.2em]" style="will-change:opacity">${word}</span>`)
                .join("")
        }

        const spans = container.querySelectorAll("span");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: () => isMobile ? "top 95%" : "top 80%",
                end: () => isMobile ? "bottom 60%" : "bottom 40%",
                scrub: window.innerWidth < 768 ? 1.5 : 0.5,
                invalidateOnRefresh: true,
                // markers: true, // For debugging
            }
        });

        tl.to(spans, {
            opacity: 1,
            stagger: isMobile ? 0.15 : 0.1,
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
