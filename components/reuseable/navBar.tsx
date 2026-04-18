'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Mail, MessageCircle } from 'lucide-react'
import instagramlogo from '@/public/instagram_logo.png'
import facebooklogo from '@/public/facbook_logo.png'
import emailogo from '@/public/mail_logo.png'
import whatsapplogo from '@/public/whatsapp_logo.png'

const navLinks = [
    {
        title: "HOTEL",
        href: "/hotel"
    },
    {
        title: "DINING",
        href: "/dining"
    },
    {
        title: "THINGS TO DO",
        href: "/things-to-do"
    },
    {
        title: "GALLERY",
        href: "/gallery"
    },
    {
        title: "EVENTS",
        href: "/events"
    },
]

const NavBar = () => {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [isOpen])

    return (
        <>
            {/* Main Navigation Bar */}
            <div className='absolute top-8 left-6 right-6 md:left-20 md:right-20 z-[100] flex justify-between items-center pointer-events-none'>

                {/* Logo */}
                <Link href="/" className="pointer-events-auto">
                    <Image
                        src="/cairn_logo.png"
                        alt="The Cairn Hotel"
                        width={90}
                        height={90}
                        className="w-16 md:w-[8vw] object-contain hover:scale-105 transition-transform duration-300"
                        priority
                    />
                </Link>

                {/* Right Side Navigation */}
                <div className="flex items-center gap-4 pointer-events-auto">
                    {/* Desktop Menu - Pill Shape */}
                    <div className='hidden md:flex items-center gap-4 justify-end bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-2 px-4'>
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
                                        <p className='text-xs font-medium uppercase tracking-[0.15em]'>
                                            {link.title}
                                        </p>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="md:hidden flex items-center justify-center p-3 sm:p-4  rounded-full text-white hover:bg-white/20 transition-colors "
                        aria-label="Open Menu"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Mobile Full Screen Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-100%' }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[110] bg-[#FFF7E0] flex flex-col pt-6 pb-12 px-6"
                    >
                        {/* Top Bar -> Close Button */}
                        <div className="flex justify-end pt-2 pr-2">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 text-gray-400 hover:text-gray-800 transition-colors"
                                aria-label="Close Menu"
                            >
                                <X className="w-8 h-8 stroke-[1]" />
                            </button>
                        </div>

                        {/* Navigation Links centered */}
                        <div className="flex-1 flex flex-col items-center justify-center space-y-12 mb-10">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + (i * 0.05), duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-[15px] tracking-[0.15em] font-normal uppercase text-[#2B2B2B] hover:text-black transition-colors"
                                    >
                                        {link.title}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Footer -> Copyright & Social */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="flex flex-col items-center space-y-6"
                        >
                            <p className="text-sm text-[#4A4A4A] tracking-[0.05em]">
                                © 2026 Cairnhotel. All Rights Reserved.
                            </p>

                            <div className="flex items-center gap-3 text-[#2B2B2B]">
                                {/* Whatsapp */}
                                <a href="#" className="hover:opacity-60 transition-opacity">
                                    <Image src={whatsapplogo} alt="WhatsApp" width={24} height={24} className="object-contain" />
                                </a>
                                {/* Email */}
                                <a href="#" className="hover:opacity-60 transition-opacity">
                                    <Image src={emailogo} alt="Email" width={24} height={24} className="object-contain" />
                                </a>
                                {/* Facebook */}
                                <a href="#" className="hover:opacity-60 transition-opacity">
                                    <Image src={facebooklogo} alt="Facebook" width={24} height={24} className="object-contain" />
                                </a>
                                {/* Instagram */}
                                <a href="#" className="hover:opacity-60 transition-opacity">
                                    <Image src={instagramlogo} alt="Instagram" width={24} height={24} className="object-contain" />
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default NavBar