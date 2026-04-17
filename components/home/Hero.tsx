

'use client'

import React, { useRef } from 'react'
import Image, { StaticImageData } from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import carinbg      from '@/assets/Home/home_banner.jpg'
import cairnlayer2  from '@/assets/Home/home_banner_layer.png'
import exploringbg  from '@/assets/Home/exploringbg.jpg'
import firstlayer1  from '@/assets/Home/Layer 1.png'
import secondlayer2 from '@/assets/Home/Layer 2.png'
import thirdlayer3  from '@/assets/Home/Layer 3.png'
import snowlayer1 from '@/assets/Home/snowlayer_1.jpg'
import snowlayer2 from '@/assets/Home/snowlayer_2.jpg'

import theaterlayer1 from '@/assets/Home/theater_bg.png'
import theaterlayer2 from '@/assets/Home/theaterLayer-1.png'


if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

export interface LayerConfig {
  type: 'image' | 'element'
  id: string
  zIndex: number
  className?: string
  style?: React.CSSProperties
  parallax?: {
    from: gsap.TweenVars
    to:   gsap.TweenVars
  }
  // Image properties
  src?: StaticImageData
  alt?: string
  // Generic HTML element
  content?: React.ReactNode
}

export interface SectionConfig {
  id: string
  navIndex: string
  isHero?: boolean
  className?: string
  layers: LayerConfig[]
}

