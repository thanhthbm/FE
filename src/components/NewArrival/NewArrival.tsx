import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { GetProductParams, productApi } from '../../apis/product.api'
import Skeleton from '../Skeleton/Skeleton'

const NewArrival = () => {
  const paramsForQuery: GetProductParams = {
    isNewArrival: true,
    page: 1,
    size: 8
  }

  const newArrivalProductsQuery = useQuery({
    queryKey: ['newArrivalProducts', paramsForQuery],

    queryFn: () => productApi.getProducts(paramsForQuery)
  })

  if (newArrivalProductsQuery.isLoading) {
    return <Skeleton />
  }

  if (newArrivalProductsQuery.isError) {
    return <div>Error loading new</div>
  }

  const products = newArrivalProductsQuery.data?.data?.data?.result

  return (
    <div className='bg-gray-50 py-16'>
      <div className='container mx-auto px-6'>
        <h2 className='text-3xl font-bold text-gray-900 text-center mb-12'>New Arrivals</h2>
        <div className='grid grid-cols-4 gap-6'>
          {products?.map((product) => (
            <div
              key={product.id}
              className='bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer group'
            >
              <div className='aspect-square overflow-hidden bg-gray-100'>
                <img
                  src={product.thumbnail as string}
                  alt={product.name}
                  className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                />
              </div>
              <div className='p-4'>
                <h3 className='font-semibold text-gray-900 mb-2'>{product.name}</h3>
                <p className='text-lg font-bold text-gray-900'>{product.price} VND</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewArrival
