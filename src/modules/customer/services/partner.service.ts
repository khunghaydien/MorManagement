import { ListPartnersParams } from '../types'
import QueryString from 'query-string'
import ApiClientWithToken from '@/api/api'
import { PayloadUpdate } from '@/types'
import { cleanObject } from '@/utils'

export default {
  getListPartners(params: ListPartnersParams) {
    const queryString = QueryString.stringify(cleanObject(params))
    const url = `/partners${queryString ? `?${queryString}` : ''}`
    return ApiClientWithToken.get(url)
  },
  createPartner(requestBody: any) {
    return ApiClientWithToken.post('/partners', requestBody)
  },
  deletePartner(id: string) {
    return ApiClientWithToken.delete(`/partners/${id}`)
  },
  getPartner(id: string) {
    return ApiClientWithToken.get(`/partners/${id}`)
  },
  updatePartner({ id, requestBody }: PayloadUpdate) {
    return ApiClientWithToken.put(`/partners/${id}`, requestBody)
  },
}