const SECTIONS: SectionConfig[] = [
  {
    id: 'hero',
    navIndex: '01/04',
    isHero: true,
    className: 'bg-black',
    layers: [
      {
        type: 'image',
        id: 'layer-3',
        src: thirdlayer3,
        alt: 'Background layer',
        zIndex: 10,
        className: 'left-0 object-cover object-top',
        style: { top: '-15%', width: '100%', height: '130%' },
        parallax: {
          from: { yPercent: 0, scale: 1 },
          to:   { yPercent: 15, scale: 1.1 },
        },
      },
      {
        type: 'element',
        id: 'hero-heading',
        zIndex: 15,
        className: 'flex flex-col items-center justify-center w-full h-full mix-blend-overlay opacity-90 tracking-widest text-[#e8dfd5]',
        style: { top: '-10%', left: '-2.5rem' },
        parallax: {
          from: { yPercent: 0 },
          to:   { yPercent: 40 },
        },
        content: (
          <div className="relative flex flex-col items-center">
            <div className="relative flex justify-center items-center">
              <div className="z-50 md:right-[10%]">
                <span className="absolute -top-4 md:top-5 -left-45 text-3xl md:text-[5rem] font-semibold uppercase text-[#fdf8f4]">
                  The
                </span>
                <h1 className="text-[7rem] md:text-[15rem] leading-none font-semibold uppercase select-none tracking-tighter text-[#eae8e6]">
                  CAIRN
                </h1>
              </div>
            </div>
          </div>
        )
      },
      {
        type: 'image',
        id: 'layer-2',
        src: secondlayer2,
        alt: 'Midground layer',
        zIndex: 20,
        className: 'left-0 object-cover object-top',
        style: { top: '-15%', width: '100%', height: '130%' },
        parallax: {
          from: { yPercent: 0, scale: 1 },
          to:   { yPercent: 5, scale: 1.05 },
        },
      },
      {
        type: 'element',
        id: 'hotel-text',
        zIndex: 20,
        className: 'w-full flex justify-end',
        style: { bottom: '40%', left: '-10rem' },
        parallax: {
            from: { yPercent: 0 },
            to:   { yPercent: 60 }
        },
        content: (
          <span className="text-4xl md:text-6xl font-semibold uppercase tracking-[0.2em] text-[#fdf8f4] pr-8 md:pr-[10%]">
            HOTEL
          </span>
        )
      },
      {
        type: 'image',
        id: 'layer-1',
        src: firstlayer1,
        alt: 'Foreground layer',
        zIndex: 30,
        className: 'left-0 object-cover object-top',
        style: { top: '-30%', width: '100%', height: '130%' },
        parallax: {
          from: { yPercent: 0, scale: 1 },
          to:   { yPercent: 15, scale: 1.15 },
        },
      },
      {
        type: 'element',
        id: 'label',
        zIndex: 50,
        className: 'pointer-events-auto',
        style: { bottom: '3rem', left: '3rem' },
        content: (
          <span className="text-xs md:text-sm tracking-[0.2em] font-medium uppercase text-white/90 drop-shadow-md">
            Cedar Breaks
          </span>
        )
      },
      {
        type: 'element',
        id: 'cta',
        zIndex: 50,
        className: 'pointer-events-auto',
        style: { bottom: '4rem', right: '4rem' },
        content: (
          <button className="px-8 md:px-12 py-3 md:py-4 bg-white/10 backdrop-blur-md border border-white/40 rounded-full text-white uppercase tracking-[0.2em] text-xs md:text-sm hover:bg-white/20 transition-all duration-300 cursor-pointer shadow-xl">
            View More
          </button>
        )
      }
    ],
  },
  {
    id: 'exploring',
    navIndex: '02/04',
    className: 'bg-black',
    layers: [
      {
        type: 'image',
        id: 'exploring-bg',
        src: exploringbg,
        alt: 'Exploring background',
        zIndex: 0,
        className: 'left-0 object-cover object-top',
        style: { top: '-15%', width: '100%', height: '130%' },
        parallax: {
          from: { yPercent: -15, scale: 1.25 },
          to:   { yPercent: 10, scale: 1 },
        },
      },
      {
        type: 'element',
        id: 'exploring-overlay',
        zIndex: 10,
        className: 'pointer-events-none inset-0 bg-black/10'
      },
      {
        type: 'element',
        id: 'exploring-heading',
        zIndex: 20,
        className: 'flex flex-col items-center text-center inset-0 justify-center h-full w-full',
        parallax: {
          from: { yPercent: -12.5 },
          to:   { yPercent: 12.5 },
        },
        content: (
          <h2 className="text-[5rem] md:text-[14rem] leading-none font-bold uppercase tracking-tighter text-[#faf9f8] select-none mix-blend-overlay opacity-95">
            Exploring
          </h2>
        )
      },
      {
        type: 'element',
        id: 'exploring-label',
        zIndex: 50,
        className: 'pointer-events-auto',
        style: { bottom: '3rem', left: '3rem' },
        content: (
          <span className="text-xs md:text-sm tracking-[0.2em] font-medium uppercase text-white/90 drop-shadow-md">
            Zion National Park
          </span>
        )
      },
      {
        type: 'element',
        id: 'exploring-cta',
        zIndex: 50,
        className: 'pointer-events-auto',
        style: { top: '3rem', right: '4rem' },
        content: (
          <button className="hidden md:block px-10 py-3 bg-black/30 backdrop-blur-md border border-white/30 rounded-full text-white uppercase tracking-[0.2em] text-sm hover:bg-black/50 transition-all duration-300 shadow-xl cursor-pointer">
            Discover
          </button>
        )
      }
    ],
  },
  {
    id: 'hero-2',
    navIndex: '03/04',
    isHero: false,
    className: 'bg-black',
    layers: [
      // {
      //   type: 'image',
      //   id: 'layer-3-dup',
      //   src: theaterlayer3,
      //   alt: 'Background layer',
      //   zIndex: 10,
      //   className: 'left-0 object-cover object-top',
      //   style: { top: '-15%', width: '100%', height: '130%' },
      //   parallax: {
      //     from: { yPercent: -10, scale: 1.1 },
      //     to:   { yPercent: 15, scale: 1 },
      //   },
      // },
      {
        type: 'element',
        id: 'hero-heading-dup',
        zIndex: 125,
        className: 'flex flex-col items-center justify-center w-full h-full mix-blend-overlay opacity-90 tracking-widest text-[#e8dfd5]',
        style: { top: '-10%', left: '-2.5rem' },
        parallax: {
          from: { yPercent: -40 },
          to:   { yPercent: 40 },
        },
        content: (
          <div className="relative flex flex-col items-center">
            <div className="relative flex justify-center items-center">
              <div className="z-130 md:right-[10%]">
                <h1 className="text-[7rem] md:text-[15rem] leading-none font-semibold uppercase select-none tracking-tighter text-white">
                  THEATER
                </h1>
              </div>
            </div>
          </div>
        )
      },
      {
        type: 'image',
        id: 'layer-2-dup',
        src: theaterlayer2,
        alt: 'Midground layer',
        zIndex: 40,
        className: 'left-0 object-cover object-top',
        style: { top: '-20%', width: '100%', height: '130%' },
        parallax: {
          from: { yPercent: -5, scale: 1.05 },
          to:   { yPercent: 5, scale: 1 },
        },
      },
      {
        type: 'element',
        id: 'hotel-text-dup',
        zIndex: 20,
        className: 'w-full flex justify-end',
        style: { bottom: '40%', left: '-10rem' },
        parallax: {
          from: { yPercent: -30 },
          to:   { yPercent: 60 },
        },
      },
      {
        type: 'image',
        id: 'layer-1-dup',
        src: theaterlayer1,
        alt: 'Foreground layer',
        zIndex: 30,
        className: 'left-0 object-cover object-top',
        style: { top: '-25%', width: '100%', height: '130%' },
        parallax: {
          from: { yPercent: -5, scale: 1.15 },
          to:   { yPercent: 15, scale: 1 },
        },
      },
      {
        type: 'element',
        id: 'label-dup',
        zIndex: 50,
        className: 'pointer-events-auto',
        style: { bottom: '3rem', left: '3rem' },
        content: (
          <span className="text-xs md:text-sm tracking-[0.2em] font-medium uppercase text-white/90 drop-shadow-md">
            Cedar Breaks
          </span>
        )
      },
      {
        type: 'element',
        id: 'cta-dup',
        zIndex: 50,
        className: 'pointer-events-auto',
        style: { bottom: '4rem', right: '4rem' },
        content: (
          <button className="px-8 md:px-12 py-3 md:py-4 bg-white/10 backdrop-blur-md border border-white/40 rounded-full text-white uppercase tracking-[0.2em] text-xs md:text-sm hover:bg-white/20 transition-all duration-300 cursor-pointer shadow-xl">
            View More
          </button>
        )
      }
    ],
  },
   {
    id: 'hero',
    navIndex: '01/04',
    isHero: true,
    className: 'bg-black',
    layers: [
      {
        type: 'image',
        id: 'layer-3',
        src: thirdlayer3,
        alt: 'Background layer',
        zIndex: 10,
        className: 'left-0 object-cover object-top',
        style: { top: '-15%', width: '100%', height: '130%' },
        parallax: {
          from: { yPercent: 0, scale: 1 },
          to:   { yPercent: 15, scale: 1.1 },
        },
      },
      {
        type: 'element',
        id: 'hero-heading',
        zIndex: 15,
        className: 'flex flex-col items-center justify-center w-full h-full mix-blend-overlay opacity-90 tracking-widest text-[#e8dfd5]',
        style: { top: '-10%', left: '-2.5rem' },
        parallax: {
          from: { yPercent: 0 },
          to:   { yPercent: 40 },
        },
        content: (
          <div className="relative flex flex-col items-center">
            <div className="relative flex justify-center items-center">
              <div className="z-50 md:right-[10%]">
                <span className="absolute -top-4 md:top-5 -left-45 text-3xl md:text-[5rem] font-semibold uppercase text-[#fdf8f4]">
                  The
                </span>
                <h1 className="text-[7rem] md:text-[15rem] leading-none font-semibold uppercase select-none tracking-tighter text-[#eae8e6]">
                  CAIRN
                </h1>
              </div>
            </div>
          </div>
        )
      },
      {
        type: 'image',
        id: 'layer-2',
        src: secondlayer2,
        alt: 'Midground layer',
        zIndex: 20,
        className: 'left-0 object-cover object-top',
        style: { top: '-15%', width: '100%', height: '130%' },
        parallax: {
          from: { yPercent: 0, scale: 1 },
          to:   { yPercent: 5, scale: 1.05 },
        },
      },
      {
        type: 'element',
        id: 'hotel-text',
        zIndex: 20,
        className: 'w-full flex justify-end',
        style: { bottom: '40%', left: '-10rem' },
        parallax: {
            from: { yPercent: 0 },
            to:   { yPercent: 60 }
        },
        content: (
          <span className="text-4xl md:text-6xl font-semibold uppercase tracking-[0.2em] text-[#fdf8f4] pr-8 md:pr-[10%]">
            HOTEL
          </span>
        )
      },
      {
        type: 'image',
        id: 'layer-1',
        src: firstlayer1,
        alt: 'Foreground layer',
        zIndex: 30,
        className: 'left-0 object-cover object-top',
        style: { top: '-30%', width: '100%', height: '130%' },
        parallax: {
          from: { yPercent: 0, scale: 1 },
          to:   { yPercent: 15, scale: 1.15 },
        },
      },
      {
        type: 'element',
        id: 'label',
        zIndex: 50,
        className: 'pointer-events-auto',
        style: { bottom: '3rem', left: '3rem' },
        content: (
          <span className="text-xs md:text-sm tracking-[0.2em] font-medium uppercase text-white/90 drop-shadow-md">
            Cedar Breaks
          </span>
        )
      },
      {
        type: 'element',
        id: 'cta',
        zIndex: 50,
        className: 'pointer-events-auto',
        style: { bottom: '4rem', right: '4rem' },
        content: (
          <button className="px-8 md:px-12 py-3 md:py-4 bg-white/10 backdrop-blur-md border border-white/40 rounded-full text-white uppercase tracking-[0.2em] text-xs md:text-sm hover:bg-white/20 transition-all duration-300 cursor-pointer shadow-xl">
            View More
          </button>
        )
      }
    ],
  },
]

