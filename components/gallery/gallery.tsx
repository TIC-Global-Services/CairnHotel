'use client'

import React, { memo } from 'react'
import Image, { StaticImageData } from 'next/image'
import { motion } from 'framer-motion'

// Import images from across the project
import hotel1 from '@/assets/Home/hotel-1.jpg'
import hotel2 from '@/assets/Home/hotel-2.jpg'
import hotel3 from '@/assets/Home/hotel-3.jpg'
import hotel4 from '@/assets/Home/hotel-4.jpg'
import hotel5 from '@/assets/Home/hotel-5.jpg'
import hotel6 from '@/assets/Home/hotel-6.jpg'
import nature1 from '@/assets/hotel/nature-1.jpg'
import nature2 from '@/assets/hotel/nature-2.jpg'
import stay1 from '@/assets/hotel/stay_at_carin1.jpg'
import stay2 from '@/assets/hotel/stay_at_carin2.jpg'
import stay3 from '@/assets/hotel/stay_at_carin3.jpg'
import stay4 from '@/assets/hotel/stay_at_carin4.jpg'
import stay5 from '@/assets/hotel/stay_at_carin5.jpg'
import stay6 from '@/assets/hotel/stay-2.jpg'
import stay7 from '@/assets/hotel/stay-3.jpg'
import elevated from '@/assets/hotel/stayelevated.jpg'
import trusted1 from '@/assets/hotel/trustedby-1.jpg'
import trusted2 from '@/assets/hotel/trustedby-2.jpg'

interface RowConfig {
    images: StaticImageData[]
    direction: 'left' | 'right'
    speed: number
    height: number
    mobileHeight: number
}

const ROWS: RowConfig[] = [
    {
        images: [hotel1, nature1, stay1, hotel5, trusted1, stay4, hotel3],
        direction: 'left',
        speed: 600,
        height: 340,
        mobileHeight: 200,
    },
    {
        images: [stay2, hotel2, elevated, stay5, nature2, hotel6, trusted2],
        direction: 'right',
        speed: 500,
        height: 340,
        mobileHeight: 200,
    },
    {
        images: [hotel4, stay3, stay6, stay7, hotel1, nature1, stay1],
        direction: 'left',
        speed: 550,
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