import React from 'react'
import Hero from '@/components/dinning/hero'
import Experience from '@/components/dinning/experience'
// import Menu from '@/components/dinning/menu'
import ContinentalBreakfast from '@/components/dinning/continentalbreakfast'
import Marquee from '@/components/dinning/marquee'
import QualityAndQuantity from '@/components/dinning/qualityandquntity'
import Explore from '@/components/dinning/explore'
import KnowMore from '@/components/dinning/knowmore'
import LocalFavorite from '@/components/dinning/localfavorite'
const page = () => {
  return (
    <div>
        <Hero/>
        <Experience/>
        {/* <Menu/> */}
        <ContinentalBreakfast/>
        <Marquee/>
        <QualityAndQuantity/>
        <Explore/>
        <KnowMore/>
        <LocalFavorite/>
    </div>
  )
}

export default page