import React from 'react'

const HeroBanner = () => {
  return (
    <div className='relative h-96 bg-gray-200 overflow-hidden'>
      <img
        src='https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80'
        alt='Hero'
        className='w-full h-full object-cover'
      />
      <div className='absolute inset-0 bg-black/30 flex items-center justify-center'>
        <div className='text-center text-white px-6'>
          <h1 className='text-5xl font-bold mb-4'>New Season Styles</h1>
          <p className='text-lg mb-6'>Discover the latest trends and refresh your wardrobe with our new collection.</p>
          <button className='bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors'>
            Shop Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
