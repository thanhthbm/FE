import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white py-12'>
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-4 gap-8 mb-8'>
          {/* Logo */}
          <div>
            <h3 className='text-2xl font-bold mb-4'>ShopEase</h3>
          </div>

          {/* Support */}
          <div>
            <h4 className='font-semibold mb-4'>Support</h4>
            <ul className='space-y-2 text-gray-400'>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  Contact Us
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  FAQ
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  Shipping & Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className='font-semibold mb-4'>Company</h4>
            <ul className='space-y-2 text-gray-400'>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  About Us
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  Careers
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className='font-semibold mb-4'>Newsletter</h4>
            <p className='text-gray-400 text-sm mb-4'>Get 10% off your first order when you sign up.</p>
            <div className='flex gap-2'>
              <input
                type='email'
                placeholder='Enter your email'
                className='flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-pink-600'
              />
              <button className='bg-pink-600 hover:bg-pink-700 px-6 py-2 rounded-lg font-semibold transition-colors'>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className='border-t border-gray-800 pt-8 flex justify-between items-center'>
          <p className='text-gray-400 text-sm'>© 2024 ShopEase. All rights reserved.</p>
          <div className='flex gap-4'>
            <a href='#' className='text-gray-400 hover:text-white transition-colors'>
              Facebook
            </a>
            <a href='#' className='text-gray-400 hover:text-white transition-colors'>
              Instagram
            </a>
            <a href='#' className='text-gray-400 hover:text-white transition-colors'>
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
