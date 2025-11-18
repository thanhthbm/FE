import { data } from 'react-router-dom'
import axios, { AxiosInstance } from 'axios'
import { getAccessTokenFromLS, logout, refreshAccessToken } from './auth'
import config from '../constants/config'
import { error } from 'console'
import { URL_LOGIN, URL_REGISTER } from '../apis/auth.api'
import authApi from '../apis/auth.api'

export class Http {
  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 30000,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (cfg) => {
        const token = getAccessTokenFromLS()
        if (token && cfg.headers) {
          cfg.headers.Authorization = `Bearer ${token}`
        }
        return cfg
      },
      (error) => Promise.reject(error)
    )

    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config

        if (!originalRequest) return Promise.reject(error)

        if (originalRequest.url?.includes('/api/auth/refresh')) {
          return Promise.reject(error)
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          const newToken = await refreshAccessToken()
          if (newToken) {
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`
            return this.instance(originalRequest)
          } else {
            logout()
            return Promise.reject(error)
          }
        }

        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
