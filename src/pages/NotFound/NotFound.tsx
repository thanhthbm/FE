import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='bg-gray-50 min-h-screen'>
      <div className='container mx-auto px-6 py-16'>
        <div className='grid grid-cols-2 gap-16 items-center'>
          {/* Left Side - Content */}
          <div>
            <h1 className='text-6xl font-bold text-gray-900 mb-6'>Oops! Lost in Style?</h1>
            <p className='text-gray-600 text-lg mb-8 leading-relaxed'>
              The page you're looking for seems to have vanished. But don't worry, we can help you find your way back to
              fabulous.
            </p>

            {/* Return to Homepage Button */}
            <Link
              to='/'
              className='bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors mb-12'
            >
              Return to Homepage
            </Link>
          </div>

          {/* Right Side - Image */}
          <div>
            <div className='rounded-2xl overflow-hidden shadow-xl'>
              <img
                src='https://images.unsplash.com/photo-1483985988355-763728e1935b'
                alt='Fashion Model'
                className='w-full h-auto object-cover'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
