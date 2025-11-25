import { DataProvider, fetchUtils } from 'react-admin'
import { stringify } from 'query-string'
import http from '../utils/http'

const normalizeId = (data: any) => {
  if (!data) return data
  if (Array.isArray(data)) {
    return data.map((item) => ({ ...item, id: item.id || item._id }))
  }
  return { ...data, id: data.id || data._id }
}

const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  const { data } = await http.post('api/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return data.data.url
}

const convertFiltersToTurkraft = (filters: any): string => {
  if (!filters || Object.keys(filters).length === 0) return ''

  const queryParts: string[] = []
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

  const fieldMapping: { [key: string]: string } = {
    categoryId: 'category.id',
    categoryTypeId: 'categoryType.id',
    productName: 'name'
  }

  Object.keys(filters).forEach((key) => {
    const value = filters[key]

    if (value === null || value === undefined || value === '') return

    const fieldName = fieldMapping[key] || key

    if (key === 'q') {
      queryParts.push(`(name ~~ '%${value}%' or description ~~ '%${value}%')`)
      return
    }

    if (typeof value === 'string') {
      if (uuidRegex.test(value)) {
        queryParts.push(`${fieldName} : '${value}'`)
      } else {
        queryParts.push(`${fieldName} ~~ '%${value}%'`)
      }
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      queryParts.push(`${fieldName} : ${value}`)
    } else if (Array.isArray(value)) {
      const valString = value.map((v) => (typeof v === 'string' ? `'${v}'` : v)).join(', ')
      queryParts.push(`${fieldName} in [${valString}]`)
    }
  })

  return queryParts.join(' and ')
}

const processProductResources = async (resources: any[]) => {
  if (!resources || !Array.isArray(resources)) return []

  return Promise.all(
    resources.map(async (item) => {
      let imageUrl = item.url

      if (item.url && item.url.rawFile) {
        imageUrl = await uploadFile(item.url.rawFile)
      } else if (typeof item.url === 'object' && item.url.src) {
        imageUrl = item.url.src
      }

      return {
        id: item.url && item.url.rawFile ? null : item.id,
        name: item.name || 'product-image',
        url: imageUrl,
        type: 'image',
        isPrimary: Boolean(item.isPrimary)
      }
    })
  )
}

export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination || { page: 1, perPage: 10 }
    const { field, order } = params.sort || { field: 'id', order: 'DESC' }
    const turkraftFilter = convertFiltersToTurkraft(params.filter)

    const query: any = {
      page: page,
      size: perPage,
      sort: `${field},${order}`
    }
    if (turkraftFilter) {
      query.filter = turkraftFilter
    }

    let url = `api/${resource}`
    if (resource === 'order') {
      url = `api/order/admin`
    }
    url = `${url}?${stringify(query)}`
    const { data } = await http.get(url)

    const apiResponse = data.data

    if (Array.isArray(apiResponse)) {
      const start = (page - 1) * perPage
      const end = start + perPage
      return {
        data: normalizeId(apiResponse.slice(start, end)),
        total: apiResponse.length
      }
    } else if (apiResponse && apiResponse.result) {
      return {
        data: normalizeId(apiResponse.result),
        total: apiResponse.meta.total
      }
    }

    return { data: [], total: 0 }
  },

  getOne: async (resource, params) => {
    const { data } = await http.get(`api/${resource}/${params.id}`)
    const normalizedData = normalizeId(data.data)
    if (resource === 'products' && normalizedData.productResources) {
      normalizedData.productResources = normalizedData.productResources.map((r: any) => ({
        ...r,
        url: { src: r.url, title: r.name }
      }))
    }
    return { data: normalizedData }
  },

  getMany: async (resource, params) => {
    const ids = params.ids.map((id) => `'${id}'`).join(', ')
    const filter = `id in [${ids}]`
    const query = { filter }

    const { data } = await http.get(`api/${resource}?${stringify(query)}`)
    const apiResponse = data.data

    if (Array.isArray(apiResponse)) {
      return { data: normalizeId(apiResponse) }
    } else if (apiResponse && apiResponse.result) {
      return { data: normalizeId(apiResponse.result) }
    }
    return { data: [] }
  },

  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination || { page: 1, perPage: 10 }
    const { field, order } = params.sort || { field: 'id', order: 'DESC' }

    const parentFilter = `${params.target} : '${params.id}'`
    const additionalFilter = convertFiltersToTurkraft(params.filter)
    const finalFilter = additionalFilter ? `(${parentFilter}) and (${additionalFilter})` : parentFilter

    const query = {
      page: page - 1,
      size: perPage,
      sort: `${field},${order}`,
      filter: finalFilter
    }

    const url = `api/${resource}?${stringify(query)}`
    const { data } = await http.get(url)

    const apiResponse = data.data
    if (Array.isArray(apiResponse)) {
      const start = (page - 1) * perPage
      const end = start + perPage
      return {
        data: normalizeId(apiResponse.slice(start, end)),
        total: apiResponse.length
      }
    } else if (apiResponse && apiResponse.result) {
      return {
        data: normalizeId(apiResponse.result),
        total: apiResponse.meta.total
      }
    }
    return { data: [], total: 0 }
  },

  create: async (resource, params) => {
    let payload = { ...params.data }

    if (resource === 'products' && payload.productResources) {
      const newResources = await processProductResources(payload.productResources)
      payload.productResources = newResources

      const primary = newResources.find((r: any) => r.isPrimary)
      if (primary) payload.thumbnail = primary.url
    }

    const { data } = await http.post(`api/${resource}`, payload)
    return { data: normalizeId(data.data) }
  },

  update: async (resource, params) => {
    let payload = { ...params.data }

    if (resource === 'products' && payload.productResources) {
      const newResources = await processProductResources(payload.productResources)
      payload.productResources = newResources
      const primary = newResources.find((r: any) => r.isPrimary)
      if (primary) payload.thumbnail = primary.url
    }

    const { data } = await http.put(`api/${resource}/${params.id}`, payload)
    return { data: normalizeId(data.data) }
  },

  updateMany: async (resource, params) => {
    const promises = params.ids.map((id) => http.put(`api/${resource}/${id}`, params.data))
    await Promise.all(promises)
    return { data: params.ids }
  },

  delete: async (resource, params) => {
    const { data } = await http.delete(`api/${resource}/${params.id}`)
    return { data: normalizeId(data.data) }
  },

  deleteMany: async (resource, params) => {
    const promises = params.ids.map((id) => http.delete(`api/${resource}/${id}`))
    await Promise.all(promises)
    return { data: params.ids }
  }
}
