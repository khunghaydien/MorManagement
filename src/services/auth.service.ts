import ApiClientWithToken, { ApiClient } from '@/api/api'
import { LoginFormControls, LoginApiResponse } from '@/types'

export default {
  login(requestBody: LoginFormControls): Promise<LoginApiResponse> {
    const url = '/login'
    return ApiClient.post(url, requestBody)
  },

  getSelfInfo() {
    return ApiClientWithToken.get('/info')
  },

  logout() {
    return ApiClientWithToken.post('/logout')
  }
}
