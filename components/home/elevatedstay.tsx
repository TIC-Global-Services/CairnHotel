import React from 'react'
import Image from 'next/image'
import elevated from '@/assets/Home/elevated_stay.png'

const ElevatedStay = () => {
    return (
        <section className="w-full bg-white py-24 md:py-32 px-[4%] overflow-hidden">
            <div className="">
                {/* Header Row */}
                <div className="flex flex-col lg:flex-row justify-between items-start mb-12 md:mb-16 gap-8">
                    {/* Left Column: Heading & Label */}
                    <div className="max-w-2xl">
                        <span className="block text-[10px] md:text-xl font-medium  uppercase text-[#4D2F27] mb-6">
                            ELEVATED STAYS IN UTAH
                        </span>
                        <h2 className="text-3xl md:text-5xl lg:text-4xl font-sans font-medium text-neutral-900 leading-[1.1] tracking-tight">
                            Surrounded By Breathtaking <br className="hidden md:block" />
                            Peaks And Untouched <br className="hidden md:block" />
                            Landscapes.
                        </h2>
                    </div>

                    {/* Right Column: Secondary Text */}
                    <div className="lg:mt-auto">
                        <p className="max-w-md text-base md:text-3xl font-sans font-medium text-black/30 leading-[1.2] lg:text-left">
                            In the heart of Utah,<br />
                            A seamless blend of nature-inspired design And modern luxury
                        </p>
                    </div>
                </div>

                {/* Image Section */}
                <div className="relative w-full aspect-video md:aspect-22/8 rounded-[24px] overflow-hidden shadow-sm">
                    <Image
                        src={elevated}
                        alt="Elevated stay in Utah landscape"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>
        </section>
    )
}

export default ElevatedStay
