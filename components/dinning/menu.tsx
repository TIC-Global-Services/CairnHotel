"use client"

import React, { useState, useMemo } from 'react'
import Image, { StaticImageData } from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import menuData from '../../data/dining-menu.json'
import adstractshap from '@/assets/Home/Abstract-shape.png'

// Fallback images imported from the existing UI context (for the dynamic Zomato-scale rendering)
import imgGetaway1 from '@/assets/dining/getaway-1.png'
import imgGetaway2 from '@/assets/dining/getaway-2.png'
import imgGetaway3 from '@/assets/dining/getaway-3.png'

type CuisineType = "indian" | "chinese" | "italian"
type MenuTimeType = "breakfast" | "lunch" | "dinner"

export default function Menu() {
    const [activeType, setActiveType] = useState<MenuTimeType>("breakfast")
    const [activeCuisine, setActiveCuisine] = useState<CuisineType>("indian")
    const [isCuisinesOpen, setIsCuisinesOpen] = useState(false)

    // Use Zomato/Swiggy standard useMemo caching for performant filtering
    const filteredItems = useMemo(() => {
        return menuData.menuItems.filter(
            item => item.type === activeType && item.cuisine === activeCuisine
        )
    }, [activeType, activeCuisine])

    // Map the static string from JSON to an actual Next.js Image configuration
    const getImageForDisplay = (imageKey: string): string | StaticImageData => {
        // Automatically switch to real images when data is updated in the .json file
        if (imageKey.startsWith('/') || imageKey.startsWith('http')) {
            return imageKey;
        }
        
        switch (imageKey) {
            case 'image2': return imgGetaway2;
            case 'image3': return imgGetaway3;
            case 'image1':
            default: return imgGetaway1;
        }
    }

    const currentDisplayImage = filteredItems.length > 0
        ? getImageForDisplay(filteredItems[0].image)
        : imgGetaway1

    return (
        <section className="w-full bg-[#FFFCF6] py-24 relative overflow-hidden flex flex-col items-center">
            {/* Title & Description Structure */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-center max-w-5xl px-4 z-10"
            >
                <h2 className="text-xl md:text-[40px] font-semibold uppercase tracking-widest mb-6 text-[#1a1a1a]">Menu</h2>
                <p className="text-[#1a1a1a]/90 text-base md:text-[20px] font-medium leading-normal md:leading-relaxed">
                    Let our chef take you on a culinary journey. Each dish celebrates fresh, seasonal ingredients
                    carefully selected to deliver a flavourful and authentic dining experience.
                </p>
            </motion.div>

            {/* Main Tabs (Breakfast / Lunch / Dinner) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="mt-14 mb-20 z-10"
            >
                <div className="flex bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full p-2 mx-auto sm:space-x-2 border border-gray-100">
                    {(['breakfast', 'lunch', 'dinner'] as MenuTimeType[]).map((type) => (
                        <button
                            key={type}
                            onClick={() => setActiveType(type)}
                            className={`px-4 sm:px-10 py-2 sm:py-3 rounded-full text-xs font-normal tracking-[0.15em] transition-all duration-300 ${activeType === type
                                    ? 'bg-[#826154] text-white shadow-lg shadow-[#826154]/30'
                                    : 'bg-transparent text-gray-400 hover:text-[#1a1a1a] hover:bg-gray-50'
                                }`}
                        >
                            {type.toUpperCase()}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Geometric Abstract Shapes Layer */}
            <div className="absolute -bottom-[100%] left-10 right-0 inset-60 z-0 overflow-hidden pointer-events-none mix-blend-multiply">
                <Image src={adstractshap} alt="abstract-shape" fill className='object-contain opacity-30 max-h-[100dvh] w-full' />
            </div>

            {/* Menu Detail Container */}
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 relative z-10">

                {/* Stacked Left Column: Cuisines and Items List */}
                <div className="col-span-1 md:col-span-7 lg:col-span-7 flex flex-col space-y-10 order-2 md:order-1">
                    
                    {/* Cuisines Sub-menu */}
                    <div className="bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 w-fit min-w-[200px] sm:min-w-[240px] relative z-20 mx-auto md:mx-0">
                        <div 
                            className="px-6 py-5 font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#1a1a1a] flex justify-between items-center relative cursor-pointer select-none bg-white rounded-[20px] z-30"
                            onClick={() => setIsCuisinesOpen(!isCuisinesOpen)}>
                            CUISINES 
                            <motion.span 
                                animate={{ rotate: isCuisinesOpen ? 0 : 180 }}
                                transition={{ duration: 0.3 }}
                                className="text-[9px] absolute right-6"
                            >
                                ▲
                            </motion.span>
                        </div>
                        <AnimatePresence initial={false}>
                            {isCuisinesOpen && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="absolute top-[80%] left-0 w-full bg-white shadow-[0_20px_40px_rgb(0,0,0,0.08)] border-x border-b border-gray-100 rounded-b-[20px] overflow-hidden pt-4 z-20"
                                >
                                    <div className="flex flex-col py-2 border-t border-gray-50 mt-1">
                                        {(['indian', 'chinese', 'italian'] as CuisineType[]).map((cuisine) => (
                                            <button
                                                key={cuisine}
                                                onClick={() => {
                                                    setActiveCuisine(cuisine)
                                                    setIsCuisinesOpen(false)
                                                }}
                                                className={`px-6 py-4 text-[15px] font-medium transition-all duration-300 text-center ${activeCuisine === cuisine
                                                        ? 'bg-[#F9F9F9] text-[#1a1a1a]'
                                                        : 'text-gray-400 hover:text-gray-800 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Items List */}
                    <div className="flex flex-col justify-start pt-2 md:pt-4 min-h-[400px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${activeType}-${activeCuisine}`} // Regenerate animation dynamically
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="flex flex-col space-y-8 md:space-y-10"
                            >
                                {filteredItems.length > 0 ? (
                                    filteredItems.map((item) => (
                                        <div key={item.id} className="group cursor-pointer flex flex-col">
                                            <h3 className="text-xl md:text-2xl font-extrabold text-[#1a1a1a] mb-2 transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-[#1a1a1a]/80 text-sm md:text-lg font-medium leading-relaxed max-w-lg">
                                                {item.description}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-gray-400 font-medium py-10">
                                        No items currently available for this selection.
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Column 3: Hero Image */}
                <div className="col-span-1 md:col-span-5 lg:col-span-5 flex justify-center lg:justify-end order-1 md:order-2">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`img-${activeType}-${activeCuisine}`}
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="w-full max-w-lg aspect-[3/2] md:aspect-4/5 relative rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.1)]"
                        >
                            <Image
                                src={currentDisplayImage}
                                alt="Featured menu item"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, 500px"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </section>
    )
}