type SectionRefs = {
  section: React.RefObject<HTMLElement | null>
  layers: React.RefObject<any | null>[]
}

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const numbersRef = useRef<HTMLDivElement>(null)

  const sectionRefs = useRef<SectionRefs[]>(
    SECTIONS.map((cfg) => ({
      section: React.createRef<HTMLElement>(),
      layers: cfg.layers.map(() => React.createRef<any>()),
    }))
  )

  useGSAP(() => {
    SECTIONS.forEach((cfg, sectionIdx) => {
      const { section, layers } = sectionRefs.current[sectionIdx]

      const scrollTriggerConfig: ScrollTrigger.Vars = cfg.isHero
        ? { trigger: section.current, start: 'top top', end: 'bottom top', scrub: 1 }
        : { trigger: section.current, start: 'top bottom', end: 'bottom top', scrub: 1 }

      const tl = gsap.timeline({ scrollTrigger: scrollTriggerConfig })

      cfg.layers.forEach((layerCfg, layerIdx) => {
        const el = layers[layerIdx].current
        if (!el || !layerCfg.parallax) return

        if (cfg.isHero) {
          tl.to(el, { ...layerCfg.parallax.to, ease: 'power1.inOut' }, 0)
        } else {
          tl.fromTo(
            el,
            { ...layerCfg.parallax.from },
            { ...layerCfg.parallax.to, ease: 'sine.out' },
            0
          )
        }
      })
    })

    const nonHeroSections = sectionRefs.current.filter((_, idx) => !SECTIONS[idx].isHero)
    if (nonHeroSections.length > 0 && nonHeroSections[0].section.current) {
      const firstNonHeroSection = nonHeroSections[0].section
      const totalSections = SECTIONS.length
      gsap.to(numbersRef.current, {
        yPercent: -100 * (totalSections - 1) / totalSections,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: firstNonHeroSection.current,
          start: 'top 60%',
          end: `+=${nonHeroSections.length * 400}`,
          scrub: 1,
        },
      })
    }
  }, { scope: containerRef })

  const renderNavNumbers = () =>
    SECTIONS.map((s, i) => {
      const [current, total] = s.navIndex.split('/')
      return (
        <div key={`${s.id}-${i}`} className="h-6 flex items-center shrink-0">
          {current}
          <span className="text-white/50">/{total}</span>
        </div>
      )
    })

  const renderSection = (cfg: SectionConfig, sectionIdx: number) => {
    const { section, layers } = sectionRefs.current[sectionIdx]

    return (
      <section
        ref={section}
        key={`${cfg.id}-${sectionIdx}`}
        className={`relative w-full h-screen overflow-hidden flex items-center justify-center ${cfg.className || ''}`}
      >
        {cfg.layers.map((layer, layerIdx) => {
          const ref = layers[layerIdx]
          
          if (layer.type === 'image' && layer.src) {
            return (
              <Image
                key={layer.id}
                ref={ref}
                src={layer.src}
                alt={layer.alt || ''}
                priority={sectionIdx === 0}
                className={`absolute pointer-events-none ${layer.className || ''}`}
                style={{
                  zIndex: layer.zIndex,
                  ...layer.style,
                }}
              />
            )
          }

          if (layer.type === 'element') {
            return (
              <div
                key={layer.id}
                ref={ref}
                className={`absolute ${layer.className || ''}`}
                style={{
                  zIndex: layer.zIndex,
                  ...layer.style,
                }}
              >
                {layer.content}
              </div>
            )
          }

          return null
        })}
      </section>
    )
  }

  return (
    <div ref={containerRef} className="w-full relative flex flex-col bg-[#1a1818] text-white">
      <div className="absolute inset-0 pointer-events-none z-[100]">
        <div className="sticky top-0 left-0 w-full h-screen">
          <div className="absolute top-1/2 -translate-y-1/2 left-10 flex flex-col items-center pointer-events-auto">
            <div className="h-6 overflow-hidden mb-12 relative w-12 flex justify-center">
              <div
                ref={numbersRef}
                className="absolute top-0 flex flex-col items-center text-white text-sm tracking-widest font-medium gap-0"
              >
                {renderNavNumbers()}
              </div>
            </div>
            <div className="w-[1px] h-32 md:h-48 bg-white/40 relative">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/90 drop-shadow-md">
                Nature
              </span>
            </div>
          </div>
        </div>
      </div>

      {SECTIONS.map((cfg, i) => renderSection(cfg, i))}
    </div>
  )
}

export default Hero