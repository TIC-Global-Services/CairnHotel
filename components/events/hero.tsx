import React from 'react'
import banner from '@/assets/events/events_banner.jpg'
import Image from 'next/image'
const hero = () => {
  return (
    <div className='relative w-full h-screen'>
        <Image src={banner} alt="banner" fill className='object-cover'/>
        <div className='absolute inset-0 bg-black/50'>
            <div className='flex flex-col items-center justify-center h-full'>
                <h1 className='text-[10rem] font-medium uppercase text-white'>events</h1>
                <button className='px-10 py-3 rounded-full border border-white/20 bg-white/10 uppercase backdrop-blur-[2px] text-white transition-colors duration-300 text-sm font-light tracking-wide'>view More</button>
            </div>   
        </div>
    </div>
  )
}

export default hero