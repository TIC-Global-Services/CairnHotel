'use client'

import React, { useState } from 'react'

const Map = () => {
  const [mapActive, setMapActive] = useState(false)

  return (
    <section
      onClick={() => setMapActive(true)}
      className="relative w-full h-[60vh] md:h-[80vh] bg-transparent overflow-hidden group cursor-pointer"
    >
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          title="Cairn Hotel Location"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-113.1031%2C37.6599%2C-113.0631%2C37.6999&layer=mapnik&marker=37.6799%2C-113.0831"
          className={`w-full h-full transition-all duration-700 ease-in-out
            ${mapActive
              ? 'grayscale-0 opacity-100 mix-blend-normal pointer-events-auto'
              : 'grayscale-50 opacity-70 mix-blend-luminosity pointer-events-none'
            }`}
        />
      </div>

      {!mapActive && (
        <>
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-linear-to-t from-[#1a1818] via-transparent to-transparent opacity-80 transition-opacity duration-700" />

          <div className="absolute top-10 left-8 md:top-16 md:left-16 pointer-events-none">
            <h2 className="text-3xl md:text-5xl font-semibold uppercase tracking-widest text-[#fdf8f4] drop-shadow-xl">
              Location
            </h2>
            <p className="text-white/90 mt-2 tracking-[0.2em] uppercase text-xs md:text-sm drop-shadow-md">
              1575 W 200 N, Cedar City, UT 84720
            </p>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
            <span className="text-white/60 text-xs tracking-[0.15em] uppercase animate-pulse">
              Click to interact
            </span>
          </div>
        </>
      )}
    </section>
  )
}

export default Map