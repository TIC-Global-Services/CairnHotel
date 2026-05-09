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
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`bg-${activeSeason}-${activeViewIndex}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <Image
                            src={activeView.image}
                            alt="Background blur"
                            fill
                            className="object-cover blur-[80px] scale-110"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-black/40 pointer-events-none" />
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

                        {/* SEQUENCE STEP 2: Split Dashboard Layout */}
                        {sequenceStep === 2 && (
                            <motion.div
                                key="step-2"
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                exit={{ opacity: 0, scale: 0.98 }}
                                className="absolute inset-0 flex items-center justify-center z-20 px-[5%] md:px-[10%]"
                            >
                                <div className="w-full max-w-7xl flex flex-col md:flex-row items-center gap-12 lg:gap-24">
                                    
                                    {/* Left Side: Active Image Card (332x546 per spec) */}
                                    <motion.div 
                                        layoutId={`gallery-item-${activeSeason}-${activeView.id}`}
                                        className="relative shrink-0 w-[280px] md:w-[332px] h-[460px] md:h-[546px] rounded-[20px] overflow-hidden shadow-2xl border border-white/10"
                                    >
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={`card-img-${activeViewIndex}`}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.4 }}
                                                className="absolute inset-0 w-full h-full"
                                            >
                                                <Image
                                                    src={activeView.image}
                                                    alt={activeView.title}
                                                    fill
                                                    className="object-cover"
                                                    priority
                                                />
                                            </motion.div>
                                        </AnimatePresence>
                                    </motion.div>

                                    {/* Right Side: Content */}
                                    <div className="flex-1 flex flex-col justify-center text-left">
                                        <motion.span 
                                            variants={maskVariants}
                                            className="text-white text-lg md:text-3xl font-bold uppercase tracking-wider mb-4"
                                        >
                                            {activeViewIndex + 1}. {activeView.title}
                                        </motion.span>
                                        
                                        <div className="overflow-hidden mb-6">
                                            <AnimatePresence mode="wait">
                                                <motion.h2
                                                    key={`title-${activeViewIndex}`}
                                                    initial={{ y: '100%' }}
                                                    animate={{ y: 0 }}
                                                    exit={{ y: '-100%' }}
                                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                                    className="text-3xl md:text-[4.5rem] lg:text-[5rem] font-bold uppercase text-white leading-[1] tracking-tight mb-8"
                                                >
                                                    {activeView.title === "Things to do" ? "Adventure" : activeView.title} <br/>
                                                    AS A PLACE <br/>
                                                    OF ADVENTURE
                                                </motion.h2>
                                            </AnimatePresence>
                                        </div>

                                        <div className="flex flex-col space-y-8 max-w-xl">
                                            <motion.p variants={maskVariants} className="text-white/90 text-sm md:text-lg leading-relaxed">
                                                {activeView.description}
                                            </motion.p>
                                            
                                            <motion.div variants={maskVariants} className="w-1/2 h-[1px] bg-white/20" />
                                            
                                            <motion.p variants={maskVariants} className="text-white/70 text-xs md:text-base leading-relaxed">
                                                The crisp mountain air, rugged landscapes, and endless horizons invite explorers to push their limits while embracing the beauty and serenity of nature.
                                            </motion.p>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Navigation: Arrows & Pagination */}
                                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 md:left-[10%] md:translate-x-0 flex items-center gap-12 z-50">
                                    <div className="flex items-center gap-4">
                                        <button 
                                            onClick={handlePrev}
                                            className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center bg-black/20 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all outline-none"
                                        >
                                            <ChevronLeft className="w-6 h-6" />
                                        </button>
                                        
                                        {/* Pagination Dots */}
                                        <div className="flex items-center gap-3 mx-4">
                                            {viewItems.map((_, i) => (
                                                <div 
                                                    key={i}
                                                    className={`h-2.5 rounded-full transition-all duration-300 ${i === activeViewIndex ? 'w-8 bg-white' : 'w-2.5 bg-white/30'}`}
                                                />
                                            ))}
                                        </div>

                                        <button 
                                            onClick={handleNext}
                                            className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center bg-black/20 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all outline-none"
                                        >
                                            <ChevronRight className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    )
}
