import { Product } from '../types/product.type'
import http from '../utils/http'
import { ApiResponse } from './auth.api'

export const URL_GET_WISHLIST = 'api/wishlist'
export const URL_TOGGLE_WISHLIST = 'api/wishlist/toggle'

export const wishlistApi = {
  getWishList: () => http.get<ApiResponse<Product[]>>(URL_GET_WISHLIST),
  toggleWishList: (productId: string) => http.post<ApiResponse<string>>(URL_TOGGLE_WISHLIST + '/' + productId, {})
}
