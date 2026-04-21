

'use client'

import React, { useRef } from 'react'
import Image, { StaticImageData } from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import carinbg from '@/assets/Home/home_banner.jpg'
import cairnlayer2 from '@/assets/Home/home_banner_layer.png'
import exploringbg from '@/assets/Home/exploringbg.jpg'
import firstlayer1 from '@/assets/Home/Layer 1.png'
import secondlayer2 from '@/assets/Home/Layer 2.png'
import thirdlayer3 from '@/assets/Home/Layer 3.png'
import snowlayer1 from '@/assets/Home/snowlayer_1.png'
import snowlayer2 from '@/assets/Home/snowlayer_2.png'
import carinhotel_bg from '@/assets/Home/hero_mobile_1.jpg'
import exploring_bg_mobil from '@/assets/Home/hero_mobile_2.jpg'
import  theater_mobile_bg from '@/assets/Home/hero_mobile_3.png'
import skiing_mobile_bg from '@/assets/Home/hero_mobile_4.png'

import theaterlayer1 from '@/assets/Home/theater_bg.jpg'
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
    to: gsap.TweenVars
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
  mobileBg?: StaticImageData
  layers: LayerConfig[]
}

const SECTIONS: SectionConfig[] = [
  {
    id: 'hero',
    navIndex: '01/04',
    isHero: true,
    className: 'bg-black',
    mobileBg: carinhotel_bg,
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
          to: { yPercent: 15, scale: 1.1 },
        },
      },
      {
        type: 'element',
        id: 'hero-heading',
        zIndex: 15,
        className: 'flex flex-col items-center top-[-10%] md:left-[-2.5rem] justify-center w-full h-full tracking-widest text-[#FFFFFFB2]',
        // style: { top: '-10%', left: '-2.5rem' },
        parallax: {
          from: { yPercent: 0 },
          to: { yPercent: 40 },
        },
        content: (
          <div className="relative flex flex-col items-center">
            <div className="relative flex justify-center items-center">
              <div className="z-50  md:right-[10%]">
                <span className="absolute -top-4 md:top-5 -left-15 md:-left-45 text-3xl md:text-[5rem] font-semibold uppercase text-white">
                  The
                </span>
                <h1 className="text-6xl  md:text-[15rem] leading-none font-semibold uppercase select-none tracking-tighter text-white">
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
          to: { yPercent: 5, scale: 1.05 },
        },
      },
      {
        type: 'element',
        id: 'hotel-text',
        zIndex: 20,
        className: 'w-full flex justify-end md:left-[-10rem] md:bottom-[40%] bottom-[53%] ',
        // style: { bottom: '40%', left: '-10rem' },
        parallax: {
          from: { yPercent: 0 },
          to: { yPercent: 60 }
        },
        content: (
          <span className="text-3xl md:text-6xl font-semibold uppercase tracking-normal md:tracking-[0.2em] text-[#fdf8f4] pr-8 md:pr-[10%]">
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
          to: { yPercent: 15, scale: 1.15 },
        },
      },
      {
        type: 'element',
        id: 'label',
        zIndex: 50,
        className: 'pointer-events-auto md:bottom-[3rem] bottom-[15%] left-5  md:left-[4rem]',
        // style: { bottom: '3rem', left: '3rem' },
        content: (
          <span className="text-sm md:text-sm tracking-[0.2em] font-light md:font-medium uppercase text-white/90 drop-shadow-md">
            Cedar Breaks
          </span>
        )
      },
      {
        type: 'element',
        id: 'cta',
        zIndex: 50,
        className: 'pointer-events-auto md:bottom-[4rem] bottom-[47%] right-[10%] md:right-[4rem]',
        // style: { bottom: '4rem', right: '4rem' },
        content: (
          <button className="px-6 md:px-12 py-2 md:py-4 bg-white/1 backdrop-blur-xs border border-white/40 rounded-full text-white uppercase tracking-[0.2em] text-xs md:text-sm hover:bg-white/20 transition-all duration-300 cursor-pointer shadow-xl">
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
    mobileBg: exploring_bg_mobil,
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
          to: { yPercent: 10, scale: 1 },
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
          to: { yPercent: 12.5 },
        },
        content: (
          <h2 className="text-5xl md:text-[14rem] leading-none font-bold uppercase md:tracking-tighter text-[#faf9f8] select-none mix-blend-overlay opacity-95">
            Exploring
          </h2>
        )
      },
      {
        type: 'element',
        id: 'exploring-label',
        zIndex: 50,
        className: 'pointer-events-auto md:bottom-[3rem] bottom-[10%] left-5 md:left-[3rem]',
        // style: { bottom: '3rem', left: '3rem' },
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
        className: 'pointer-events-auto top-[3rem] right-5 md:right-[4rem]',
        // style: { top: '3rem', right: '4rem' },
        content: (
          <button className="px-6 md:px-12 py-2 md:py-4 bg-white/1 backdrop-blur-xs border border-white/40 rounded-full text-white uppercase tracking-[0.2em] text-xs md:text-sm hover:bg-white/20 transition-all duration-300 cursor-pointer shadow-xl">
            Discover
          </button>
        )
      }
    ],
  },
  {
    id: 'theater',
    navIndex: '03/04',
    className: 'bg-black',
    mobileBg: theater_mobile_bg,
    layers: [
      {
        type: 'image',
        id: 'exploring-bg',
        src: theaterlayer1,
        alt: 'Theater background',
        zIndex: 0,
        className: 'left-0 object-cover object-top',
        style: { top: '-15%', width: '100%', height: '130%' },
        parallax: {
          from: { yPercent: -15, scale: 1.25 },
          to: { yPercent: 10, scale: 1 },
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
        className: 'flex flex-col items-center text-center inset-0 justify-start h-full w-full pt-[35%] md:pt-20',
        parallax: {
          from: { yPercent: -12.5 },
          to: { yPercent: 12.5 },
        },
        content: (
          <div className="flex flex-col items-center gap-6 md:gap-10">
            <h2 className="text-5xl md:text-[14rem] leading-none font-bold uppercase text-[#faf9f8] select-none mix-blend-overlay opacity-95">
              Theater
            </h2>
            <button className="px-6 md:px-12 py-2 md:py-4 bg-white/1 backdrop-blur-xs border border-white/40 rounded-full text-white uppercase tracking-[0.2em] text-xs md:text-sm hover:bg-white/20 transition-all duration-300 cursor-pointer shadow-xl">
              View More
            </button>
          </div>
        )
      },
      {
        type: 'element',
        id: 'exploring-label',
        zIndex: 50,
        className: 'pointer-events-auto bottom-[15%] md:bottom-[3rem] left-5 md:left-[3rem]',
        // style: { bottom: '3rem', left: '3rem' },
        content: (
          <span className="text-xs md:text-sm md:tracking-[0.2em] tracking-[0.01em] font-medium uppercase text-white/90 drop-shadow-md">
            The Utah Shakespeare Festival
          </span>
        )
      }
    ],
  },
  {
    id: 'hero',
    navIndex: '04/04',
    isHero: true,
    className: 'bg-black',
    mobileBg: skiing_mobile_bg,
    layers: [
      {
        type: 'image',
        id: 'layer-bg',
        src: snowlayer1,
        alt: 'Skiing background',
        zIndex: 10,
        className: 'left-0 object-cover object-center',
        style: { top: '-15%', width: '100%', height: '130%' },
        parallax: {
          from: { yPercent: 0, scale: 1 },
          to: { yPercent: 15, scale: 1.1 },
        },
      },
      {
        type: 'element',
        id: 'skiing-text',
        zIndex: 25,
        className: 'flex flex-col items-center justify-center w-full h-full opacity-95 tracking-widest',
        parallax: {
          from: { yPercent: 0 },
          to: { yPercent: 40 },
        },
        content: (
          <div className="relative flex flex-col items-center">
            <h1 className="text-5xl md:text-[15rem] leading-none font-semibold uppercase select-none tracking-tighter text-white">
              SKIING
            </h1>
          </div>
        )
      },
      {
        type: 'image',
        id: 'layer-fg',
        src: snowlayer2,
        alt: 'Skiing foreground',
        zIndex: 30,
        className: 'left-0 object-cover object-bottom',
        style: { bottom: '-10%', top: 'auto', width: '100%', height: '65%' },
        parallax: {
          from: { yPercent: 0, scale: 1 },
          to: { yPercent: -12, scale: 1.15 },
        },
      },
      {
        type: 'element',
        id: 'snow-label',
        zIndex: 50,
        className: 'pointer-events-auto bottom-[15%] md:bottom-[3rem] left-5 md:left-[3rem]',
        // style: { bottom: '3rem', left: '3rem' },
        content: (
          <span className="text-xs md:text-sm md:tracking-[0.2em] tracking-[0.01em] font-medium uppercase text-white/90 drop-shadow-md">
            Brian Head Ski Resort
          </span>
        )
      },
      {
        type: 'element',
        id: 'snow-cta',
        zIndex: 50,
        className: 'pointer-events-auto',
        style: { bottom: '4rem', right: '4rem' },
        content: (
          <button className="px-8 md:px-12 py-3 md:py-4 bg-white/10 backdrop-blur-md border border-white/40 rounded-full text-white uppercase tracking-[0.2em] text-xs md:text-sm hover:bg-white/20 transition-all duration-300 cursor-pointer shadow-xl">
            View Events
          </button>
        )
      },
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
    const mm = gsap.matchMedia()

    // Parallax animations — desktop only
    mm.add('(min-width: 768px)', () => {
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
    })

    // Nav number scroll indicator — all screen sizes
    const totalSections = SECTIONS.length
    sectionRefs.current.forEach(({ section }, idx) => {
      ScrollTrigger.create({
        trigger: section.current,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => {
          gsap.to(numbersRef.current, {
            yPercent: -100 * idx / totalSections,
            ease: 'power2.out',
            duration: 0.4
          })
        },
        onEnterBack: () => {
          gsap.to(numbersRef.current, {
            yPercent: -100 * idx / totalSections,
            ease: 'power2.out',
            duration: 0.4
          })
        }
      })
    })

    return () => mm.revert()
  }, { scope: containerRef })

  const renderNavNumbers = () =>
    SECTIONS.map((s, i) => {
      const [current, total] = s.navIndex.split('/')
      return (
        <div key={`${s.id}-${i}`} className="h-6 flex items-center shrink-0">
          {current}
          <span className="text-white/50 text-sm">/{total}</span>
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
        {/* Static mobile background — shown only on mobile, no parallax */}
        {cfg.mobileBg && (
          <Image
            src={cfg.mobileBg}
            alt="Mobile background"
            priority={sectionIdx === 0}
            className="absolute inset-0 block md:hidden object-cover w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
          />
        )}

        {cfg.layers.map((layer, layerIdx) => {
          const ref = layers[layerIdx]

          if (layer.type === 'image' && layer.src) {
            // Desktop parallax images — hidden on mobile
            return (
              <Image
                key={layer.id}
                ref={ref}
                src={layer.src}
                alt={layer.alt || ''}
                priority={sectionIdx === 0}
                className={`absolute pointer-events-none hidden md:block ${layer.className || ''}`}
                style={{
                  zIndex: layer.zIndex,
                  ...layer.style,
                }}
              />
            )
          }

          if (layer.type === 'element') {
            // UI/text layers — shown on both, z-index sits above the mobile bg (zIndex 1)
            return (
              <div
                key={layer.id}
                ref={ref}
                className={`absolute ${layer.className || ''}`}
                style={{
                  zIndex: layer.zIndex + 1,
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
          <div className="absolute top-1/2 -translate-y-1/2 -left-5 md:left-12 flex flex-col items-center pointer-events-auto">
            <div className="h-6 overflow-hidden mb-12 relative w-25 flex justify-center">
              <div
                ref={numbersRef}
                className="absolute top-0 flex flex-col items-center text-white text-xl font-medium gap-0"
              >
                {renderNavNumbers()}
              </div>
            </div>
            <div className="w-[1px] h-[52dvh] md:h-[48dvh] bg-white/40 relative">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 text-[10px] md:text-base tracking-[0.3em] uppercase text-white/90 drop-shadow-md">
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