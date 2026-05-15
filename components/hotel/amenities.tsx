'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import Waves from '@/assets/Home/icons/hot_tub.svg'
import Mountain from '@/assets/Home/icons/mountain_view.svg'
import Users from '@/assets/Home/icons/family_friendly.svg'
import indoordining from '@/assets/Home/icons/indoor_dining.svg'
import parking from '@/assets/Home/icons/parking_space.svg'

/* ── Amenity data ── */
const amenitiesData = [
    {
        name: 'Hot Tub',
        iconLeft: Waves,
        iconRight: Waves,
    },
    {
        name: 'Mountain View',
        iconLeft: Mountain,
        iconRight: Mountain,
    },
    {
        name: 'Family Friendly',
        iconLeft: Users,
        iconRight: Users,
    },
    {
        name: 'Indoor Dining',
        iconLeft: indoordining,
        iconRight: indoordining,
    },
    {
        name: 'Parking Space',
        iconLeft:parking ,
        iconRight: parking,
    },
]

const AUTO_INTERVAL = 3000 

function MarqueeStrip() {
    const items = Array.from({ length: 8 })
    return (
        <div className="w-full overflow-hidden select-none pointer-events-none mt-10 md:mt-0">
            <div
                className="flex whitespace-nowrap"
                style={{
                    animation: 'amenities-marquee 18s linear infinite',
                    width: 'max-content',
                }}
            >
                {items.map((_, i) => (
                    <span
                        key={i}
                        className="text-[clamp(3rem,8vw,7rem)] text-[#FFFFFF2E] font-medium uppercase tracking-[0.12em] mx-[clamp(1.5rem,4vw,3.5rem)]"
                    >
                        AMENITIES
                    </span>
                ))}
            </div>
        </div>
    )
}

/* ── Right icon panel ── */
interface RightIconProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any
    iconKey: string
}

function RightIconPanel({ icon, iconKey }: RightIconProps) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={iconKey}
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.8 }}
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                className="flex items-center justify-center"
            >
                <Image src={icon} alt="" width={64} height={64} className="opacity-100 " />
            </motion.div>
        </AnimatePresence>
    )
}

interface DragSliderProps {
    activeIndex: number
    total: number
    onChangeIndex: (index: number) => void
    orientation?: 'vertical' | 'horizontal'
}

const STEP_PX = 50 

function DragSlider({ activeIndex, total, onChangeIndex, orientation = 'vertical' }: DragSliderProps) {
    const sliderRef = useRef<HTMLDivElement>(null)
    const dragOrigin = useRef(0)          
    const accumulatedSteps = useRef(0)    
    const isDragging = useRef(false)
    const latestIndex = useRef(activeIndex)
    const [visualOffset, setVisualOffset] = useState(0)
    const [isDraggingState, setIsDraggingState] = useState(false)

     
    useEffect(() => { latestIndex.current = activeIndex }, [activeIndex])

    const isVertical = orientation === 'vertical'

    const handlePointerDown = useCallback((e: React.PointerEvent) => {
        isDragging.current = true
        dragOrigin.current = isVertical ? e.clientY : e.clientX
        accumulatedSteps.current = 0
        setIsDraggingState(true)
            ; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
        e.preventDefault()
        e.stopPropagation()
    }, [isVertical])

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        if (!isDragging.current) return

        const pos = isVertical ? e.clientY : e.clientX
        const totalDelta = pos - dragOrigin.current

        // How many full steps has the user dragged so far?
        const steps = Math.trunc(totalDelta / STEP_PX)

        if (steps !== accumulatedSteps.current) {
            // Fire one change per step crossed
            const diff = steps - accumulatedSteps.current
            accumulatedSteps.current = steps

            // Compute new index (wrapping)
            const newIndex = ((latestIndex.current + diff) % total + total) % total
            onChangeIndex(newIndex)
        }

        // Visual feedback: remainder within current step
        const remainder = totalDelta - steps * STEP_PX
        setVisualOffset(remainder)
    }, [isVertical, total, onChangeIndex])

    const handlePointerUp = useCallback(() => {
        if (!isDragging.current) return
        isDragging.current = false
        accumulatedSteps.current = 0
        setIsDraggingState(false)
        setVisualOffset(0)
    }, [])

    /* Line sizes mirror active position */
    const lineConfig = amenitiesData.map((_, i) => {
        const dist = Math.abs(i - activeIndex)
        const minDist = Math.min(dist, total - dist) // handle wrapping distance
        return {
            width: minDist === 0 ? 112 : minDist === 1 ? 80 : 56,   // px
            opacity: minDist === 0 ? 0.6 : minDist === 1 ? 0.3 : 0.15,
        }
    })

    return (
        <div
            ref={sliderRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`
        relative touch-none select-none
        ${isVertical
                    ? 'cursor-ns-resize flex flex-col items-start gap-[6px] py-4 px-4'
                    : 'cursor-ew-resize flex flex-row items-center gap-[6px] px-6 py-4 justify-center'
                }
      `}
        >
         

            {/* Lines container — translates during drag */}
            <motion.div
                className={`
          flex ${isVertical ? 'flex-col items-start gap-[7px]' : 'flex-row mt-15 items-end md:items-center gap-[10px]'}
        `}
                animate={{ [isVertical ? 'y' : 'x']: visualOffset * 0.5 }}
                transition={{ type: 'spring', stiffness: 500, damping: 40 }}
            >
                {lineConfig.map((cfg, i) => (
                    <motion.div
                        key={i}
                        animate={isVertical
                            ? { width: cfg.width, opacity: cfg.opacity }
                            : { height: cfg.width * 0.75, opacity: cfg.opacity }
                        }
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className={
                            isVertical
                                ? 'h-[2px] rounded-full bg-white'
                                : 'w-[2px] rounded-full bg-white'
                        }
                    />
                ))}
            </motion.div>
        </div>
    )
}

