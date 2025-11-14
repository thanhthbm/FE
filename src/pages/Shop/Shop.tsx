import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

export default function Shop() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const newArrivals = [
    { id: 1, name: 'Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80' },
    { id: 2, name: 'Shirts', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80' },
    { id: 3, name: 'T-Shirts', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80' },
    { id: 4, name: 'Dresses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80' }
  ]

  const womenCategories = [
    {
      id: 1,
      name: 'Hoodies & Sweatshirt',
      items: 'Explore Now!',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80'
    },
    {
      id: 2,
      name: 'Coats & Parkas',
      items: 'Explore Now!',
      image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&q=80'
    },
    {
      id: 3,
      name: 'Tees & T-Shirt',
      items: 'Explore Now!',
      image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&q=80'
    },
    {
      id: 4,
      name: 'Boxers',
      items: 'Explore Now!',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&q=80'
    }
  ]

  const menCategories = [
    {
      id: 1,
      name: 'Shirts',
      items: 'Explore Now!',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80'
    },
    {
      id: 2,
      name: 'Printed T-Shirts',
      items: 'Explore Now!',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80'
    },
    {
      id: 3,
      name: 'Plain T-Shirt',
      items: 'Explore Now!',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80'
    },
    {
      id: 4,
      name: 'Polo T-Shirt',
      items: 'Explore Now!',
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&q=80'
    },
    {
      id: 5,
      name: 'Hoodies & Sweatshirt',
      items: 'Explore Now!',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80'
    },
    {
      id: 6,
      name: 'Jeans',
      items: 'Explore Now!',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80'
    },
    {
      id: 7,
      name: 'Activewear',
      items: 'Explore Now!',
      image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&q=80'
    },
    {
      id: 8,
      name: 'Boxers',
      items: 'Explore Now!',
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&q=80'
    }
  ]

  return (
    <div className='bg-white'>
      {/* Hero Banner */}
      <div className='relative bg-gradient-to-r from-pink-300 to-pink-400 h-80 overflow-hidden'>
        <div className='container mx-auto px-6 h-full'>
          <div className='flex items-center h-full'>
            <div className='flex-1'>
              <p className='text-white text-sm mb-2'>T-Shirt / Tops</p>
              <h1 className='text-white text-6xl font-bold mb-4'>
                Summer
                <br />
                Value Pack
              </h1>
              <p className='text-white text-lg mb-6'>cool / colorful / comfy</p>
              <button className='bg-white text-gray-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors'>
                Shop Now!
              </button>
            </div>
            <div className='flex-1 flex justify-end'>
              <img
                src='https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80'
                alt='Shopping Girl'
                className='h-80 object-cover'
              />
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
          className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full transition-colors'
        >
          <ChevronLeft className='w-6 h-6 text-white' />
        </button>
        <button
          onClick={() => setCurrentSlide(currentSlide + 1)}
          className='absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full transition-colors'
        >
          <ChevronRight className='w-6 h-6 text-white' />
        </button>

        {/* Dots Indicator */}
        <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2'>
          <div className='w-8 h-1 bg-white rounded-full'></div>
          <div className='w-8 h-1 bg-white/50 rounded-full'></div>
          <div className='w-8 h-1 bg-white/50 rounded-full'></div>
        </div>
      </div>

      {/* New Arrival Section */}
      <div className='container mx-auto px-6 py-16'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 border-l-4 border-gray-900 pl-4'>New Arrival</h2>

        <div className='relative'>
          <div className='grid grid-cols-4 gap-6'>
            {newArrivals.map((item) => (
              <div key={item.id} className='group cursor-pointer'>
                <div className='bg-gray-100 rounded-lg overflow-hidden mb-3 aspect-square'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                </div>
                <h3 className='text-center text-gray-900 font-medium'>{item.name}</h3>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg p-2 rounded-full hover:bg-gray-50'>
            <ChevronLeft className='w-5 h-5' />
          </button>
          <button className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg p-2 rounded-full hover:bg-gray-50'>
            <ChevronRight className='w-5 h-5' />
          </button>
        </div>
      </div>

      {/* Categories For Women */}
      <div className='container mx-auto px-6 py-16'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 border-l-4 border-gray-900 pl-4'>Categories For Women</h2>

        <div className='grid grid-cols-4 gap-6'>
          {womenCategories.map((category) => (
            <div key={category.id} className='group cursor-pointer'>
              <div className='bg-gray-100 rounded-lg overflow-hidden mb-3 aspect-[3/4] relative'>
                <img
                  src={category.image}
                  alt={category.name}
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                />
                <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4'>
                  <h3 className='text-white font-semibold'>{category.name}</h3>
                  <div className='flex items-center text-white text-sm mt-1'>
                    <span>{category.items}</span>
                    <ArrowRight className='w-4 h-4 ml-1' />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories For Men */}
      <div className='container mx-auto px-6 py-16'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 border-l-4 border-gray-900 pl-4'>Categories For Men</h2>

        <div className='grid grid-cols-4 gap-6'>
          {menCategories.map((category) => (
            <div key={category.id} className='group cursor-pointer'>
              <div className='bg-gray-100 rounded-lg overflow-hidden mb-3 aspect-[3/4] relative'>
                <img
                  src={category.image}
                  alt={category.name}
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                />
                <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4'>
                  <h3 className='text-white font-semibold'>{category.name}</h3>
                  <div className='flex items-center text-white text-sm mt-1'>
                    <span>{category.items}</span>
                    <ArrowRight className='w-4 h-4 ml-1' />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
