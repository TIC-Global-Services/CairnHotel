import React from 'react'

const Map = () => {
  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] bg-[#1a1818] overflow-hidden group">
      <iframe
        title="Cairn Hotel Location"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.openstreetmap.org/export/embed.html?bbox=-113.1031%2C37.6599%2C-113.0631%2C37.6999&layer=mapnik&marker=37.6799%2C-113.0831"
        className="w-full h-full grayscale-50 contrast-[1.1] opacity-70 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 ease-in-out"
      />

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-linear-to-t from-[#1a1818] via-transparent to-transparent opacity-80 group-hover:opacity-0 transition-opacity duration-700" />

     
      <div className="absolute top-10 left-8 md:top-16 md:left-16 pointer-events-none group-hover:opacity-0 transition-opacity duration-700">
        <h2 className="text-3xl md:text-5xl font-semibold uppercase tracking-widest text-[#fdf8f4] drop-shadow-xl">
          Location
        </h2>
        <p className="text-white/90 mt-2 tracking-[0.2em] uppercase text-xs md:text-sm drop-shadow-md">
          1575 W 200 N, Cedar City, UT 84720
        </p>
      </div>
    </section>
  )
}

export default Map