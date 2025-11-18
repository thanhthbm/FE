import authApi, { URL_REFRESH } from '../apis/auth.api'

import axios from 'axios'
import config from '../constants/config'

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''
export const setAccessTokenToLs = (token: string) => localStorage.setItem('access_token', token)
export const clearAccessTokenFromLS = () => localStorage.removeItem('access_token')

const refreshClient = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000
})

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const res = await refreshClient.post(URL_REFRESH, {})
    const newAccessToken = res.data?.data?.accessToken
    if (!newAccessToken) {
      logout()
      return null
    }
    setAccessTokenToLs(newAccessToken)
    return newAccessToken
  } catch (err) {
    logout()
    return null
  }
}

export const logout = () => {
  clearAccessTokenFromLS()
  window.location.href = '/login'
}
