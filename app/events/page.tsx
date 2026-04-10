import React from 'react'
import Hero from '@/components/events/hero'
import Unforgettable from '@/components/events/unforgattable'
import PrivateEvent from '@/components/events/privateevent'
const page = () => {
  return (
    <div>
        <Hero/> 
        <Unforgettable/>
        <PrivateEvent/>
    </div>
  )
}

export default page