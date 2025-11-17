import { data } from 'react-router-dom'
import axios, { AxiosInstance } from 'axios'
import { getAccessTokenFromLS } from './auth'
import config from '../constants/config'
import { error } from 'console'
import { URL_LOGIN, URL_REGISTER } from '../apis/auth.api'

export class Http {
  instance: AxiosInstance
  private accessToken: string

  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        const token = getAccessTokenFromLS()
        if (token && config.headers) {
          config.headers.authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )
  }
}

const http = new Http().instance
export default http
