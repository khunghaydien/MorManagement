import ApiClientWithToken from '@/api/api'
import { cleanObject } from '@/utils'
import { IListProjectsParams } from '../types'
import { queryStringParam } from '../utils'

export default {
  getListProjects(params: IListProjectsParams) {
    const queryString = queryStringParam(cleanObject(params))
    const url = `/projects${queryString ? `?${queryString}` : ''}`
    return ApiClientWithToken.get(url)
  },
  deleteProject(id: string) {
    return ApiClientWithToken.delete(`/projects/${id}`)
  },
}
