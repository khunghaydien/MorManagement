import BranchService from '@/services/common.service'
import { RootState } from '@/store'
import {
  Branch,
  DivisionType,
  MasterCommonType,
  OptionItem,
  SkillSet,
} from '@/types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface CommonState {
  listBranches: OptionItem[]
  isLoading: boolean
  contractGroups: OptionItem[]
  contractTypes: OptionItem[]
  divisions: DivisionType[]
  priorities: OptionItem[]
  skillSets: SkillSet[]
  listStatus: OptionItem[]
}

const initialState: CommonState = {
  listBranches: [],
  isLoading: false,
  contractGroups: [],
  contractTypes: [],
  divisions: [],
  priorities: [],
  skillSets: [],
  listStatus: [],
}

export const getBranchList = createAsyncThunk(
  'branch/getBranchList',
  async (_, { rejectWithValue }) => {
    try {
      const res = await BranchService.getBranchList()
      return res
    } catch (err: any) {
      if (!err) {
        throw err
      }
      return rejectWithValue(err)
    }
  }
)

export const getContractGroups = createAsyncThunk(
  'branch/getContractGroups',
  async (_, { rejectWithValue }) => {
    try {
      const res = await BranchService.getContractGroups()
      return res
    } catch (err: any) {
      if (!err) {
        throw err
      }
      return rejectWithValue(err)
    }
  }
)

export const getContractTypes = createAsyncThunk(
  'branch/getContractTypes',
  async (_, { rejectWithValue }) => {
    try {
      const res = await BranchService.getContractTypes()
      return res
    } catch (err: any) {
      if (!err) {
        throw err
      }
      return rejectWithValue(err)
    }
  }
)

export const getDivisions = createAsyncThunk(
  'branch/getDivisions',
  async (_, { rejectWithValue }) => {
    try {
      const res = await BranchService.getDivisions()
      return res
    } catch (err: any) {
      if (!err) {
        throw err
      }
      return rejectWithValue(err)
    }
  }
)

export const getSkillSets = createAsyncThunk(
  'branch/getSkillSets',
  async (_, { rejectWithValue }) => {
    try {
      const res = await BranchService.getSkillSets()
      return res
    } catch (err: any) {
      if (!err) {
        throw err
      }
      return rejectWithValue(err)
    }
  }
)

export const getStatus = createAsyncThunk(
  'branch/getStatus',
  async (_, { rejectWithValue }) => {
    try {
      const res = await BranchService.getStatus()
      return res
    } catch (err: any) {
      if (!err) {
        throw err
      }
      return rejectWithValue(err)
    }
  }
)

export const getPriorities = createAsyncThunk(
  'branch/getPriorities',
  async (_, { rejectWithValue }) => {
    try {
      const res = await BranchService.getPriorities()
      return res
    } catch (err: any) {
      if (!err) {
        throw err
      }
      return rejectWithValue(err)
    }
  }
)

export const branchSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getBranchList.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getBranchList.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.listBranches = payload.data.map((item: Branch) => ({
        ...item,
        label: item.name,
        value: item.id,
      }))
    })
    builder.addCase(getBranchList.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(getContractGroups.fulfilled, (state, { payload }) => {
      state.contractGroups = payload.data.map((item: MasterCommonType) => ({
        ...item,
        label: item.name,
        value: item.id,
      }))
    })
    builder.addCase(getContractTypes.fulfilled, (state, { payload }) => {
      state.contractTypes = payload.data.map((item: MasterCommonType) => ({
        ...item,
        label: item.name,
        value: item.id,
      }))
    })
    builder.addCase(getDivisions.fulfilled, (state, { payload }) => {
      state.divisions = payload.data
    })
    builder.addCase(getPriorities.fulfilled, (state, { payload }) => {
      state.priorities = payload.data.map((item: MasterCommonType) => ({
        ...item,
        label: item.name,
        value: item.id,
      }))
    })
    builder.addCase(getSkillSets.fulfilled, (state, { payload }) => {
      state.skillSets = payload.data
    })
    builder.addCase(getStatus.fulfilled, (state, { payload }) => {
      state.listStatus = payload.data.map((item: MasterCommonType) => ({
        ...item,
        label: item.name,
        value: item.id,
      }))
    })
  },
})

export const commonSelector = (state: RootState) => state['common']

export default branchSlice.reducer
