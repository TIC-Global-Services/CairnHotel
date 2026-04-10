import React from 'react'
import TextScrollReveal from '../reuseable/TextScrollReveal'
import abstract from '@/assets/Home/Abstract-shape.png'
import Image from 'next/image'

const Elegant = () => {
    const quote = "“The Cairn Hotel, an elegant retreat nestled in the heart of Utah seamlessly blends nature-inspired design with modern luxury. Our thoughtfully curated   accommodation embody comfort, warmth breathtaking landscapes. Surrounded by majestic red rock formations and serene mountain views, the hotel offers a peaceful escape from the ordinary.”"

    return (
        <section className="relative w-full min-h-screen bg-white flex items-center justify-start py-40 overflow-hidden">
            <div className="w-full">
                {/* Left Side: Text Reveal */}
                <div className="relative z-20 px-[5%] max-w-5xl text-start">
                    <TextScrollReveal
                        text={quote}
                        className="text-3xl md:text-4xl lg:text-4xl font-sans font-medium leading-tight text-neutral-800"
                    />
                </div>

                {/* Right Side: Abstract Shapes */}
                <div className="absolute top-[-20%] left-[40%] h-[150dvh] w-full flex items-center justify-center z-10 pointer-events-none">
                    <Image
                        src={abstract}
                        alt="Abstract Shape"
                        fill
                        priority
                        className="object-contain opacity-40 p-4 lg:p-10"
                    />
                </div>
            </div>
        </section>
    )
}

export default Elegant