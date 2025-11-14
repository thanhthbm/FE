import React, { useState } from 'react'
import { Search, Heart, User, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <header className='bg-white border-b border-gray-200'>
      <div className='container mx-auto px-6'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex items-center gap-8'>
            <Link to='/' className='text-3xl font-bold text-gray-900 -ml-8'>
              FashionShop
            </Link>

            {/* Navigation */}
            <nav className='flex items-center gap-6'>
              <Link to='/' className='text-gray-900 font-medium hover:text-gray-600 transition-colors'>
                Shop
              </Link>
              <Link to='/men' className='text-gray-600 hover:text-gray-900 transition-colors'>
                Men
              </Link>
              <Link to='/women' className='text-gray-600 hover:text-gray-900 transition-colors'>
                Women
              </Link>
              <Link to='/kids' className='text-gray-600 hover:text-gray-900 transition-colors'>
                Kids
              </Link>
            </nav>
          </div>

          {/* Search Bar */}
          <div className='flex items-center flex-1 max-w-md mx-8'>
            <div className='relative w-full'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
              <input
                type='text'
                placeholder='Search'
                className='w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-200 transition-colors'
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className='flex items-center gap-4'>
            {/* Wishlist Icon */}
            <button className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
              <Heart className='w-6 h-6 text-gray-700' />
            </button>

            {/* User Icon with Dropdown */}
            <div
              className='relative'
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <button className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
                <User className='w-6 h-6 text-gray-700' />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className='absolute right-0 top-full pt-2 z-50'>
                  <div className='w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2'>
                    <Link to='/profile' className='block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors'>
                      Profile
                    </Link>
                    <Link to='/logout' className='block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors'>
                      Logout
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Icon */}
            <button className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
              <ShoppingCart className='w-6 h-6 text-gray-700' />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
