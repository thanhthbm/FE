export type Page<T> = {
  meta: Meta
  result: T
}

type Meta = {
  page: number
  pageSize: number
  total: number
  pages: number
}

export type Variant = {
  id: string
  color?: string | null
  size?: string | null
  stockQuantity?: number | null
}

export type ProductResource = {
  id: string
  name?: string | null
  url?: string | null
  type?: string | null
  isPrimary?: boolean | null
}

export type Product = {
  id: string
  name: string

  description?: string | null
  price: number

  brand?: string | null

  categoryId?: string | null
  categoryTypeId?: string | null
  categoryName?: string | null
  categoryTypeName?: string | null

  thumbnail?: string | null

  variants?: Variant[] | null
  productResources?: ProductResource[] | null

  rating?: number | null
  slug?: string | null
  newArrival?: boolean
}


