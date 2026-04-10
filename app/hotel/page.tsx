import React from 'react'
import Hero from '@/components/hotel/Hero'
import StoryOfCairn from '@/components/hotel/storyofcarin'
import ArchitectureOfNature from '@/components/hotel/architectureofnature'
import StayElevated from '@/components/hotel/stayelevated'
import ExploreStay from '@/components/hotel/explorstay'
import Sustainability from '@/components/hotel/sustainability'
import TrustedBy from '@/components/hotel/trustedby'
import Testimonial from '@/components/hotel/testimonial'
import SpecialOffer from '@/components/hotel/specialoffer'
import StayAtCairn from '@/components/hotel/stayatcarin'

const page = () => {
  return (
    <div>
      <Hero />
      <StoryOfCairn />
      <ArchitectureOfNature />
      <ExploreStay/>
      <TrustedBy/>
      <StayElevated/>
      <Sustainability/>
      <Testimonial/>
      <SpecialOffer/>
      <StayAtCairn/>
    </div>
  )
}

export default page