const Amenities = () => {
    const [activeIndex, setActiveIndex] = useState(2) 
    const [isPaused, setIsPaused] = useState(false)
    const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

    /* Auto-advance */
    const startAuto = useCallback(() => {
        if (autoTimerRef.current) clearInterval(autoTimerRef.current)
        autoTimerRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % amenitiesData.length)
        }, AUTO_INTERVAL)
    }, [])

    const stopAuto = useCallback(() => {
        if (autoTimerRef.current) {
            clearInterval(autoTimerRef.current)
            autoTimerRef.current = null
        }
    }, [])

    useEffect(() => {
        if (!isPaused) startAuto()
        return stopAuto
    }, [isPaused, startAuto, stopAuto])

    /* Called by the drag slider or click */
    const handleManualChange = useCallback((index: number) => {
        setActiveIndex(index)
        setIsPaused(true)
        stopAuto()
        setTimeout(() => setIsPaused(false), 4000)
    }, [stopAuto])

    const activeAmenity = amenitiesData[activeIndex]

    return (
        <section className="relative w-full bg-black overflow-hidden min-h-[80vh] select-none pb-24 md:pb-0">
            {/* Marquee strip */}
            <MarqueeStrip />

            {/* Mobile Icon */}
            <div className="flex md:hidden items-center justify-center mt-12 mb-4 h-[40px] md:h-[64px]">
                <RightIconPanel icon={activeAmenity.iconRight} iconKey={activeAmenity.name + '-mobile'} />
            </div>

            {/* Content area */}
            <div className="relative mt-4 md:mt-16 flex items-center justify-center px-6 md:px-16 lg:px-24 min-h-[220px] md:min-h-[50dvh]">
                {/* Left — draggable line slider (desktop) */}
                <div className="hidden md:flex items-center justify-center w-[180px] shrink-0">
                    <DragSlider
                        activeIndex={activeIndex}
                        total={amenitiesData.length}
                        onChangeIndex={handleManualChange}
                        orientation="vertical"
                    />
                </div>

                {/* Centre amenity list */}
                <div className="flex-1 flex flex-col items-center gap-1 md:gap-0">
                    {amenitiesData.map((item, i) => {
                        const distance = Math.abs(i - activeIndex)
                        const isActive = i === activeIndex

                        return (
                            <motion.button
                                key={item.name}
                                onClick={() => handleManualChange(i)}
                                animate={{
                                    opacity: isActive ? 1 : Math.max(0.15, 0.5 - distance * 0.15),
                                    scale: isActive ? 1 : Math.max(0.85, 1 - distance * 0.05),
                                }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                className="relative py-4 md:py-2 cursor-pointer outline-none bg-transparent border-none h-[56px] flex items-center justify-center"
                            >
                                <span
                                    className={`block font-medium md:tracking-wide transition-all duration-500 ${isActive
                                            ? 'text-white text-2xl md:text-4xl lg:text-[2.8rem]'
                                            : 'text-white/40 text-xl md:text-xl lg:text-2xl'
                                        }`}
                                >
                                    {item.name}
                                </span>
                            </motion.button>
                        )
                    })}
                </div>

                {/* Right — icon panel (desktop) */}
                <div className="hidden md:flex items-center justify-center w-[180px] shrink-0">
                    <RightIconPanel icon={activeAmenity.iconRight} iconKey={activeAmenity.name + '-right'} />
                </div>
            </div>

            {/* Mobile drag slider — absolute so line animations don't affect layout */}
            <div className="flex md:hidden items-end justify-center absolute bottom-2 left-0 right-0 h-[84px] overflow-hidden">
                <DragSlider
                    activeIndex={activeIndex}
                    total={amenitiesData.length}
                    onChangeIndex={handleManualChange}
                    orientation="horizontal"
                />
            </div>

            {/* Progress dots */}
            {/* <div className="flex items-center justify-center gap-2 mt-8 md:mt-12">
                {amenitiesData.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => handleManualChange(i)}
                        className={`rounded-full transition-all duration-500 cursor-pointer border-none outline-none ${i === activeIndex
                                ? 'w-6 h-1.5 bg-white'
                                : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/40'
                            }`}
                        aria-label={`Go to amenity ${i + 1}`}
                    />
                ))}
            </div> */}

            {/* Keyframe for marquee */}
            <style>{`
        @keyframes amenities-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
        </section>
    )
}

export default Amenities