import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { sfAnd, sfEqual, sfGt, sfLt, sfOr } from 'spring-filter-query-builder'
import { productApi } from '../apis/product.api'
import { categoryApi } from '../apis/category.api'
import { Product } from '../types/product.type'
import { CategoryType } from '../types/category.type'

interface UseProductListProps {
  category: string
}

export const useProductList = ({ category }: UseProductListProps) => {
  const [selectedCategoryType, setSelectedCategoryType] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000])
  const [sortBy, setSortBy] = useState<string>('newest')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const pageSize = 12

  const categoryTypesQuery = useQuery<CategoryType[]>({
    queryKey: ['categoryTypes', category],
    queryFn: async () => {
      if (!category) return []
      const res = await categoryApi.getAllCategories({
        filter: sfAnd([sfEqual('code', category.toUpperCase())]).toString()
      })
      return res.data?.data?.[0]?.categoryTypes ?? []
    }
  })

  const categoryTypes = categoryTypesQuery.data ?? []

  const productsQuery = useQuery({
    queryKey: ['products', category, currentPage, sortBy, priceRange, selectedCategoryType],
    queryFn: () => {
      const filters: any[] = []

      if (category) filters.push(sfEqual('category.code', category.toUpperCase()))

      if (priceRange[0] > 0) filters.push(sfGt('price', priceRange[0]))
      if (priceRange[1] < 10000000) filters.push(sfLt('price', priceRange[1]))

      if (selectedCategoryType.length > 0) {
        const typeFilters = selectedCategoryType.map((t) => sfEqual('categoryType.code', String(t).toUpperCase()))
        filters.push(sfOr(typeFilters))
      }

      const filterQuery = filters.length ? sfAnd(filters).toString() : undefined

      return productApi.getProducts({
        filter: filterQuery,
        page: currentPage,
        size: pageSize,
        sortBy: sortBy === 'newest' ? undefined : sortBy
      })
    }
  })

  const products: Product[] = productsQuery.data?.data?.data?.result ?? []
  const meta = productsQuery.data?.data?.data?.meta


  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPriceRange([priceRange[0], parseInt(e.target.value, 10)])
    setCurrentPage(1)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSortBy(e.target.value)
    setCurrentPage(1)
  }

  const handleClearFilters = (): void => {
    setSelectedCategoryType([])
    setPriceRange([0, 10000000])
    setCurrentPage(1)
    setSortBy('newest')
  }

  const handlePageChange = (page: number): void => {
    if (page < 1) return
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleCategoryType = (code: string) => {
    setSelectedCategoryType((prev) => {
      const next = prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
      setCurrentPage(1)
      return next
    })
  }

  return {
    categoryTypes,
    products,
    meta,
    isLoading: productsQuery.isLoading,

    selectedCategoryType,
    priceRange,
    sortBy,
    currentPage,

    handlePriceRangeChange,
    handleSortChange,
    handleClearFilters,
    handlePageChange,
    toggleCategoryType
  }
}
