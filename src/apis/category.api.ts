import { Category } from '../types/category.type'
import http from '../utils/http'
import { ApiResponse } from './auth.api'

export const URL_GET_ALL_CATEGORIES = 'api/category'

export const categoryApi = {
  getAllCategories: () => http.get<ApiResponse<Category[]>>(URL_GET_ALL_CATEGORIES)
}
