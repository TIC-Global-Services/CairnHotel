'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import bgimage from '@/assets/hotel/sand_bg.png'
import stayImage from '@/assets/hotel/stayelevated.jpg'

gsap.registerPlugin(ScrollTrigger)

const StayElevated = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textLeftRef = useRef<HTMLDivElement>(null)
  const textRightRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Set initial state of texts to be fully centered and hidden
    gsap.set([textLeftRef.current, textRightRef.current], {
      xPercent: -50,
      yPercent: -50,
      x: 0,
      y: 0,
      opacity: 0,
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: () => window.innerWidth < 768 ? "top 45%" : "top 60%", 
        end: () => window.innerWidth < 768 ? "bottom 60%" : "bottom 40%", 
        scrub: 1, 
        invalidateOnRefresh: true, 
      }
    })

    tl.fromTo(imageRef.current,
      { scale: 0.3 },
      { scale: 1, duration: 1.5, ease: "power2.inOut" }
    )
 
    .to(textLeftRef.current, {
      x: () => {
         if (window.innerWidth < 768) return 0; 
         const imgW = imageRef.current?.offsetWidth || 0;
         const textW = textLeftRef.current?.offsetWidth || 0;
         return -(imgW / 2) - (textW / 2) - 40; 
      },
      y: () => {
         if (window.innerWidth >= 768) return 0;
         const imgH = imageRef.current?.offsetHeight || 0;
         const textH = textLeftRef.current?.offsetHeight || 0;
         return -(imgH / 2) - (textH / 2) - 30; 
      },
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    }, ">")
    .to(textRightRef.current, {
      x: () => {
         if (window.innerWidth < 768) return 0;
         const imgW = imageRef.current?.offsetWidth || 0;
         const textW = textRightRef.current?.offsetWidth || 0;
       
         return (imgW / 2) + (textW / 2) + 40; 
      },
      y: () => {
         if (window.innerWidth >= 768) return 0;
         const imgH = imageRef.current?.offsetHeight || 0;
         const textH = textRightRef.current?.offsetHeight || 0;
         return (imgH / 2) + (textH / 2) + 30; 
      },
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    }, "<")

  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative w-full md:py-[15vh] min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Dynamic Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <Image 
          src={bgimage} 
          alt="Paper Background" 
          fill 
          className="object-cover"
        />
      </div>
      

      <div className="relative z-10 w-full max-w-[95vw] md:max-w-7xl mx-auto flex items-center justify-center h-[50vh] md:h-[60vh] lg:h-[70vh]">
             
        <h2 
          ref={textLeftRef} 
          className="absolute left-[50%] top-1/2 text-3xl md:text-5xl lg:text-6xl xl:text-5xl font-normal text-black whitespace-nowrap z-0 origin-center"
        >
          Stay Elevated
        </h2>
        
        <h2 
          ref={textRightRef} 
          className="absolute left-[50%] top-1/2 text-3xl md:text-5xl lg:text-6xl xl:text-5xl font-normal text-black whitespace-nowrap z-0 origin-center"
        >
          Stay Inspired
        </h2>

        <div 
          ref={imageRef} 
          className="relative w-[85vw] md:w-[45vw] lg:w-[40vw] xl:w-[35vw] h-[30vh] md:h-[50vh] z-10 rounded-2xl overflow-hidden shadow-2xl"
        >
          <Image 
            src={stayImage} 
            alt="Stay Elevated Interior" 
            fill 
            className="object-cover"
            priority
          />
        </div>

      </div>
    </section>
  )
}

export default StayElevated