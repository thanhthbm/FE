import React from 'react'
import { User, MapPin, ShoppingBag } from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router-dom'

export default function ProfileLayout() {
  // Danh sách Menu
  const navItems = [
    { icon: User, label: 'Profile', path: '/profile', end: true },
    { icon: MapPin, label: 'Address Book', path: '/profile/address', end: false },
    { icon: ShoppingBag, label: 'My orders', path: '/profile/orders', end: false }
  ]

  return (
    <div className='bg-gray-50 min-h-screen py-8'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
          {/* --- LEFT SIDEBAR --- */}
          <div className='md:col-span-1'>
            <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24 p-2'>
              <nav className='space-y-1'>
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-pink-50 text-pink-600 shadow-sm'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`
                    }
                  >
                    <item.icon className='w-5 h-5' />
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>

          {/* --- RIGHT CONTENT --- */}
          <div className='md:col-span-3'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
