'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import hotel1 from '@/assets/hotel/stay_at_carin1.jpg'
import hotel2 from '@/assets/hotel/shakespeare_quote.jpg'
import hotel3 from '@/assets/hotel/stay_at_carin3.jpg'
import hotel4 from '@/assets/hotel/room_canyon.jpg'
import hotel5 from '@/assets/hotel/reception.jpg'
import Link from 'next/link'

const images = [
  { src: hotel1, alt: 'Hotel Room 1' },
  { src: hotel2, alt: 'Shakespeare Quote' },
  { src: hotel3, alt: 'Hotel Pool' },
  { src: hotel4, alt: 'Canyon Room' },
  { src: hotel5, alt: 'Reception' },
]

const StayAtCairn = () => {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Images start small (scale 0.5) and grow as section enters viewport
  const globalScale = useTransform(scrollYProgress, [0, 0.3, 0.5], [0.5, 0.95, 1])
  const globalOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 md:py-32 bg-white overflow-hidden"
    >
      {/* Text content */}
      <div className="px-6 text-center mb-14 md:mb-20">
        <motion.h2
          className="text-2xl md:text-5xl lg:text-[56px] font-semibold text-black leading-[1.1] md:tracking-tight mb-6 md:mb-8"
          style={{ opacity: globalOpacity }}
        >
          <span className="hidden md:inline">Stay at Cairn</span>
          <span className="md:hidden">Luxury Stay With Cairn</span>
        </motion.h2>

        <motion.p
          className="text-[#555] text-base md:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl mx-auto mb-8 md:mb-10"
          style={{ opacity: globalOpacity }}
        >
          Experience a refined escape at Cairn Hotel, where comfort and nature come
          together in perfect harmony.
        </motion.p>
        <Link href={'/gallery'}>
          <motion.button
            className="px-10 py-2.5 rounded-full border border-black text-black text-[12px] md:text-[13px] font-medium tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
            style={{ opacity: globalOpacity }}
          >
            SEE SPACE
          </motion.button>
        </Link>
      </div>

      {/* Desktop Image Gallery — 5 images fanned out */}
      <div className="hidden md:block">
        <DesktopGallery scrollYProgress={scrollYProgress} globalScale={globalScale} />
      </div>

      {/* Mobile Image Gallery — stacked card deck */}
      <div className="block md:hidden">
        <MobileGallery scrollYProgress={scrollYProgress} globalScale={globalScale} />
      </div>
    </section>
  )
}


interface GalleryProps {
  scrollYProgress: MotionValue<number>
  globalScale: MotionValue<number>
}

function DesktopGallery({ scrollYProgress, globalScale }: GalleryProps) {
  return (
    <div className="relative w-full h-[350px] lg:h-[400px] xl:h-[450px] mt-8">
      {images.map((img, i) => (
        <DesktopCard
          key={i}
          img={img}
          index={i}
          isCenter={i === 2}
          scrollYProgress={scrollYProgress}
          globalScale={globalScale}
        />
      ))}
    </div>
  )
}

interface CardProps {
  img: typeof images[0]
  index: number
  isCenter: boolean
  scrollYProgress: MotionValue<number>
  globalScale: MotionValue<number>
}

function DesktopCard({ img, index, isCenter, scrollYProgress, globalScale }: CardProps) {
  const offsets = [-710, -355, 0, 355, 710]
  const rotations = [-8, -4, 0, 4, 8]

  const x = useTransform(scrollYProgress, [0, 0.4], [0, offsets[index]])
  const rotate = useTransform(scrollYProgress, [0, 0.4], [0, rotations[index]])

  return (
    <motion.div
      className="absolute top-0 left-1/2"
      style={{
        x,
        rotate,
        scale: globalScale,
        width: 350,
        height: 337,
        marginLeft: -175,
        marginTop: isCenter ? 0 : '1%',
        zIndex: isCenter ? 10 : 5 - Math.abs(index - 2),
      }}
    >
      <div className="w-full h-full overflow-hidden rounded-sm">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          className="object-cover w-full h-full transition-transform duration-700 hover:scale-[1.05]"
          quality={95}
        />
      </div>
    </motion.div>
  )
}


function MobileGallery({ scrollYProgress, globalScale }: GalleryProps) {
  return (
    <div className="relative w-full h-[300px] sm:h-[460px] px-4">
      {images.map((img, i) => (
        <MobileCard
          key={i}
          img={img}
          index={i}
          isCenter={i === 2}
          scrollYProgress={scrollYProgress}
          globalScale={globalScale}
        />
      ))}
    </div>
  )
}


const mobileCardConfig = [
  { offsetX: -180, rot: -15, w: 170, h: '82%', z: 1, mt: '5%' },   // far left — mostly off-screen
  { offsetX: -100, rot: -8,  w: 200, h: '88%', z: 3, mt: '3%' },   // left — peeking in
  { offsetX: 0,    rot: 0,   w: 280, h: '100%', z: 10, mt: '0%' },  // center — dominant
  { offsetX: 100,  rot: 8,   w: 200, h: '88%', z: 3, mt: '3%' },   // right — peeking in
  { offsetX: 180,  rot: 15,  w: 170, h: '82%', z: 1, mt: '5%' },   // far right — mostly off-screen
]

function MobileCard({ img, index, isCenter, scrollYProgress, globalScale }: CardProps) {
  const cfg = mobileCardConfig[index]

  const x = useTransform(scrollYProgress, [0, 0.35], [0, cfg.offsetX])
  const rotate = useTransform(scrollYProgress, [0, 0.35], [0, cfg.rot])

  return (
    <motion.div
      className="absolute top-0 left-1/2"
      style={{
        x,
        rotate,
        scale: globalScale,
        width: cfg.w,
        height: cfg.h,
        marginLeft: -(cfg.w / 2),
        marginTop: cfg.mt,
        zIndex: cfg.z,
      }}
    >
      <div className="w-full h-full overflow-hidden rounded-sm">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          className="object-cover w-full h-full"
          quality={85}
        />
      </div>
    </motion.div>
  )
}

export default StayAtCairn