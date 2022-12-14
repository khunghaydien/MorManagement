import { alertError, alertSuccess, commonErrorAlert } from '@/reducer/screen'
import { RootState } from '@/store'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import i18next from 'i18next'
import { ProjectService } from '../services'
import { IListProjectsParams, ProjectState } from '../types'
import { HttpStatusCode } from '@/api/types'

const initialState: ProjectState = {
  projectList: [],
  projectsTotalElements: 0,
}
export const deleteProject = createAsyncThunk(
  'project/deleteProject',
  async (idProject: string, { rejectWithValue }) => {
    try {
      const res = await ProjectService.deleteProject(idProject)
      return res
    } catch (err: any) {
      if (!err) {
        throw err
      }
      return rejectWithValue(err)
    }
  }
)
export const getListProjects = createAsyncThunk(
  'project/getListProjects',
  async (params: IListProjectsParams, { rejectWithValue }) => {
    try {
      const res = await ProjectService.getListProjects(params)
      return res
    } catch (err: any) {
      if (!err) {
        throw err
      }
      return rejectWithValue(err)
    }
  }
)

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // getListProjects
    builder.addCase(getListProjects.pending, state => { })
    builder.addCase(getListProjects.fulfilled, (state, { payload }) => {
      let { data, status } = payload
      if (status === HttpStatusCode.OK) {
        state.projectList = data?.content
        state.projectsTotalElements = data?.totalElements
      }
    })
    builder.addCase(getListProjects.rejected, (state, action) => { })
  },
})

export const selectProject = (state: RootState) => state['project']

export default projectSlice.reducer
