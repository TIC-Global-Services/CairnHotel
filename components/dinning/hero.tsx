import React from 'react'
import banner from '@/assets/dining/dining_banner.jpg'
import Image from 'next/image'
const hero = () => {
    return (
        <div className='relative w-full h-screen'>
            <Image src={banner} alt="banner" fill className='object-cover object-top' />
            <div className='absolute inset-0 bg-black/50'>
                <div className='flex flex-col items-center justify-center h-full'>
                    <h1 className='text-[5rem] md:text-[10rem] font-medium uppercase text-white'>Dining</h1>
                    <p className='text-white text-center md:leading-none leading-snug text-base md:text-2xl font-normal md:font-medium'>Savour the Taste of the Mountains<br />Fresh, seasonal flavours inspired by nature.</p>
                </div>
            </div>
        </div>
    )
}

export default hero