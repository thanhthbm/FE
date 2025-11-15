import { Page, Product } from '../types/product.type'
import http from '../utils/http'
import { ApiResponse } from './auth.api'

export const URL_GET_PRODUCTS = 'api/products'

export interface GetProductParams {
  categoryId?: string
  categoryTypeId?: string
  isNewArrival?: boolean
  page?: number
  size?: number
}

export const productApi = {
  getProducts: (params: GetProductParams) => {
    const config = {
      params: {
        categoryId: params.categoryId,
        categoryTypeId: params.categoryTypeId,
        isNewArrival: params.isNewArrival,
        page: params.page,
        size: params.size
      }
    }

    Object.keys(config.params).forEach(
      (key) =>
        config.params[key as keyof GetProductParams] === undefined &&
        delete config.params[key as keyof GetProductParams]
    )

    return http.get<ApiResponse<Page<Product[]>>>(URL_GET_PRODUCTS, config)
  }
}
