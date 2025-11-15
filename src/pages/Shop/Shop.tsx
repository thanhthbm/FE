import React from 'react'
import { Truck, Leaf, RotateCcw } from 'lucide-react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { categoryApi } from '../../apis/category.api'
import { Link } from 'react-router-dom'
import { url } from 'inspector'
import Category from '../../components/Category'
import Feature from '../../components/Feature'
import HeroBanner from '../../components/HeroBanner'
import NewArrival from '../../components/NewArrival'

export default function HomePage() {
  return (
    <div className='bg-white'>
      {/* Hero Banner */}
      <HeroBanner />

      {/* Shop by Category */}
      <Category />

      {/* New Arrivals */}
      <NewArrival />

      {/* Features */}
      <Feature />
    </div>
  )
}
