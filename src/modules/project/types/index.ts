export type IListProjectsParams = {
  branchId?: string
  divisionIds?: string
  endDate?: string
  keyword?: string
  pageNum?: number
  pageSize?: number
  startDate?: string
  technologyIds?: string[]
  type?: string
}
export interface IStatusConstant {
  type: number
  label: string
  status: string
}
export interface ProjectState {
  projectList: any[]
  projectsTotalElements: number
}

export interface IStatus {
  status: string
  label: string
  type?: number
}
