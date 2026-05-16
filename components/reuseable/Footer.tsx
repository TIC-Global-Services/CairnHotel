import React from 'react'
import Image from 'next/image'
import footerbg from '@/assets/Home/Abstract-shape.png'
import instagramlogo from '@/public/instagram_logo.png'
import facebooklogo from '@/public/facbook_logo.png'
import emailogo from '@/public/mail_logo.png'
import whatsapplogo from '@/public/whatsapp_logo.png'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className="relative w-full pt-10 pb-10 px-4 md:px-8 lg:px-10 overflow-hidden bg-[#FFF7E0]">
            {/* Background Shapes */}
            <div className="absolute inset-0 -top-[40%] md:-top-[5%] lg:-top-[40%] -left-[140%] md:-left-[49%] w-[250%] md:w-full h-[180%] z-0 opacity-20 pointer-events-none">
                <Image 
                    src={footerbg} 
                    alt="Footer Background" 
                    fill 
                    className="object-cover object-center scale-50 md:scale-75"
                    priority
                />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
                
                {/* Logo */}
                <div className="relative w-25 h-24 md:w-28 md:h-28 mb-6">
                    <Image 
                        src="/Cairn_Secondary_Logo.png" 
                        alt="Cairn Hotel Logo" 
                        fill 
                        className="object-contain" 
                    />
                </div>

                {/* Tagline */}
                <p className="text-xl md:text-2xl text-[#1A1A1A] mb-4 font-light tracking-wide">
                    Stay Elevated in Utah
                </p>

                {/* Giant Title */}
                <h1 className="text-[6rem] md:text-[10rem] lg:text-[14rem] font-regular leading-[1] tracking-tight text-[#0a0a0a] mb-6" style={{ fontFamily: 'var(--font-clash-display), sans-serif' }}>
                    CAIRN
                </h1>

                {/* Description */}
                <p className="text-[#3A3A3A] text-base md:text-2xl max-w-4xl mx-auto leading-tight font-[400] mb-20">
                    Escape to refined comfort in the heart of Utah's breathtaking landscapes. 
                    Discover elevated stays, curated dining, and unforgettable mountain moments 
                    at Cairn Hotel.
                </p>

                {/* Newsletter Input */}
                <div className="w-full max-w-2xl mx-auto flex items-center justify-between border-b border-[#1A1A1A] pb-3 mb-24">
                    <input 
                        type="email" 
                        placeholder="Your email address" 
                        className="w-full bg-transparent outline-none text-[#1A1A1A] placeholder-[#1A1A1A] font-normal text-base" 
                    />
                    <button className="ml-4 flex-shrink-0 text-[#1A1A1A] hover:translate-x-2 transition-transform duration-300">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14 6L20 12L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-10 w-full max-w-5xl mx-auto mb-2">
                    <div className="flex flex-col items-center">
                        <h4 className="text-[#3A3A3A] mb-3 text-base font-medium">Email</h4>
                        <a href="mailto:fd@thecairnhotelutah.com" className="text-[#1A1A1A] text-sm md:text-2xl font-normal hover:opacity-60 transition-opacity">fd@thecairnhotelutah.com</a>
                    </div>
                    <div className="flex flex-col items-center">
                        <h4 className="text-[#3A3A3A] mb-3 text-base font-medium">Opening Hour</h4>
                        <p className="text-[#1A1A1A] text-sm md:text-2xl font-normal">Open 24 hours</p>
                    </div>
                    <div className="col-span-2 md:col-span-1 flex flex-col items-center">
                        <h4 className="text-[#3A3A3A] mb-3 text-base font-medium">Phone</h4>
                        <p className="text-[#1A1A1A] text-sm md:text-2xl font-normal">+39 0474 710 423</p>
                    </div>
                </div>

                {/* Bottom Footer Area */}
                <div className="w-full flex flex-col md:flex-row items-center gap-5 md:gap-80 justify-center pt-8 text-xs md:text-sm">
                    <div className='hidden md:block'>
                       <p className='text-lg'> @2026, The Cairn Hotel.</p>
                    </div>
                    <div className="flex items-center gap-4 text-[#1A1A1A]">
                    
                        {/* Email */}
                        <a href="mailto:fd@thecairnhotelutah.com" className="hover:opacity-60 transition-opacity">
                            <Image src={emailogo} alt="Email" width={24} height={24} className="object-contain" />
                        </a>
                        {/* Facebook */}
                        <a href="https://www.facebook.com/share/1CLa9S97Ji/?mibextid=wwXIfr" target="_blank" className="hover:opacity-60 transition-opacity">
                            <Image src={facebooklogo} alt="Facebook" width={24} height={24} className="object-contain" />
                        </a>
                        {/* Instagram */}
                        <a href="https://www.instagram.com/thecairnhotel" className="hover:opacity-60 transition-opacity">
                            <Image src={instagramlogo} alt="Instagram" width={24} height={24} className="object-contain" />
                        </a>
                    </div>
                    <div className='md:hidden'>
                       <p className='text-[3.5vw]'> @2026, The Cairn Hotel.</p>
                    </div>
                    <div>
                        <Link href="https://www.theinternetcompany.one/"><p className='md:text-[1vw] text-[3.5vw] font-normal'>Designed & Developed By TIC Global Services</p></Link>
                    </div>
                </div>
                
            </div>
        </footer>
    )
}

export default Footer