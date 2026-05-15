'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import bgimage from '@/assets/hotel/sand_bg.png'
import stayImage from '@/assets/gallery/g12.jpg'

gsap.registerPlugin(ScrollTrigger)

const StayElevated = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textLeftRef = useRef<HTMLDivElement>(null)
  const textRightRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    const createScrollAnimation = (isDesktop: boolean) => {
      const card = imageRef.current!
      const leftText = textLeftRef.current!
      const rightText = textRightRef.current!
      const metrics = {
        width: 0,
        height: 0,
        leftOffset: 0,
        rightOffset: 0,
      }

      const measureCard = () => {
        gsap.set(card, { clearProps: 'width,height' })
        metrics.width = card.offsetWidth
        metrics.height = card.offsetHeight

        if (isDesktop) {
          metrics.leftOffset = -(metrics.width / 2) - (leftText.offsetWidth / 2) - 40
          metrics.rightOffset = (metrics.width / 2) + (rightText.offsetWidth / 2) + 40
          return
        }

        metrics.leftOffset = -(metrics.height / 2) - (leftText.offsetHeight / 2) - 30
        metrics.rightOffset = (metrics.height / 2) + (rightText.offsetHeight / 2) + 30
      }

      const setStartState = () => {
        measureCard()
        gsap.set([leftText, rightText], {
          xPercent: -50,
          yPercent: -50,
          x: 0,
          y: 0,
          opacity: 0,
        })
        gsap.set(card, {
          width: metrics.width,
          height: metrics.height,
          borderRadius: 16,
        })
      }

      setStartState()

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: isDesktop ? '+=300%' : 'bottom top',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefreshInit: setStartState,
        },
      })

      // Phase 1 (0.12) — text slides out to offset, becomes fully visible
      // Phase 2 (0.28) — card expands to full viewport + text flies away
      // 0.10 gap between phases (0.18–0.28) ensures text rests at full opacity
      // before the exit animation begins, preventing overlap/jump

      if (isDesktop) {
        tl.to(leftText, {
          x: () => metrics.leftOffset,
          opacity: 1,
          duration: 0.06,
        }, 0.12)
        tl.to(rightText, {
          x: () => metrics.rightOffset,
          opacity: 1,
          duration: 0.06,
        }, 0.12)
        tl.to(card, {
          width: () => window.innerWidth,
          height: () => window.innerHeight,
          borderRadius: 0,
          duration: 0.22,
        }, 0.28)
        tl.to(leftText, {
          x: () => metrics.leftOffset - window.innerWidth,
          opacity: 0,
          duration: 0.22,
        }, 0.28)
        tl.to(rightText, {
          x: () => metrics.rightOffset + window.innerWidth,
          opacity: 0,
          duration: 0.22,
        }, 0.28)
      } else {
        tl.to(leftText, {
          y: () => metrics.leftOffset,
          opacity: 1,
          duration: 0.06,
        }, 0.12)
        tl.to(rightText, {
          y: () => metrics.rightOffset,
          opacity: 1,
          duration: 0.06,
        }, 0.12)
        tl.to(card, {
          width: () => window.innerWidth,
          height: () => window.innerHeight,
          borderRadius: 0,
          duration: 0.22,
        }, 0.28)
        tl.to(leftText, {
          y: () => metrics.leftOffset - window.innerHeight,
          opacity: 0,
          duration: 0.22,
        }, 0.28)
        tl.to(rightText, {
          y: () => metrics.rightOffset + window.innerHeight,
          opacity: 0,
          duration: 0.22,
        }, 0.28)
      }

      return () => {
        tl.scrollTrigger?.kill()
        tl.kill()
      }
    }

    mm.add("(min-width: 768px)", () => createScrollAnimation(true))

    mm.add("(max-width: 767px)", () => createScrollAnimation(false))

    return () => mm.revert()
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative flex min-h-screen md:h-screen w-full items-center justify-center overflow-hidden">
      {/* Dynamic Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <Image
          src={bgimage}
          alt="Paper Background"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div ref={stageRef} className="relative z-10 mx-auto flex h-[50vh] w-full items-center justify-center md:h-screen">

        <h2
          ref={textLeftRef}
          className="absolute left-[50%] top-1/2 z-0 origin-center whitespace-nowrap text-3xl font-normal text-black md:text-5xl lg:text-6xl xl:text-5xl"
        >
          Stay Elevated
        </h2>

        <h2
          ref={textRightRef}
          className="absolute left-[50%] top-1/2 z-0 origin-center whitespace-nowrap text-3xl font-normal text-black md:text-5xl lg:text-6xl xl:text-5xl"
        >
          Stay Inspired
        </h2>

        <div
          ref={imageRef}
          className="relative z-10 h-[30vh] w-[85vw] overflow-hidden rounded-2xl shadow-2xl md:h-[50vh] md:w-[45vw] lg:w-[40vw] xl:w-[35vw]"
        >
          <Image
            src={stayImage}
            alt="Stay Elevated Interior"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

      </div>
    </section>
  )
}

export default StayElevated
