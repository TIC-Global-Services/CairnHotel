"use client"
import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import trustedby1 from '@/assets/hotel/trustedby-1.jpg'
import trustedby2 from '@/assets/hotel/trustedby-2.jpg'
import trustedby3 from '@/assets/hotel/trustedby-3.jpg'
import trustedby_bg from '@/assets/hotel/trustedby_bg.jpg'

const Counter = ({ text }: { text: string }) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  const match = text.match(/^([\d,]+)(.*)$/)
  const targetNumber = match ? parseInt(match[1].replace(/,/g, ''), 10) : 0
  const suffix = match ? match[2] : text

  useEffect(() => {
    if (!targetNumber) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let current = 0
        const increment = Math.max(1, Math.ceil(targetNumber / 30))
        const timer = setInterval(() => {
          current += increment
          if (current >= targetNumber) {
            setCount(targetNumber)
            clearInterval(timer)
          } else {
            setCount(current)
          }
        }, 50)
        observer.disconnect()
      }
    }, { threshold: 0.1 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [targetNumber])

  if (!match) return <span>{text}</span>

  return <span ref={ref}>{count.toLocaleString('en-US')}{suffix}</span>
}

const TrustedBy = () => {
  const images = [trustedby1, trustedby2, trustedby3, trustedby1, trustedby2, trustedby3]

  return (
    <section className="w-full relative py-24 md:py-32 mt-10 overflow-hidden  flex flex-col items-center ">
      {/* Background Image */}
      <Image
        src={trustedby_bg}
        alt=""
        fill
        className="object-cover z-0 "
        sizes="100vw"
        quality={90}
        priority
      />

      <style>{`
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-slide {
          animation: slide 30s linear infinite;
        }
        .animate-slide:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Top Text Content */}
      <div className="relative z-10 text-center mb-16 md:mb-24 px-4 ">
        <h2 className="text-5xl md:text-[80px] font-light text-white leading-none mb-4 md:mb-6">
          <Counter text="10,000+" />
        </h2>
        <p className="text-white text-sm md:text-base font-medium tracking-wide">
          Trusted by over 10000 guests per year
        </p>
      </div>
        <div className='absolute inset-0 bg-black/30  h-full w-full'></div>
      {/* Auto-Sliding Marquee */}
      {/* <div className="w-full relative">
        <div className="flex w-max animate-slide">
          {[...images, ...images].map((imgSrc, i) => (
            <div key={i} className="pr-6 md:pr-10 shrink-0">
              <div 
                className={`relative w-[260px] md:w-[340px] lg:w-[400px] aspect-260/360 rounded-xl overflow-hidden shadow-lg transition-transform duration-300
                  ${i % 2 !== 0 ? 'mt-12 md:mt-24' : 'mt-0'}
                `}
              >
                <Image
                  src={imgSrc}
                  alt={`Trusted by guest ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 260px, (max-width: 1024px) 340px, 400px"
                />
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </section>
  )
}

export default TrustedBy