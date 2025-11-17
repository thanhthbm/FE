import { Page, Product } from '../types/product.type'
import http from '../utils/http'
import { ApiResponse } from './auth.api'
import { sfAnd, sfEqual, sfLike, sfGt, sfLt, sfIsNull, sfOr } from 'spring-filter-query-builder'

export const URL_GET_PRODUCTS = 'api/products'

export interface GetProductParams {
  page?: number
  size?: number
  filter?: string
  sortBy?: string
}

export const productApi = {
  getProducts: (params: GetProductParams) => {
    const config = {
      params: {
        page: params.page,
        size: params.size,
        filter: params.filter,
        sortBy: params.sortBy
      }
    }

    Object.keys(config.params).forEach(
      (key) =>
        config.params[key as keyof typeof config.params] === undefined &&
        delete config.params[key as keyof typeof config.params]
    )

    return http.get<ApiResponse<Page<Product[]>>>(URL_GET_PRODUCTS, config)
  },

  getProductById: (productId: string) =>
    http.get<ApiResponse<Product>>(URL_GET_PRODUCTS + '/' + productId).then((res) => res.data.data)
}
