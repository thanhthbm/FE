import React, { useState } from 'react'
import { Search, Heart, User, ShoppingCart } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import useCart from '../../hooks/useCart' // Import hook useCart

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false)

  // Lấy tổng số lượng sản phẩm từ React Query (Global State)
  const { totalQuantity } = useCart()

  return (
    <header className='bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm'>
      <div className='container mx-auto px-6'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex items-center gap-8'>
            <NavLink to='/' className='text-3xl font-bold text-gray-900 -ml-8'>
              FashionShop
            </NavLink>

            {/* Navigation */}
            <nav className='hidden md:flex items-center gap-6'>
              <NavLink
                to='/'
                className={({ isActive }) =>
                  `font-medium transition-colors ${isActive ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`
                }
              >
                Shop
              </NavLink>
              <NavLink
                to='/men'
                className={({ isActive }) =>
                  `font-medium transition-colors ${isActive ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`
                }
              >
                Men
              </NavLink>
              <NavLink
                to='/women'
                className={({ isActive }) =>
                  `font-medium transition-colors ${isActive ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`
                }
              >
                Women
              </NavLink>
              <NavLink
                to='/kids'
                className={({ isActive }) =>
                  `font-medium transition-colors ${isActive ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`
                }
              >
                Kids
              </NavLink>
            </nav>
          </div>

          {/* Search Bar */}
          <div className='hidden md:flex items-center flex-1 max-w-md mx-8'>
            <div className='relative w-full'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
              <input
                type='text'
                placeholder='Search products...'
                className='w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-200 transition-colors text-sm'
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className='flex items-center gap-4'>
            {/* Wishlist Icon */}
            <Link to='/wishlist' className='p-2 hover:bg-gray-100 rounded-lg transition-colors relative group'>
              <Heart className='w-6 h-6 text-gray-700 group-hover:text-pink-600 transition-colors' />
            </Link>

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
                  <div className='w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 overflow-hidden'>
                    <Link
                      to='/profile'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-pink-600 transition-colors'
                    >
                      My Profile
                    </Link>
                    <Link
                      to='/orders'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-pink-600 transition-colors'
                    >
                      My Orders
                    </Link>
                    <div className='border-t border-gray-100 my-1'></div>
                    <Link
                      to='/logout'
                      className='block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors'
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <NavLink to='/cart' className='p-2 hover:bg-gray-100 rounded-lg transition-colors relative group'>
              <ShoppingCart className='w-6 h-6 text-gray-700 group-hover:text-pink-600 transition-colors' />

              {totalQuantity > 0 && (
                <span className='absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-600 text-[10px] font-bold text-white shadow-sm border-2 border-white'>
                  {totalQuantity > 99 ? '99+' : totalQuantity}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  )
}
