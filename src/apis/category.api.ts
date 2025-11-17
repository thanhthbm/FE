import { Category, CategoryType } from '../types/category.type'
import http from '../utils/http'
import { ApiResponse } from './auth.api'

export const URL_GET_ALL_CATEGORIES = 'api/category'

export interface GetCategoryParams {
  filter?: string
}

export const categoryApi = {
  getAllCategories: (params: GetCategoryParams) => {
    const config = {
      params: {
        filter: params.filter
      }
    }

    Object.keys(config.params).forEach(
      (key) =>
        config.params[key as keyof typeof config.params] === undefined &&
        delete config.params[key as keyof typeof config.params]
    )
    return http.get<ApiResponse<Category[]>>(URL_GET_ALL_CATEGORIES, config)
  }
}
