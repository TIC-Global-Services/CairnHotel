"use client"
import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import sustainabilityBg from '@/assets/hotel/sustainabily_bg.jpg'

const Counter = ({ text }: { text: string }) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  const match = text.match(/^(\d+)(.*)$/)
  const targetNumber = match ? parseInt(match[1], 10) : 0
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

  return <span ref={ref}>{count}{suffix}</span>
}

const Sustainability = () => {
  const stats = [
    { value: "100%", label: "Renewable energy" },
    { value: "0 km", label: "Local produce" },
    { value: "80%+", label: "Guests choose eco\nhousekeeping" },
    { value: "200+", label: "Native plants in our\ngarden" },
  ]

  return (
    <section className="relative w-full h-screen min-h-screen flex flex-col justify-between overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src={sustainabilityBg}
          alt="Sustainability landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="w-full px-8 md:px-16 lg:px-24 pt-15 mb-5 md:pt-32">
        <h2 className="text-2xl md:text-[52px] font-normal text-white leading-tight tracking-tight">
          Sustainability starts with us
        </h2>
        <p className="text-white/90 mt-2 text-base md:text-xl font-light">
          We protect what we love - with green energy, local food, and plastic-free choices that care for our surroundings.
        </p>
      </div>


      <div className="w-full px-15 md:px-12 lg:px-20 pb-12 md:pb-16 mt-auto">
        <div className="w-full md:bg-black/10 md:backdrop-blur-xs md:rounded-[2.5rem] md:border md:border-white/10 md:p-12 lg:py-16 lg:px-16 md:shadow-2xl">
          <div className="flex flex-col md:flex-row w-full justify-between gap-4 md:gap-0">
            {stats.map((stat, index) => (
              <React.Fragment key={index}>
                {index !== 0 && (
                  <div className="hidden md:block w-px bg-white/40 mx-2" />
                )}
                <div className="flex-1 flex flex-col items-center md:items-start justify-center text-center md:text-left py-8 md:py-0 px-3 md:px-8 lg:px-12 bg-black/40 md:bg-transparent backdrop-blur-md md:backdrop-blur-none rounded-3xl md:rounded-none border border-white/10 md:border-none">
                  <div className="text-3xl md:text-[40px] font-medium text-white mb-2 md:mb-4">
                    <Counter text={stat.value} />
                  </div>
                  <div className="text-base md:text-xl text-white/90 font-light whitespace-pre-line leading-[1.3] text-center md:text-left">
                    {stat.label}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Sustainability