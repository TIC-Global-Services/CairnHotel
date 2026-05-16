"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import abstractShape from '@/assets/Home/Abstract-shape.png'
import breakfastImg from '@/assets/dining/continental_breakfast.png'
import pancakeImg from '@/assets/dining/pancakes.jpg'
import yogurtImg from '@/assets/dining/yogurt.jpg'

const menuItems = [
    {
        title: "Fresh Bakery Basket",
        description: "Croissant, Toast, Butter, Jam, And Honey",
    },
    {
        title: "Classic Toast & Eggs",
        description: "Toasted Bread With Scrambled/Boiled Eggs",
    },
    {
        title: "Fruits & Yogurt Bowl",
        description: "Seasonal Fruits Served With Yogurt And Granola",
    },
    {
        title: "Pancakes Or Waffles",
        description: "Served With Maple Syrup And Fresh Fruits",
    },
    {
        title: "Beverage Selection",
        description: "Coffee, Tea, And Fresh Juice",
    },
]

const heroImages = [breakfastImg, pancakeImg, yogurtImg];

export default function ContinentalBreakfast() {
    const [imgIndex, setImgIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setImgIndex(prev => (prev + 1) % heroImages.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="w-full bg-[#FFFCF6] py-24 relative overflow-hidden flex flex-col items-center">

            {/* Title & Description — exact same structure as Menu */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-center max-w-5xl px-4 z-10"
            >
                <h2 className="text-xl md:text-[40px] font-semibold uppercase tracking-normal mb-6 text-[#1a1a1a]">
                    Continental Breakfast
                </h2>
                <p className="text-[#1a1a1a]/90 text-base md:text-[20px] font-normal md:font-medium leading-tight md:leading-tight">
                    Let our chef take you on a culinary journey. Each dish celebrates fresh, seasonal ingredients
                    carefully selected to deliver a flavourful and authentic dining experience.
                </p>
            </motion.div>

            {/* Spacer — matches the tab row height in the original */}
            <div className="mt-8 mb-12" />

            {/* Geometric Abstract Shapes — anchored to left like elengent */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[25%] left-[20%] md:-left-[50px] w-[140%] h-full opacity-20 mix-blend-multiply scale-[1] lg:scale-[1.4] origin-left">
                    <Image src={abstractShape} alt="abstract-shape" fill className="object-contain" />
                </div>
            </div>

            {/* Main Content Grid — same 12-col split as Menu */}
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 relative z-10">

                {/* Left: Items List — col-span-7, same as Menu */}
                <div className="col-span-1 md:col-span-7 lg:col-span-7 flex flex-col space-y-10 order-2 md:order-1 pl-4 md:pl-0">
                    <div className="flex flex-col justify-start pt-2 md:pt-4 min-h-[400px]">
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="flex flex-col space-y-8 md:space-y-10"
                        >
                            {menuItems.map((item, idx) => (
                                <div key={idx} className="group cursor-pointer flex flex-col">
                                    <h3 className="text-xl md:text-2xl font-semibold mb-2 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm md:text-lg font-medium leading-tight max-w-lg">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Right: Hero Image — col-span-5, same as Menu */}
                <div className="col-span-1 md:col-span-5 lg:col-span-5 flex justify-center lg:justify-end order-1 md:order-2 -mt-6 md:-mt-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="w-full max-w-sm md:max-w-lg aspect-[4/3] md:aspect-[3/4] relative rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.1)]"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={imgIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={heroImages[imgIndex]}
                                    alt="Continental Breakfast"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                    sizes="(max-width: 768px) 100vw, 500px"
                                />
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>

            </div>
        </section>
    )
}
