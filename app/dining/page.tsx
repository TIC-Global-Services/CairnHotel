import React from 'react'
import Hero from '@/components/dinning/hero'
import Experience from '@/components/dinning/experience'
import Menu from '@/components/dinning/menu'
import Marquee from '@/components/dinning/marquee'
import QualityAndQuantity from '@/components/dinning/qualityandquntity'
import Explore from '@/components/dinning/explore'
import KnowMore from '@/components/dinning/knowmore'
const page = () => {
  return (
    <div>
        <Hero/>
        <Experience/>
        <Menu/>
        <Marquee/>
        <QualityAndQuantity/>
        <Explore/>
        <KnowMore/>
    </div>
  )
}

export default page