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
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="w-full px-8 md:px-16 lg:px-24 pt-15 mb-5 md:pt-32">
        <h2 className="text-2xl md:text-[52px] font-normal text-white leading-tight tracking-tight">
          Sustainability starts with us
        </h2>
        <p className="text-white/90 text-sm md:text-xl font-light">
          We protect what we love - with green energy, local food, and plastic-free choices that care for our surroundings.
        </p>
      </div>


      <div className="w-full px-4 md:px-12 lg:px-20 pb-12 md:pb-16 mt-auto">
        <div className="w-full bg-black/10 backdrop-blur-xs rounded-[2.5rem] border border-white/10 p-8 md:p-12 lg:py-16 lg:px-16 shadow-2xl">
          <div className="flex flex-col md:flex-row w-full justify-between gap-6 md:gap-0">
            {stats.map((stat, index) => (
              <React.Fragment key={index}>
                {index !== 0 && (
                  <>
                    <div className="hidden md:block w-px bg-white/40" />
                    <div className="md:hidden h-px w-full bg-white/40" />
                  </>
                )}
                <div className="flex-1 flex flex-col py-1 md:py-0 px-0 md:px-8 lg:px-12 first:pt-0 last:pb-0 md:first:pl-0 md:last:pr-0">
                  <div className="text-2xl md:text-[40px] font-medium text-white mb-2 md:mb-4">
                    <Counter text={stat.value} />
                  </div>
                  <div className="text-sm md:text-xl  text-white/90 font-light whitespace-pre-line leading-[1.3]">
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