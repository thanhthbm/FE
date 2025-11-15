import React from 'react'
import { categories } from '../../constants/category'
import { Link } from 'react-router-dom'

const Category = () => {
  return (
    <div className='container mx-auto px-6 py-16'>
      <h2 className='text-3xl font-bold text-gray-900 text-center mb-12'>Shop by Category</h2>
      <div className='grid grid-cols-3 gap-6'>
        {categories.map((category) => (
          <Link
            to={category.url}
            key={category.id}
            className='relative h-96 rounded-xl overflow-hidden group cursor-pointer'
          >
            <img
              src={category.image}
              alt={category.name}
              className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6'>
              <h3 className='text-3xl font-bold text-white mb-1'>{category.name}</h3>
              <p className='text-white/90'>{category.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Category
