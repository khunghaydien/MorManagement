import { BASE_URL } from '@/const/api.const'
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { ApiConstant } from '../const'
import Cookies from 'js-cookie'

class HttpService {
  axios: any
  getCredential: any
  constructor(axios: any, getCredential: any) {
    this.axios = axios
    this.getCredential = getCredential
  }
  request(config?: AxiosRequestConfig) {
    config = this.getCredential(config)
    return this.axios.request(config)
  }
  get(url: string, config?: AxiosRequestConfig) {
    config = this.getCredential(config)
    return this.axios.get(url, config)
  }
  post(url: string, data?: any, config?: AxiosRequestConfig) {
    config = this.getCredential(config)
    return this.axios.post(url, data, config)
  }
  put(url: string, data?: any, config?: AxiosRequestConfig) {
    config = this.getCredential(config)
    return this.axios.put(url, data, config)
  }
  patch(url: string, data?: any, config?: AxiosRequestConfig) {
    config = this.getCredential(config)
    return this.axios.patch(url, data, config)
  }
  delete(url: string, config?: AxiosRequestConfig) {
    config = this.getCredential(config)
    return this.axios.delete(url, config)
  }
}

const defaultConfig = {
  baseURL: BASE_URL,
  headers: {
    ...ApiConstant.HEADER_DEFAULT,
  },
  timeout: ApiConstant.TIMEOUT,
}

const getCredentialWithAccessToken = (config: any = {}) => {
  const accessToken = Cookies.get(ApiConstant.ACCESS_TOKEN)
  if (!accessToken) return config
  return {
    ...config,
    headers: {
      ...(config.headers || {}),
      Authorization: 'Bearer ' + accessToken,
    },
  }
}

const configInterceptors = (axiosClient: any) => {
  axiosClient.interceptors.response.use(
    (res: AxiosResponse) => res.data,
    (res: any) => Promise.reject(res?.response?.data?.errors || [])
  )
  return axiosClient
}

const axiosClient = configInterceptors(axios.create(defaultConfig))

const ApiClientWithToken = new HttpService(
  axiosClient,
  getCredentialWithAccessToken
)

export const ApiClient = configInterceptors(axios.create(defaultConfig))

export default ApiClientWithToken
