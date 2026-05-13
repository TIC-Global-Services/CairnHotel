import React, { useState, useEffect } from 'react'
import Image, { StaticImageData } from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

import exploring1 from '@/assets/things-to-do/exploring-1.jpg'
import bikeadventure from '@/assets/things-to-do/bike_adventure.png'
import hike from '@/assets/things-to-do/hiking_bg.png'
import snowfestival from '@/assets/things-to-do/snow_festival.jpg'
import skiing from '@/assets/things-to-do/skiing.jpg'

interface SeasonOverlayProps {
    activeSeason: 'summer' | 'winter' | null;
    onClose: () => void;
    imageSrc: StaticImageData;
}

const transitionSettings: any = { type: 'tween', ease: [0.25, 0.1, 0.25, 1], duration: 0.5 }

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
}

const cardVariants: any = {
    hidden: { x: 100, scale: 0.8, opacity: 0 },
    show: { x: 0, scale: 1, opacity: 1, transition: { type: 'spring', damping: 20, stiffness: 100 } }
}

const maskVariants: any = {
    hidden: { y: '100%', opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', damping: 25, stiffness: 150 } }
}

const seasonContent = {
    summer: {
        description: "Summer in the mountains is filled with adventure, from scenic hiking and mountain biking to vibrant outdoor festivals and nature experiences.",
        cards: [
            { id: 1, title: 'Biking Adventure', image: bikeadventure },
            { id: 2, title: 'Hiking', image: hike },
        ]
    },
    winter: {
        description: "Winter turns the landscape into a playground, from pristine snowboarding and skiing trails to cozy fireside dining and festive events.",
        cards: [
            { id: 1, title: 'Winter Festival', image: snowfestival },
            { id: 2, title: 'Skiing', image: skiing },
        ]
    }
}

export const SeasonOverlay: React.FC<SeasonOverlayProps> = ({ activeSeason, onClose, imageSrc }) => {
    const [sequenceStep, setSequenceStep] = useState<1 | 2>(1)
    const [activeViewIndex, setActiveViewIndex] = useState(0)
    const [hasLoaded, setHasLoaded] = useState(false)

    // Handle the auto-progression of the sequence
    useEffect(() => {
        if (activeSeason && sequenceStep === 1) {
            const timer = setTimeout(() => setSequenceStep(2), 1200)
            return () => clearTimeout(timer)
        }
    }, [activeSeason, sequenceStep])

    // Unlock fast animations after initial massive stagger load
    useEffect(() => {
        if (sequenceStep === 2) {
            const t = setTimeout(() => setHasLoaded(true), 1500)
            return () => clearTimeout(t)
        }
    }, [sequenceStep])

    // Lock body scroll and handle escape key
    useEffect(() => {
        if (activeSeason) {
            document.body.style.overflow = 'hidden'

            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') onClose()
            }
            window.addEventListener('keydown', handleKeyDown)
            return () => window.removeEventListener('keydown', handleKeyDown)
        }
    }, [activeSeason, onClose])

    if (!activeSeason) return null

    const data = seasonContent[activeSeason]

    // Aggregate view items for the interactive slider
    const viewItems = [
        { id: 'main', title: "Things to do", outlineTitle: activeSeason, image: imageSrc, description: data.description },
        ...data.cards.map((card) => ({
            id: String(card.id),
            title: card.title,
            outlineTitle: activeSeason,
            image: card.image,
            description: data.description // Use same description or could be card-specific
        }))
    ]

    const activeView = viewItems[activeViewIndex]

    const handleNext = () => {
        setActiveViewIndex((prev) => (prev + 1) % viewItems.length)
    }

    const handlePrev = () => {
        setActiveViewIndex((prev) => (prev - 1 + viewItems.length) % viewItems.length)
    }

    return (
        <motion.div
            exit={{ opacity: 1, transition: { duration: 0.5 } }}
            className="fixed inset-0 z-50 flex items-center justify-center overscroll-none touch-none"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
        >
            {/* Morphing Background Component */}
            <motion.div
                layoutId={`season-card-${activeSeason}`}
                transition={transitionSettings}
                className="absolute inset-0 w-full h-full overflow-hidden bg-black"
            >
                <motion.div
                    layoutId={`season-image-wrap-${activeSeason}`}
                    transition={transitionSettings}
                    className="relative w-full h-full overflow-hidden"
                >
                    {/* True Layout-ID Morphing Background */}
                    <AnimatePresence mode="popLayout">
                        {viewItems.map((item, idx) => (
                            activeViewIndex === idx && (
                                <motion.div
                                    key={`bg-${activeSeason}-${item.id}`}
                                    layoutId={`gallery-item-${activeSeason}-${item.id}`}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.6, type: 'tween', ease: [0.25, 0.1, 0.25, 1] }}
                                    style={{ borderRadius: 0 }}
                                    className="absolute inset-0 w-full h-full overflow-hidden"
                                >
                                    <Image
                                        src={item.image}
                                        alt={`Background view`}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </motion.div>
                            )
                        ))}
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10 pointer-events-none" />
                </motion.div>
            </motion.div>

            {/* Native fade out wrapper for all content (UI, text, buttons) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.3, ease: 'easeOut' } }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="absolute inset-0 w-full h-full pointer-events-none"
            >
                <div className="pointer-events-auto w-full h-full">
                    {/* Close Button */}
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="absolute top-6 right-6 md:top-8 md:right-8 z-50 md:p-3 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-white/10 hover:scale-105 transition-all outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
                        aria-label="Close full screen view"
                    >
                        <X className="md:w-6 md:h-6 w-4 h-4" />
                    </motion.button>

                    {/* SEQUENCE STEP 1: Center Title */}
                    <AnimatePresence mode="wait">
                        {sequenceStep === 1 && (
                            <motion.div
                                key="step-1"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.02 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
                            >
                                <div className="overflow-visible p-4">
                                    <motion.h1
                                        initial={{ y: '100%', opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                                        className="text-[4rem] sm:text-[7rem] md:text-[8rem] xl:text-[10rem] font-black uppercase text-transparent tracking-widest leading-none text-center"
                                        style={{ WebkitTextStroke: '1px rgba(255,255,255,0.9)' }}>
                                        {activeSeason}
                                    </motion.h1>
                                </div>
                                <div className="overflow-hidden">
                                    <motion.h2
                                        initial={{ y: '100%' }}
                                        animate={{ y: 0 }}
                                        transition={{ type: 'spring', damping: 25, stiffness: 120, delay: 0.1 }}
                                        className="text-lg sm:text-4xl md:text-5xl font-semibold tracking-widest uppercase italic text-white drop-shadow-xl text-center md:-mt-2">
                                        Things to do
                                    </motion.h2>
                                </div>
                            </motion.div>
                        )}

                        {/* SEQUENCE STEP 2: Dashboard Layout */}
                        {sequenceStep === 2 && (
                            <motion.div
                                key="step-2"
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.3 } }}
                                className="absolute inset-0 flex flex-col lg:flex-row items-center justify-between z-20 px-[5%] md:px-[8%] pt-24 pb-12 overflow-y-auto"
                            >
                                {/* Left Side: Typography */}
                                <div className="flex-1 relative w-full h-full flex flex-col justify-center mt-2 lg:mt-0 lg:pr-10">
                                    <div className="relative flex flex-col justify-center">
                                        {/* Masked outline text overlapping - Backdrop */}
                                        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none z-10 overflow-visible">
                                            <motion.h2 
                                                variants={maskVariants} 
                                                className="text-[4rem] sm:text-[7rem] md:text-[10rem] xl:text-[10rem] font-black uppercase text-transparent tracking-widest leading-none block opacity-30"
                                                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.6)' }}
                                            >
                                                {activeView.outlineTitle}
                                            </motion.h2>
                                        </div>

                                        {/* Masked reveal for main title - Foreground */}
                                        <div className="overflow-hidden translate-x-[2%] md:translate-x-[5%] flex items-center relative z-20">
                                            <AnimatePresence mode="popLayout">
                                                <motion.h1
                                                    key={`title-${activeViewIndex}`}
                                                    initial={{ y: '100%' }}
                                                    animate={{ y: 0 }}
                                                    exit={{ y: '-100%', opacity: 0, transition: { duration: 0.2 } }}
                                                    transition={{ duration: 0.5, type: 'tween', ease: [0.25, 0.1, 0.25, 1] }}
                                                    className="text-[2rem] sm:text-[3rem] md:text-[3rem] xl:text-[3rem] font-extrabold uppercase text-white tracking-widest leading-[0.85]"
                                                >
                                                    {activeView.title}
                                                </motion.h1>
                                            </AnimatePresence>
                                        </div>
                                    </div>

                                    <div className="overflow-hidden mt-6 md:mt-15 max-w-lg">
                                        <AnimatePresence mode="popLayout">
                                            <motion.p
                                                key={`desc-${activeViewIndex}`}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                                transition={{ duration: 0.5, type: 'tween', ease: [0.25, 0.1, 0.25, 1] }}
                                                className="text-white md:text-white/90 text-sm md:text-xl leading-relaxed font-normal md:font-light z-20 drop-shadow-lg"
                                            >
                                                {activeView.description}
                                            </motion.p>
                                        </AnimatePresence>
                                    </div>

                                    {/* Navigation arrows (decorative) */}
                                    <motion.div variants={maskVariants} className="flex items-center gap-2 md:gap-4 mt-6 md:mt-12 z-20">
                                        <button onClick={handlePrev} className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-white md:border-white/30 flex items-center justify-center bg-transparent md:bg-white/10 hover:bg-white hover:text-black transition-colors outline-none focus:ring-2 focus:ring-white">
                                            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                                        </button>
                                        <button onClick={handleNext} className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-white md:border-white/30 flex items-center justify-center bg-transparent md:bg-white/10 hover:bg-white hover:text-black transition-colors outline-none focus:ring-2 focus:ring-white">
                                            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                                        </button>
                                    </motion.div>
                                </div>

                                {/* Right Side: Adventure Cards - Staggered slide from right */}
                                <motion.div layout className="flex-1 flex flex-row overflow-x-visible justify-center md:justify-end gap-6 w-full  lg:mt-[28%] md:gap-4 xl:gap-6">
                                    <AnimatePresence mode="popLayout">
                                        {viewItems
                                            .slice()
                                            .concat(viewItems) // Double the array to easily slice wrapping windows
                                            .slice((activeViewIndex % viewItems.length) + 1, (activeViewIndex % viewItems.length) + 3) // Safely grab the NEXT 2 consecutive cards
                                            .map((item, currentVisibleIndex) => {
                                                // Find the true logical index of the item
                                                const logicalIndex = viewItems.findIndex(v => v.id === item.id);

                                                return (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: 100 }}
                                                        animate={{
                                                            opacity: 1,
                                                            x: 0,
                                                            transition: {
                                                                type: 'tween',
                                                                ease: [0.25, 0.1, 0.25, 1],
                                                                duration: 0.5,
                                                                delay: hasLoaded ? 0 : currentVisibleIndex * 0.4 + 0.2
                                                            }
                                                        }}
                                                        exit={{ opacity: 0, transition: { duration: 0.25 } }}
                                                        key={`visible-card-${item.id}`}
                                                        onClick={() => setActiveViewIndex(logicalIndex)}
                                                        whileHover={{ y: -10 }}
                                                        className={`relative shrink-0 w-[260px] sm:w-[180px] md:w-[220px] aspect-2/2 mb-20 md:mb-0 md:aspect-3/4 rounded-3xl overflow-hidden shadow-2xl cursor-pointer group mx-auto md:mx-0 ${currentVisibleIndex >= 1 ? 'hidden md:block' : ''}`}
                                                    >
                                                        {/* Image perfectly morphs to the background when clicked. Because this list explicitly excludes the active index, image will ALWAYS be visible! */}
                                                        <motion.div
                                                            key={`thumb-${activeSeason}-${item.id}`}
                                                            layoutId={`gallery-item-${activeSeason}-${item.id}`}
                                                            transition={{ duration: 0.6, type: 'tween', ease: [0.25, 0.1, 0.25, 1] }}
                                                            style={{ borderRadius: '24px' }}
                                                            className="absolute inset-0 w-full h-full z-0 bg-black/20 overflow-hidden"
                                                        >
                                                            <Image
                                                                src={item.image}
                                                                alt={item.title}
                                                                fill
                                                                className="object-cover transition-transform duration-700 "
                                                            />
                                                        </motion.div>

                                                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent pointer-events-none z-10" />
                                                        <h3 className={`absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 text-center w-full text-[12px] md:text-base font-bold uppercase tracking-widest text-white transition-colors z-20`}>
                                                            {item.title}
                                                        </h3>
                                                    </motion.div>
                                                )
                                            })}
                                    </AnimatePresence>
                                </motion.div>

                                {/* Small Index Tracker */}
                                <motion.div variants={maskVariants} className="absolute bottom-20 right-6 md:bottom-12 md:right-12 flex items-end gap-[2px] font-bold text-white z-20">
                                    <span className="text-2xl md:text-4xl text-white leading-none">
                                        {String(activeViewIndex + 1).padStart(2, '0')}
                                    </span>
                                    <span className="text-white/60 text-[10px] md:text-base tracking-widest font-medium md:mb-1 leading-none">/{String(viewItems.length).padStart(2, '0')}</span>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    )
}
