"use client"
import React from 'react'
import Image from 'next/image'
import elevated from '@/assets/Home/elevated_stay.png'
import SimpleParallax from 'simple-parallax-js'

const ElevatedStay = () => {
    return (
        <section className="w-full bg-white py-2 md:py-0 px-[4%] overflow-hidden">
            <div className="">
                <div className="flex flex-col">
                    {/* Header Row */}
                    <div className="flex flex-col lg:flex-row justify-between items-start mb-6 md:mb-16 gap-8">
                        {/* Left Column: Heading & Label */}
                        <div className="max-w-2xl">
                            <span className="block text-[10px] md:text-xl font-bold md:font-medium uppercase text-[#4D2F27] mb-4 md:mb-6">
                                ELEVATED STAYS IN UTAH
                            </span>
                            <h2 className="text-[17px] md:text-5xl lg:text-4xl font-sans font-medium text-neutral-900 leading-[1.4] md:leading-[1.1] tracking-tight pr-4 md:pr-0">
                                Surrounded By Breathtaking <br className="hidden md:block" />
                                Peaks And Untouched <br className="hidden md:block" />
                                Landscapes<span className="hidden md:inline">.</span>
                                <span className="md:hidden">, Both Luxury And Tranquility.</span>
                            </h2>
                        </div>

                        {/* Right Column: Secondary Text (Desktop) */}
                        <div className="hidden md:block lg:mt-auto">
                            <p className="max-w-md md:text-3xl font-sans font-medium text-black/30 leading-[1.2] lg:text-left">
                                In the heart of Utah,<br />
                                A seamless blend of nature-inspired design And modern luxury
                            </p>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="relative w-full aspect-[4/5] md:aspect-[22/8] rounded-[16px] md:rounded-[24px] overflow-hidden shadow-sm mb-6 md:mb-0">
                        <SimpleParallax>
                            <Image
                            src={elevated}
                            alt="Elevated stay in Utah landscape"
                            fill
                            style={{objectPosition:"80% 30%"}}
                            className="object-cover scale-90"
                            priority
                        />
                        </SimpleParallax>
                    </div>

                    {/* Right Column: Secondary Text (Mobile) */}
                    <div className="md:hidden block pb-6">
                        <p className="text-[15px] font-sans font-medium text-black/30 leading-[1.4]">
                            In The Heart Of Utah,<br />
                            A Seamless Blend Of Nature-Inspired Design and<br />
                            Modern Luxury
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ElevatedStay
