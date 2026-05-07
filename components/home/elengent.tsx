import React from 'react'
import TextScrollReveal from '../reuseable/TextScrollReveal'
import abstract from '@/assets/Home/Abstract-shape.png'
import Image from 'next/image'

const Elegant = () => {
    const quote = "The Cairn Hotel is an elegant retreat in the heart of Cedar City, Utah, where nature-inspired design meets modern comfort. Thoughtfully curated accommodations offer warmth, relaxation, and a refined sense of place, surrounded by the region's breathtaking red rock landscapes and serene mountain views. Whether visiting for adventure, business, or a peaceful escape, guests will find a welcoming stay rooted in comfort, hospitality, and the beauty of Southern Utah"

    return (
        <section className="relative w-full min-h-screen bg-white flex items-center justify-start py-10 md:py-40 overflow-hidden">
            <div className="w-full relative min-h-[100vh] flex items-center">
                {/* Left Side: Text Reveal */}
                <div className="absolute  md:left-20 z-20 px-[5%] md:pl-[6%] md:pr-[4%] max-w-6xl text-start">
                    <TextScrollReveal
                        text={quote}
                        className="text-base md:text-4xl lg:text-4xl font-sans font-medium leading-normal md:leading-tight text-[#1a1a1a]"
                    />
                </div>

                <div className="absolute top-[-5%] right-[-40%] md:right-[-15%] md:top-[-20%] md:left-[42%] h-full md:h-[150dvh] w-full md:w-full flex items-center justify-center z-10 pointer-events-none">
                    <Image
                        src={abstract}
                        alt="Abstract Shape"
                        fill
                        priority
                        className="object-cover h-full md:object-contain opacity-40 p-0 md:p-4 lg:p-10"
                    />
                </div>
            </div>
        </section>
    )
}

export default Elegant