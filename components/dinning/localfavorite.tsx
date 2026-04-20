'use client'

import React, { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { ChevronLeft, ChevronRight, MapPin, RotateCcw, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'


export interface MapViewProps {
  locations: Location[]
  activeId: string | null
  hotel: { lat: number; lng: number }
  onMarkerClick: (id: string) => void
}


const MapView = dynamic<MapViewProps>(() => import('./MapView'), { ssr: false })


const RAW_DATA = {
  american_cuisine: [
    { name: 'Second East', address: '686 Canyon Ranch Dr, Cedar City, UT 84721', opening_hours: 'Closed Saturday & Sunday; Mon-Fri: 11:00 AM – 2:00 PM', latitude: 37.7251, longitude: -113.0483, phone_number: '+1 435-586-2543', google_maps_link: 'https://www.google.com/maps/search/?api=1&query=Second+East+Cedar+City+UT' },
    { name: 'The Pub Spirits and Craft Kitchen', address: '86 W Center St, Cedar City, UT 84720', opening_hours: 'Mon-Sat: 10:00 AM – 10:00 PM; Sun: 10:00 AM – 9:00 PM', latitude: 37.6776, longitude: -113.0631, phone_number: '+1 435-867-1400', google_maps_link: 'https://www.google.com/maps/search/?api=1&query=The+Pub+Spirits+and+Craft+Kitchen+Cedar+City+UT' },
    { name: 'Park Place Eatery', address: '23 W Center St, Cedar City, UT 84720', opening_hours: 'Mon-Sat: 8:00 AM – 9:00 PM; Sun: Closed', latitude: 37.6772, longitude: -113.0622, phone_number: '+1 435-267-0556', google_maps_link: 'https://www.google.com/maps/search/?api=1&query=Park+Place+Eatery+Cedar+City+UT' },
  ],
  italian_cuisine: [
    { name: 'Centro Woodfired Pizza', address: '50 W Center St, Cedar City, UT 84720', opening_hours: 'Mon-Sat: 11:30 AM – 9:00 PM; Sun: Closed', latitude: 37.6776, longitude: -113.0628, phone_number: '+1 435-867-8123', google_maps_link: 'https://www.google.com/maps/search/?api=1&query=Centro+Woodfired+Pizza+Cedar+City+UT' },
    { name: "Chef Alfredo's", address: '2313 UT-56, Cedar City, UT 84720', opening_hours: 'Mon-Thu: 4:00 PM – 9:00 PM; Fri-Sat: 12:00 PM – 9:30 PM; Sun: Closed', latitude: 37.6832, longitude: -113.0937, phone_number: '+1 435-586-2693', google_maps_link: 'https://www.google.com/maps/search/?api=1&query=Chef+Alfredos+Cedar+City+UT' },
    { name: 'The Pizza Cart', address: '1190 Sage Dr Ste B, Cedar City, UT 84720', opening_hours: 'Mon-Sat: 11:00 AM – 9:00 PM; Sun: Closed', latitude: 37.6564, longitude: -113.0832, phone_number: '+1 435-590-8062', google_maps_link: 'https://www.google.com/maps/search/?api=1&query=The+Pizza+Cart+Cedar+City+UT' },
  ],
  bars_and_wineries: [
    { name: 'IG Winery', address: '59 W Center St, Cedar City, UT 84720', opening_hours: 'Mon-Thu: 2:00 PM – 9:00 PM; Fri-Sat: 12:00 PM – 10:00 PM; Sun: 12:00 PM – 7:00 PM', latitude: 37.6772, longitude: -113.0628, phone_number: '+1 435-867-9463', google_maps_link: 'https://www.google.com/maps/search/?api=1&query=IG+Winery+Cedar+City+UT' },
    { name: 'Blackbird Bar', address: '90 W Hoover Ave, Cedar City, UT 84720', opening_hours: 'Mon-Sun: 4:00 PM – 1:00 AM', latitude: 37.6797, longitude: -113.0631, phone_number: '+1 435-867-0205', google_maps_link: 'https://www.google.com/maps/search/?api=1&query=Blackbird+Bar+Cedar+City+UT' },
    { name: 'Warehouse Bar and Kitchen', address: '432 N 100 W, Cedar City, UT 84721', opening_hours: 'Mon-Sat: 4:00 PM – 1:00 AM; Sun: 11:00 AM – 11:00 PM', latitude: 37.6851, longitude: -113.0632, phone_number: '+1 435-867-1244', google_maps_link: 'https://www.google.com/maps/search/?api=1&query=Warehouse+Bar+and+Kitchen+Cedar+City+UT' },
  ],
  mexican_cuisine: [
    { name: 'Puerto Vallarta Jalisco', address: '1575 W 200 N, Cedar City, UT 84720', opening_hours: 'Mon-Sun: 10:00 AM – 9:00 PM', latitude: 37.6804, longitude: -113.0832, phone_number: '+1 435-865-1771', google_maps_link: 'https://www.google.com/maps/search/?api=1&query=Puerto+Vallarta+Jalisco+Cedar+City+UT' },
    { name: 'Las Flores Family Mexican Restaurant', address: '126 N Main St, Cedar City, UT 84720', opening_hours: 'Mon-Sat: 11:00 AM – 9:00 PM; Sun: Closed', latitude: 37.6795, longitude: -113.0616, phone_number: '+1 435-233-2280', google_maps_link: 'https://www.google.com/maps/search/?api=1&query=Las+Flores+Family+Mexican+Restaurant+Cedar+City+UT' },
    { name: "Lupita's Mexican Food", address: '2052 Cross Hollow Rd, Cedar City, UT 84720', opening_hours: 'Mon-Sat: 11:00 AM – 9:00 PM; Sun: Closed', latitude: 37.656, longitude: -113.0872, phone_number: '+1 435-865-9255', google_maps_link: 'https://www.google.com/maps/search/?api=1&query=Lupitas+Mexican+Food+Cedar+City+UT' },
  ],
  asian_indian_cuisine: [
    { name: "Bunnisa's Thai Cuisine and Pho", address: '5 N Main St, Cedar City, UT 84720', opening_hours: 'Mon-Fri: 11:00 AM – 9:00 PM; Sat: 12:00 PM – 9:00 PM; Sun: Closed', latitude: 37.6776, longitude: -113.0621, phone_number: '+1 435-233-2101', google_maps_link: 'https://www.google.com/maps/search/?api=1&query=Bunnisa+Thai+Cuisine+and+Pho+Cedar+City+UT' },
    { name: 'Mandarin', address: '241 N Main St, Cedar City, UT 84721', opening_hours: 'Mon-Sat: 11:30 AM – 9:30 PM; Sun: Closed', latitude: 37.6818, longitude: -113.0623, phone_number: '+1 435-586-2185', google_maps_link: 'https://www.google.com/maps/search/?api=1&query=Mandarin+Cedar+City+UT' },
    { name: 'Bombay Cafe', address: '64 N Main St, Cedar City, UT 84720', opening_hours: 'Mon-Sat: 11:00 AM – 9:00 PM; Sun: Closed', latitude: 37.6785, longitude: -113.0615, phone_number: '+1 435-586-1823', google_maps_link: 'https://www.google.com/maps/search/?api=1&query=Bombay+Cafe+Cedar+City+UT' },
  ],
}

const CATEGORY_IMAGES: Record<string, string> = {
  american_cuisine: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80',
  italian_cuisine: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=80',
  bars_and_wineries: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80',
  mexican_cuisine: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80',
  asian_indian_cuisine: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&q=80',
}


export interface Location {
  id: string
  name: string
  address: string
  opening_hours: string
  latitude: number
  longitude: number
  phone_number: string
  google_maps_link: string
  category: string
  image: string
  distance: number
}



const HOTEL = { lat: 37.6799222, lng: -113.0832669 }

function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 3958.8, toRad = (d: number) => d * Math.PI / 180
  const dLat = toRad(lat2 - lat1), dLon = toRad(lon2 - lon1)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

const FILTER_OPTIONS = [
  { label: 'All Distances', value: 'all' },
  { label: 'Within 1 mile', value: '1_or_less' },
  { label: '1 – 2 miles', value: '1_to_2' },
  { label: '2+ miles', value: '2_plus' },
]



const LocalFavorite = () => {
  const [filter, setFilter] = useState('all')
  const [filterOpen, setFilterOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeId, setActiveId] = useState<string | null>(null)

  // Flatten all locations with distance
  const allLocations = useMemo<Location[]>(() => {
    const locs: Location[] = []
    Object.entries(RAW_DATA).forEach(([cat, places]) => {
      places.forEach((p, i) => {
        locs.push({
          id: `${cat}-${i}`,
          category: cat.replace(/_/g, ' '),
          image: CATEGORY_IMAGES[cat] ?? CATEGORY_IMAGES.american_cuisine,
          distance: haversine(HOTEL.lat, HOTEL.lng, p.latitude, p.longitude),
          ...p,
        })
      })
    })
    return locs.sort((a, b) => a.distance - b.distance)
  }, [])

  const visible = useMemo(() =>
    allLocations.filter(loc => {
      if (filter === '1_or_less') return loc.distance <= 1
      if (filter === '1_to_2') return loc.distance > 1 && loc.distance <= 2
      if (filter === '2_plus') return loc.distance > 2
      return true
    }), [allLocations, filter])

  useEffect(() => {
    setCurrentIndex(0)
    setActiveId(visible[0]?.id ?? null)
  }, [filter, visible])

  useEffect(() => {
    if (visible[currentIndex]) setActiveId(visible[currentIndex].id)
  }, [currentIndex, visible])

  const activeLoc = visible[currentIndex] ?? null

  const handlePrev = () => setCurrentIndex(p => (p === 0 ? visible.length - 1 : p - 1))
  const handleNext = () => setCurrentIndex(p => (p === visible.length - 1 ? 0 : p + 1))

  return (
    <section className="w-full bg-white py-20 font-sans">
      <div className="flex flex-col lg:flex-row gap-10">

        <div className="w-full lg:w-[42%] px-6 md:px-12 lg:px-16 flex flex-col">

          <p className="text-xl tracking-wide text-gray-500 mb-5">Things to do in Cedar City</p>
          <h2 className="text-4xl md:text-[3.125rem] font-medium uppercase tracking-tighter text-black mb-8">
            LOCAL FAVORITES
          </h2>

     
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <button
                onClick={() => setFilterOpen(o => !o)}
                className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:border-gray-500 transition-colors shadow-sm cursor-pointer"
              >
                <span>{filter === 'all' ? 'Distance' : FILTER_OPTIONS.find(f => f.value === filter)?.label}</span>
                <ChevronDown size={13} className={`text-gray-400 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {filterOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full min-w-[190px] bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-50 py-1"
                  >
                    {FILTER_OPTIONS.map(opt => (
                      <li key={opt.value}>
                        <button
                          onClick={() => { setFilter(opt.value); setFilterOpen(false) }}
                          className={`w-full text-left px-5 py-2.5 text-sm transition-colors cursor-pointer ${filter === opt.value ? 'bg-[#F7F6F4] text-black font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                        >
                          {opt.label}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {filter !== 'all' && (
              <button
                onClick={() => setFilter('all')}
                title="Reset"
                className="p-2 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer rounded-full"
              >
                <RotateCcw size={18} />
              </button>
            )}
          </div>

         
          <div className="flex-grow min-h-[480px] flex flex-col">
            <AnimatePresence mode="wait">
              {visible.length > 0 && activeLoc ? (
                <motion.div
                  key={activeLoc.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col"
                >
                  <div className="relative w-full aspect-[4/3] rounded-[1.25rem] overflow-hidden mb-6 shadow-md">
                    <Image src={activeLoc.image} alt={activeLoc.name} fill className="object-cover" />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full">
                      <span className="text-[10px] uppercase tracking-widest text-white font-semibold">
                        {activeLoc.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-normal uppercase text-[#1a1a1a] mb-5">
                    {activeLoc.name}
                  </h3>
                  <div className="space-y-3 text-sm text-gray-700 mb-6">
                    <div>
                      <p className="font-bold text-black text-xs uppercase tracking-wider mb-1">Address</p>
                      <p className="opacity-75 text-lg leading-relaxed">{activeLoc.address}</p>
                    </div>
                    <div>
                      <p className="font-bold text-black text-xs uppercase tracking-wider mb-1">Phone Number</p>
                      <p className="opacity-75 text-lg">{activeLoc.phone_number}</p>
                    </div>
                    {/* <div>
                      <p className="font-bold text-black text-xs uppercase tracking-wider mb-1">Hours</p>
                      <p className="opacity-75">{activeLoc.opening_hours}</p>
                    </div> */}
                    {/* <div className="flex items-center gap-2 pt-1">
                      <MapPin size={13} className="text-orange-500 shrink-0" />
                      <p className="font-semibold text-gray-800">{activeLoc.distance.toFixed(2)} miles from The Cairn Hotel</p>
                    </div> */}
                  </div>
                </motion.div>
              ) : (
                <div className="py-20 text-gray-400 text-sm font-medium">No locations found for this filter.</div>
              )}
            </AnimatePresence>

            {visible.length > 0 && (
              <div className="flex items-center justify-center gap-4 mt-6">
                <button onClick={handlePrev} className="p-3 rounded-full border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all text-gray-600 cursor-pointer">
                  <ChevronLeft size={18} />
                </button>
                <button onClick={handleNext} className="p-3 rounded-full border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all text-gray-600 cursor-pointer">
                  <ChevronRight size={18} />
                </button>
                <span className="text-sm text-gray-400 font-medium ml-1">
                  {currentIndex + 1} / {visible.length}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:w-[50%] h-[400px] px-5  lg:h-auto rounded-2xl relative mt-10 lg:mt-0 ">
          <div className="sticky top-5 h-screen ">
            <MapView
              locations={visible}
              activeId={activeId}
              hotel={HOTEL}
              onMarkerClick={(id) => {
                const idx = visible.findIndex(l => l.id === id)
                if (idx !== -1) setCurrentIndex(idx)
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default LocalFavorite