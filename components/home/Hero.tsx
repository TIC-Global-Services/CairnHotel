// Hero.tsx - Scalable Parallax Architecture

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
// import section3bg from '@/assets/Home/section3bg.jpg'  ← just add more imports

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// ─────────────────────────────────────────────
// 1. SECTION CONFIG — Add a new section here only
// ─────────────────────────────────────────────
interface SectionConfig {
  id: string;
  bg: StaticImageData;
  label: string;         // bottom-left location label
  heading: string;       // big overlay heading
  cta: string;           // button text
  navIndex: string;      // e.g. "02/04"
  // parallax tuning per section (optional overrides)
  parallax?: {
    fromY?: number;   // starting yPercent (default -15)
    toY?: number;     // ending yPercent  (default 10)
    fromScale?: number;
    toScale?: number;
  };
}

const SECTIONS: SectionConfig[] = [
  {
    id: 'exploring',
    bg: exploringbg,
    label: 'Zion National Park',
    heading: 'Exploring',
    cta: 'Discover',
    navIndex: '02/04',
    parallax: { fromY: -15, toY: 10, fromScale: 1.25, toScale: 1 },
  },
];


type SectionRefs = {
  section: React.RefObject<HTMLElement | null>;
  bg: React.RefObject<HTMLImageElement | null>;
};

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const layer1Ref = useRef<HTMLImageElement>(null);
  const layer2Ref = useRef<HTMLImageElement>(null);
  const layer3Ref = useRef<HTMLImageElement>(null);
  const textRef   = useRef<HTMLDivElement>(null);
  const hotelRef  = useRef<HTMLDivElement>(null);
  const heroRef   = useRef<HTMLElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);


  const sectionRefs = useRef<SectionRefs[]>(
    SECTIONS.map(() => ({
      section: React.createRef<HTMLElement>(),
      bg:      React.createRef<HTMLImageElement>(),
    }))
  );

  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      }
    })
    .to(layer1Ref.current,{ yPercent: 15, scale: 1.15, ease: "power1.inOut" }, 0)
    .to(layer2Ref.current,{ yPercent: 5,  scale: 1.05, ease: "power1.inOut" }, 0)
    .to(textRef.current,  { yPercent: 40, ease: "power1.inOut" }, 0)
    .to(hotelRef.current, { yPercent: 60, ease: "power1.inOut" }, 0)
    .to(layer3Ref.current,{ yPercent: 15, scale: 1.1, ease: "power1.inOut" }, 0);

    SECTIONS.forEach((cfg, i) => {
      const { section, bg } = sectionRefs.current[i];
      const p = cfg.parallax ?? {};
      const fromY     = p.fromY     ?? -15;
      const toY       = p.toY       ?? 10;
      const fromScale = p.fromScale ?? 1.25;
      const toScale   = p.toScale   ?? 1;

      gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      })
      .fromTo(
        bg.current,
        { yPercent: fromY, scale: fromScale },
        { yPercent: toY,   scale: toScale, ease: "sine.out" },
        0
      );
    });

    const firstSection = sectionRefs.current[0]?.section;
    if (firstSection?.current) {
      gsap.to(numbersRef.current, {
        yPercent: -50 * SECTIONS.length,   
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: firstSection.current,
          start: "top 60%",
          end: `+=${SECTIONS.length * 300}`,
          scrub: 1,
        }
      });
    }

  }, { scope: containerRef });

  const renderNavNumbers = () => (
    <>
      <div className="h-6 flex items-center">01<span className="text-white/50">/04</span></div>
      {SECTIONS.map((s) => (
        <div key={s.id} className="h-6 flex items-center">
          {s.navIndex.split('/')[0]}
          <span className="text-white/50">/{s.navIndex.split('/')[1]}</span>
        </div>
      ))}
    </>
  );

  const renderSection = (cfg: SectionConfig, i: number) => {
    const refs = sectionRefs.current[i];
    return (
      <section
        key={cfg.id}
        ref={refs.section}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black"
      >
        <Image
          ref={refs.bg}
          src={cfg.bg}
          alt={cfg.heading}
          className="absolute left-0 -top-[15%] w-full h-[130%] object-cover pointer-events-none z-0"
        />

        <div className="absolute inset-0 bg-black/10 pointer-events-none z-10" />

        <div className="relative z-20 flex flex-col items-center text-center">
          <h2 className="text-[5rem] md:text-[14rem] leading-none font-bold uppercase tracking-tighter text-[#faf9f8] select-none mix-blend-overlay opacity-95">
            {cfg.heading}
          </h2>
        </div>

        {/* CTA */}
        <div className="absolute top-12 right-16 z-50 pointer-events-auto">
          <button className="hidden md:block px-10 py-3 bg-black/30 backdrop-blur-md border border-white/30 rounded-full text-white uppercase tracking-[0.2em] text-sm hover:bg-black/50 transition-all duration-300 shadow-xl cursor-pointer">
            {cfg.cta}
          </button>
        </div>

        {/* Location label */}
        <div className="absolute bottom-12 left-12 z-50 pointer-events-auto">
          <span className="text-xs md:text-sm tracking-[0.2em] font-medium uppercase text-white/90 drop-shadow-md">
            {cfg.label}
          </span>
        </div>
      </section>
    );
  };


  return (
    <div ref={containerRef} className="w-full relative flex flex-col bg-[#1a1818] text-white">

      {/* Sticky UI */}
      <div className="absolute inset-0 pointer-events-none z-[100]">
        <div className="sticky top-0 left-0 w-full h-screen">
         

          <div className="absolute top-1/2 -translate-y-1/2 left-10 flex flex-col items-center pointer-events-auto">
            <div className="h-6 overflow-hidden mb-12 relative w-12 flex justify-center">
              <div ref={numbersRef} className="absolute top-0 flex flex-col items-center text-white text-sm tracking-widest font-medium">
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

      {/* Hero — bespoke multi-layer parallax */}
      <section ref={heroRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Layer 1 (Background) */}
        <Image ref={layer1Ref} src={firstlayer1} alt="Background layer"
          className="absolute left-0 -top-[30%] w-full h-[130%] object-cover object-top pointer-events-none z-30" priority />

        {/* Layer 2 (Midground) */}
        <Image ref={layer2Ref} src={secondlayer2} alt="Midground layer"
          className="absolute left-0 -top-[15%] w-full h-[130%] object-cover object-top pointer-events-none z-20" priority />

        {/* Text Layer */}
        <div ref={textRef} className="absolute flex flex-col items-center justify-center z-15 w-full h-full -top-[10%] -left-10 mix-blend-overlay opacity-90 tracking-widest text-[#e8dfd5]">
          <div className="relative flex flex-col items-center">
            <div className="relative flex justify-center items-center">
              <div className=' z-50 md:right-[10%]'>
                <span className=" absolute -top-4 md:top-5 -left-45 text-3xl md:text-[5rem] font-semibold uppercase text-[#fdf8f4]">The</span>
                <h1 className="text-[7rem] md:text-[15rem] leading-none font-semibold uppercase select-none tracking-tighter text-[#eae8e6]">CAIRN</h1>
              </div>
            </div>
          </div>
        </div>

        <div ref={hotelRef} className="w-full absolute bottom-[40%] -left-40 flex z-20 justify-end">
          <span className="text-4xl md:text-6xl font-semibold uppercase tracking-[0.2em] text-[#fdf8f4] mt-[-10px] md:mt-[0px] pr-8 md:pr-[10%]">HOTEL</span>
        </div>

        {/* Layer 3 (Foreground) */}
        <Image ref={layer3Ref} src={thirdlayer3} alt="Foreground layer"
          className="absolute left-0 -top-[15%] w-full h-[130%] object-cover object-top pointer-events-none z-10" priority />

        {/* Bottom Elements */}
        <div className="absolute bottom-12 left-12 z-50 pointer-events-auto">
          <span className="text-xs md:text-sm tracking-[0.2em] font-medium uppercase text-white/90 drop-shadow-md">Cedar Breaks</span>
        </div>
        <div className="absolute bottom-16 right-16 z-50 pointer-events-auto">
          <button className="px-8 md:px-12 py-3 md:py-4 bg-white/10 backdrop-blur-md border border-white/40 rounded-full text-white uppercase tracking-[0.2em] text-xs md:text-sm hover:bg-white/20 transition-all duration-300 cursor-pointer shadow-xl">
            View More
          </button>
        </div>
      </section>

      {/* All generic sections — rendered from config */}
      {SECTIONS.map((cfg, i) => renderSection(cfg, i))}

    </div>
  );
};

export default Hero;