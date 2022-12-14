import ApiClientWithToken from '@/api/api'
import { cleanObject } from '@/utils'
import QueryString from 'query-string'
import { ICustomer, IListCustomersParams, Optional } from '../types'

export default {
  getListCustomers(params: IListCustomersParams) {
    const queryString = QueryString.stringify(cleanObject(params))
    const url = `/customers${queryString ? `?${queryString}` : ''}`
    return ApiClientWithToken.get(url)
  },
  deleteCustomers(id: string) {
    return ApiClientWithToken.delete(`/customers/${id}`)
  },
  getCustomerDetail(customerId: string) {
    return ApiClientWithToken.get(`/customers/${customerId}`)
  },
  createCustomer(payload: Optional<ICustomer>) {
    return ApiClientWithToken.post(`/customers`, payload)
  },

  updateCustomer(payload: { customerId: string; data: Optional<ICustomer> }) {
    return ApiClientWithToken.put(
      `/customers/${payload.customerId}`,
      payload.data
    )
  },
}
