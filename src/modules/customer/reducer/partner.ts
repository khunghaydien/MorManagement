import { alertError, alertSuccess } from '@/reducer/screen'
import { RootState } from '@/store'
import { PayloadUpdate } from '@/types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import i18next from 'i18next'
import { PartnerService } from '../services'
import { ListPartnersParams } from '../types'

export interface PartnerState {
  listPartners: any[]
  isListPartnersLoading: boolean
  total: number
}

const initialState: PartnerState = {
  listPartners: [],
  isListPartnersLoading: false,
  total: 0,
}

export const getListPartners = createAsyncThunk(
  'partner/getListPartners',
  async (params: ListPartnersParams, { rejectWithValue }) => {
    try {
      const res = await PartnerService.getListPartners(params)
      return res
    } catch (err: any) {
      if (!err) {
        throw err
      }
      return rejectWithValue(err)
    }
  }
)

export const deletePartner = createAsyncThunk(
  'partner/deletePartner',
  async (idPartner: string, { rejectWithValue }) => {
    try {
      const res = await PartnerService.deletePartner(idPartner)
      return res
    } catch (err: any) {
      if (!err) {
        throw err
      }
      return rejectWithValue(err)
    }
  }
)

export const createPartner = createAsyncThunk(
  'partner/createPartner',
  async (requestBody: any, { rejectWithValue, dispatch }) => {
    try {
      const res = await PartnerService.createPartner(requestBody)
      dispatch(
        alertSuccess({
          message: i18next.t('customer:MSG_CREATE_PARTNER_SUCCESS', {
            partnerName: requestBody?.name,
          }),
        })
      )
      return res
    } catch (err: any) {
      dispatch(
        alertError({
          message: 'Failed to create a new partner, please try again.',
        })
      )
      if (!err) {
        throw err
      }
      return rejectWithValue(err)
    }
  }
)

export const updatePartner = createAsyncThunk(
  'partner/updatePartner',
  async ({ id, requestBody }: PayloadUpdate, { rejectWithValue, dispatch }) => {
    try {
      const res = await PartnerService.updatePartner({ id, requestBody })
      dispatch(
        alertSuccess({
          message: i18next.t('customer:MSG_UPDATE_PARTNER_SUCCESS', {
            partnerId: id,
          }),
        })
      )
      return res
    } catch (err: any) {
      dispatch(
        alertError({
          message: 'Update failed, please try again',
        })
      )
      if (!err) {
        throw err
      }
      return rejectWithValue(err)
    }
  }
)

export const partnerSlice = createSlice({
  name: 'partner',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getListPartners.pending, state => {
      state.isListPartnersLoading = true
    }),
      builder.addCase(getListPartners.fulfilled, (state, { payload }) => {
        state.isListPartnersLoading = true
        state.listPartners = payload.data.content
        state.total = payload.data.totalElements
      }),
      builder.addCase(getListPartners.rejected, state => {
        state.isListPartnersLoading = true
      })
  },
})

export const selectPartner = (state: RootState) => state['partner']

export default partnerSlice.reducer
