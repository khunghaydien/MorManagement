import { HttpStatusCode } from '@/api/types'
import { ApiConstant, AppConstant } from '@/const'
import AuthService from '@/services/auth.service'
import { RootState } from '@/store'
import { LoginFormControls, Permission, UserPermission } from '@/types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

export interface AuthState {
  token: string
  isLoginFetching: boolean
  permissions: UserPermission | any
}
const initialState: AuthState = {
  token: Cookies.get(ApiConstant.ACCESS_TOKEN) || '',
  isLoginFetching: false,
  permissions: {},
}

export const login = createAsyncThunk(
  'auth/login',
  async (requestBody: LoginFormControls, { rejectWithValue }) => {
    try {
      const res = await AuthService.login(requestBody)
      return res
    } catch (err: any) {
      if (!err) {
        throw err
      }
      return rejectWithValue(err)
    }
  }
)

export const getSelfInfo = createAsyncThunk(
  'auth/getSelfInfo',
  async (_, { rejectWithValue }) => {
    try {
      const res = await AuthService.getSelfInfo()
      return res
    } catch (err: any) {
      if (!err) {
        throw err
      }
      return rejectWithValue(err)
    }
  }
)
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const res = await AuthService.logout()
      if (res && res.status === HttpStatusCode.OK) {
        Cookies.remove(ApiConstant.ACCESS_TOKEN)
      }
      return res
    } catch (err: any) {
      if (!err) {
        throw err
      }
      return rejectWithValue(err)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.isLoginFetching = true
    }),
      builder.addCase(login.fulfilled, (state, { payload }) => {
        const { accessToken } = payload.data
        state.isLoginFetching = false
        state.token = accessToken
        Cookies.set(ApiConstant.ACCESS_TOKEN, accessToken)
      }),
      builder.addCase(login.rejected, state => {
        state.isLoginFetching = false
      })
    builder.addCase(getSelfInfo.fulfilled, (state, { payload }) => {
      const selfInfo = payload.data
      let permission = {}
      selfInfo.roles.forEach((role: any) => {
        permission = {
          ...permission,
          ...role.permission,
          useProjectList: true, // mock
        }
      })
      state.permissions = { useHomePage: true, ...permission }
    })
  },
})

export const selectAuth = (state: RootState) => state['auth']

export default authSlice.reducer
