"use client"
import React, { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import slide1 from '@/assets/Home/slide1.jpg'
import slide2 from '@/assets/Home/slide2.jpg'
import slide3 from '@/assets/Home/slide3.jpg'

gsap.registerPlugin(ScrollTrigger)

const contentData = [
    {
        label: "NATURE WITH SOUL",
        title: "Rooted in Timeless \n Landscapes",
        description: "Nestled in the heart of breathtaking natural surroundings, The Cairn Hotel blends scenic beauty with refined modern comfort.",
        image: slide1
    },
    {
        label: "A SERENE ESCAPE",
        title: "Designed for \n Calm Moments",
        description: "At Cairn Hotel, we believe true luxury lies in tranquility. Thoughtfully curated interiors, soft earthy tones.",
        image: slide2
    },
    {
        label: "WARM WELCOME",
        title: "Where Nature Meets \n Elegance",
        description: "Natural materials, warm lighting, and contemporary design shape every corner of the hotel. Surrounded by scenic landscapes and quiet beauty.",
        image: slide3
    }
]

const NatureWithSoul = () => {

    return (
        <div></div>
    )
}

export default NatureWithSoul
