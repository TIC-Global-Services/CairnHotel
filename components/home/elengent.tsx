import React from 'react'
import TextScrollReveal from '../reuseable/TextScrollReveal'
import abstract from '@/assets/Home/Abstract-shape.png'
import Image from 'next/image'

const Elegant = () => {
    const quote = "“Cairn Hotel, an elegant retreat nestled in the heart of Utah seamlessly blends nature-inspired design with modern luxury Our thoughtfully curated accommodation embody comfort, warmth breathtaking landscapes. Surrounded by majestic red rock formations and serene mountain views, the hotel offers a peaceful escape from the ordinary.”"

    return (
        <section className="relative w-full min-h-screen bg-white flex items-center justify-start py-10 md:py-40 overflow-hidden">
            <div className="w-full relative min-h-[80vh] flex items-center">
                {/* Left Side: Text Reveal */}
                <div className="absolute  left-20 z-20 pl-[6%] pr-[4%] max-w-6xl text-start">
                    <TextScrollReveal
                        text={quote}
                        className="text-[20px] md:text-4xl lg:text-4xl font-sans font-medium leading-normal md:leading-tight text-[#1a1a1a]"
                    />
                </div>

                <div className="absolute top-[-5%] right-[-40%] md:right-[-15%] md:top-[-45%] md:left-[42%] h-full md:h-[150dvh] w-full md:w-full flex items-center justify-center z-10 pointer-events-none">
                    <Image
                        src={abstract}
                        alt="Abstract Shape"
                        fill
                        priority
                        className="object-cover md:object-contain opacity-40 p-0 md:p-4 lg:p-10"
                    />
                </div>
            </div>
        </section>
    )
}

export default Elegant