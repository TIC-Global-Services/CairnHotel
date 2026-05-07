"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import abstractShape from '@/assets/Home/Abstract-shape.png'
import breakfastImg from '@/assets/dining/continental_breakfast.png'

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

export default function ContinentalBreakfast() {
    return (
        <section className="w-full bg-[#FFFCF6] py-24 relative overflow-hidden flex flex-col items-center">

            {/* Title & Description — exact same structure as Menu */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-center max-w-5xl px-4 z-10"
            >
                <h2 className="text-xl md:text-[40px] font-semibold uppercase tracking-widest mb-6 text-[#1a1a1a]">
                    Continental Breakfast
                </h2>
                <p className="text-[#1a1a1a]/90 text-base md:text-[20px] font-medium leading-normal md:leading-relaxed">
                    Let our chef take you on a culinary journey. Each dish celebrates fresh, seasonal ingredients
                    carefully selected to deliver a flavourful and authentic dining experience.
                </p>
            </motion.div>

            {/* Spacer — matches the tab row height in the original */}
            <div className="mt-14 mb-20" />

            {/* Geometric Abstract Shapes — identical to Menu */}
            <div className="absolute -bottom-[50%] left-10 right-0 inset-50 z-0 overflow-hidden pointer-events-none h-full mix-blend-multiply">
                <Image src={abstractShape} alt="abstract-shape" fill className="object-contain opacity-30 h-full w-full" />
            </div>

            {/* Main Content Grid — same 12-col split as Menu */}
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 relative z-10">

                {/* Left: Items List — col-span-7, same as Menu */}
                <div className="col-span-1 md:col-span-7 lg:col-span-7 flex flex-col space-y-10 order-2 md:order-1">
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
                                    <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mb-2 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-[#1a1a1a]/80 text-sm md:text-lg font-medium leading-relaxed max-w-lg">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Right: Hero Image — col-span-5, same as Menu */}
                <div className="col-span-1 md:col-span-5 lg:col-span-5 flex justify-center lg:justify-end order-1 md:order-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full max-w-lg aspect-[3/2] md:aspect-4/5 relative rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.1)]"
                    >
                        <Image
                            src={breakfastImg}
                            alt="Continental Breakfast"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 500px"
                        />
                    </motion.div>
                </div>

            </div>
        </section>
    )
}
