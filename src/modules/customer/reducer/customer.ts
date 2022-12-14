import { alertError, alertSuccess, commonErrorAlert } from '@/reducer/screen'
import { RootState } from '@/store'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import i18next from 'i18next'
import { CustomerService } from '../services'
import { ICustomer, IListCustomersParams, Optional } from '../types'

export interface CustomerState {
  customerList: any
}

const initialState: CustomerState = {
  customerList: [],
}

export const getListCustomers = createAsyncThunk(
  'customer/getListCustomers',
  async (params: IListCustomersParams, { rejectWithValue }) => {
    try {
      const res = await CustomerService.getListCustomers(params)
      return res
    } catch (err: any) {
      if (!err) {
        throw err
      }
      return rejectWithValue(err)
    }
  }
)

export const deleteCustomers = createAsyncThunk(
  'customer/deleteCustomers',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await CustomerService.deleteCustomers(id)
      return res
    } catch (err: any) {
      if (!err) {
        throw err
      }
      return rejectWithValue(err)
    }
  }
)

export const getCustomerDetail = createAsyncThunk(
  'customer/getCustomerDetail',
  async (customerId: string, { rejectWithValue }) => {
    try {
      const res = await CustomerService.getCustomerDetail(customerId)
      return res
    } catch (err: any) {
      if (!err) {
        throw err
      }
      return rejectWithValue(err)
    }
  }
)

export const createCustomer = createAsyncThunk(
  'customer/createCustomer',
  async (payload: Optional<ICustomer>, { rejectWithValue, dispatch }) => {
    try {
      const res = await CustomerService.createCustomer(payload)
      dispatch(
        alertSuccess({
          message: i18next.t('customer:MSG_CREATE_CUSTOMER_SUCCESS'),
        })
      )
      return res
    } catch (err: any) {
      dispatch(
        alertError({
          message: 'Failed to create a new customer, please try again.',
        })
      )
      if (!err) {
        throw err
      }
      return rejectWithValue(err)
    }
  }
)

export const updateCustomer = createAsyncThunk(
  'customer/updateCustomer',
  async (
    payload: { customerId: string; data: Optional<ICustomer> },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await CustomerService.updateCustomer(payload)
      dispatch(
        alertSuccess({
          message: i18next.t('customer:MSG_UPDATE_CUSTOMER_SUCCESS', {
            customerId: payload.customerId,
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

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // getListCustomers
    builder.addCase(getListCustomers.pending, state => {
      return { ...state }
    })
    builder.addCase(getListCustomers.fulfilled, (state, { payload }) => {
      let { data, status } = payload
      if (status) {
        state.customerList = data
      }
    })
    builder.addCase(getListCustomers.rejected, (state, action) => {
      return { ...state }
    })
    // getCustomerDetail
    builder.addCase(getCustomerDetail.pending, (state, { payload }) => {})
    builder.addCase(getCustomerDetail.fulfilled, (state, { payload }) => {})
    builder.addCase(getCustomerDetail.rejected, (state, { payload }) => {})
    // deleteCustomer
    builder.addCase(deleteCustomers.pending, (state, { payload }) => {})
    builder.addCase(deleteCustomers.fulfilled, (state, { payload }) => {})
    builder.addCase(deleteCustomers.rejected, (state, { payload }) => {})
    // create new customer
    builder.addCase(createCustomer.fulfilled, (state, { payload }) => {})
    builder.addCase(createCustomer.rejected, (state, { payload }) => {})
    // update new customer
    builder.addCase(updateCustomer.fulfilled, (state, { payload }) => {})
    builder.addCase(updateCustomer.rejected, (state, { payload }) => {})
  },
})

export const selectCustomer = (state: RootState) => state['customer']

export default customerSlice.reducer
