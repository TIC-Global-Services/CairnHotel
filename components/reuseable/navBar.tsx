'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
    {
        title: "hotel",
        href: "/hotel"
    },
    {
        title: "DINING",
        href: "/dining"
    },
    {
        title: "EVENTS",
        href: "/events"
    },
    {
        title: "Things to do",
        href: "/things-to-do"
    },
    {
        title: "GALLERY",
        href: "/gallery"
    },
]

const NavBar = () => {
    const pathname = usePathname()

    return (
        <div className='absolute top-8 right-10 md:right-20 z-100'>
            <div className='flex items-center gap-2 md:gap-4 justify-end bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-2 px-4'>
                {navLinks.map((link) => {
                    const isActive = pathname === link.href

                    return (
                        <Link key={link.title} href={link.href}>
                            <div 
                                className={`
                                    px-5 py-2 rounded-full transition-all duration-300 cursor-pointer
                                    ${isActive 
                                        ? 'bg-white text-black font-semibold' 
                                        : 'text-white/80 hover:bg-white hover:text-black'
                                    }
                                `}
                            >
                                <p className='text-[10px] md:text-xs font-medium uppercase tracking-[0.15em]'>
                                    {link.title}
                                </p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default NavBar