import React from 'react'
import { features } from '../../constants/features'

const Feature = () => {
  return (
    <div className='container mx-auto px-6 py-16'>
      <div className='grid grid-cols-3 gap-12'>
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <div key={feature.id} className='text-center'>
              <div className='flex justify-center mb-4'>
                <div className='w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center'>
                  <Icon className='w-8 h-8 text-pink-600' />
                </div>
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-2'>{feature.title}</h3>
              <p className='text-gray-600'>{feature.description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Feature
