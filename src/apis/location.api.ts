import axios from 'axios'

export const URL_GET_PROVINCE = `https://esgoo.net/api-tinhthanh-new/1/0.htm`
export const URL_GET_WARD = (provinceId: string) => `https://esgoo.net/api-tinhthanh-new/2/${provinceId}.htm`

export type EsgooResponse = {
  error: number
  error_text: string
  data_name: string
  data_id?: string
  data_code?: string
  data: LocationOption[]
}

export type LocationOption = {
  id: string
  code: string
  name: string
  name_en: string
  full_name: string
  full_name_en: string
  latitude: string
  longtitude: string
}

export const locationApi = {
  getProvinces: async () => {
    const response = await axios.get<EsgooResponse>(URL_GET_PROVINCE)
    if (response.data.error === 0) {
      return response.data.data
    }
    return []
  },

  getWards: async (provinceId: string) => {
    const response = await axios.get<EsgooResponse>(URL_GET_WARD(provinceId))
    if (response.data.error === 0) {
      return response.data.data
    }
    return []
  }
}
