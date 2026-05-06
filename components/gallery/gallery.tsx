'use client'

import React, { memo } from 'react'
import Image, { StaticImageData } from 'next/image'
import { motion } from 'framer-motion'

// Gallery images
import g01 from '@/assets/gallery/g01.jpg'
import g02 from '@/assets/gallery/g02.jpg'
import g03 from '@/assets/gallery/g03.jpg'
import g04 from '@/assets/gallery/g04.jpg'
import g05 from '@/assets/gallery/g05.jpg'
import g06 from '@/assets/gallery/g06.jpg'
import g07 from '@/assets/gallery/g07.jpg'
import g08 from '@/assets/gallery/g08.jpg'
import g09 from '@/assets/gallery/g09.jpg'
import g10 from '@/assets/gallery/g10.jpg'
import g11 from '@/assets/gallery/g11.jpg'
import g12 from '@/assets/gallery/g12.jpg'

interface RowConfig {
    images: StaticImageData[]
    direction: 'left' | 'right'
    speed: number
    height: number
    mobileHeight: number
}

const ROWS: RowConfig[] = [
    {
        images: [g01, g02, g03, g04, g05, g06, g07],
        direction: 'left',
        speed: 600,
        height: 340,
        mobileHeight: 200,
    },
    {
        images: [g08, g09, g10, g11, g12, g01, g02],
        direction: 'right',
        speed: 500,
        height: 340,
        mobileHeight: 200,
    },
    {
        images: [g03, g04, g05, g06, g07, g08, g09],
        direction: 'left',
        speed: 550,
        height: 340,
        mobileHeight: 200,
    },
    {
        images: [g10, g11, g12, g01, g02, g03, g04],
        direction: 'right',
        speed: 520,
        height: 340,
        mobileHeight: 200,
    },
]

const MarqueeRow = memo(({ images, direction, speed, height, mobileHeight }: RowConfig) => {
    
    const duration = 30000 / speed

    const animationName = direction === 'left' ? 'marquee-left' : 'marquee-right'

    const imgWidth = Math.round(height * 1.5)
    const mobileImgWidth = Math.round(mobileHeight * 1.4)

    return (
        <div className="overflow-hidden w-full">
       
            <div
                className="flex gap-3 md:gap-4"
                style={{
                    width: 'max-content',
                    animation: `${animationName} ${duration}s linear infinite`,
                    willChange: 'transform',
                }}
            >
                {/* Render images TWICE for the seamless loop */}
                {[0, 1].map((setIndex) => (
                    <div key={setIndex} className="flex gap-3 md:gap-4 shrink-0">
                        {images.map((src, i) => (
                            <div
                                key={i}
                                className="relative shrink-0 rounded-lg md:rounded-xl overflow-hidden"
                                style={{
                                    width: `${imgWidth}px`,
                                    height: `${height}px`,
                                }}
                            >
                                <Image
                                    src={src}
                                    alt={`Gallery image ${i + 1}`}
                                    fill
                                    sizes={`${imgWidth}px`}
                                    className="object-cover"
                                    loading={setIndex === 0 ? 'eager' : 'lazy'}
                                />
                                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-500 cursor-pointer" />
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <style jsx>{`
                @keyframes marquee-left {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-50%); }
                }
                @keyframes marquee-right {
                    from { transform: translateX(-50%); }
                    to   { transform: translateX(0); }
                }
                @media (max-width: 768px) {
                    div[style*="animation"] > div > div {
                        width: ${mobileImgWidth}px !important;
                        height: ${mobileHeight}px !important;
                    }
                }
            `}</style>
        </div>
    )
})
MarqueeRow.displayName = 'MarqueeRow'

const Gallery = memo(() => {
    return (
        <section className="relative w-full py-16 md:py-24 lg:py-20 overflow-hidden">
            <div className="flex flex-col gap-3 md:gap-10 w-full">
                {ROWS.map((row, i) => (
                    <MarqueeRow key={i} {...row} />
                ))}
            </div>
        </section>
    )
})

Gallery.displayName = 'Gallery'
export default Gallery