import { ChangeEvent } from 'react'

export type TypographyStyles = {
  color?: string
  fontSize?: number
  fontWeight?: number
}

export type EventInput = ChangeEvent<HTMLInputElement>

export type LoginFormControls = {
  email: string
  password: string
}

export type LoginFormErrors = {
  emailError: boolean
  passwordError: boolean
}

export type LoginFormMessageErrors = {
  emailErrorMessage: string
  passwordErrorMessage: string
}

export type AlertInfo = {
  title: string
  message: string
  type: string
}

export type TokenApi = {
  accessToken: string
  refreshToken: string
}

export enum StatusBinary {
  TRUE = 1,
  FALSE = 0,
}

export type LoginApiResponse = {
  data: TokenApi
  hasError: boolean
  message: string | null
  status: number
}

export type NavItem = {
  id: number
  label: string
  pathNavigate: string
  pathRoot: string
}

export type OptionItem = {
  id?: number | string
  label?: string
  value?: number | string
  disabled?: boolean
}

export type Branch = {
  id: string
  name: string
  note: string
}

export type Permission = {
  id: number
  module: string
  usableFunction: string
}

export type UserPermission = {
  useHomePage?: boolean
  useCustomerCreate?: boolean
  useCustomerDelete?: boolean
  useCustomerDetail?: boolean
  useCustomerList?: boolean
  useCustomerUpdate?: boolean
  usePartnerCreate?: boolean
  usePartnerDelete?: boolean
  usePartnerDetail?: boolean
  usePartnerList?: boolean
  usePartnerUpdate?: boolean
  useProjectList?: boolean
}

export type MasterCommonType = {
  id: number
  name: string
}

export interface IDivision {
  branchId: string
  divisionId: string
  name: string
  note: string
}

export type DivisionType = {
  branches: Branch
  divisions: IDivision[]
}

export interface ISkillSet {
  name: string
  note: string
  skillSetGroupId: number | string
  skillSetId: number | string
}

export type SkillSet = {
  id: number
  name: string
  note: string
  skillSets: ISkillSet[]
}

export type ErrorResponse = {
  field: string
  message: string
}

export type PayloadUpdate = {
  id: string
  requestBody: any
}

export type CurrencyOptions = {
  style?: string
  currency?: string
}

export type OrderBy = 'desc' | 'asc'

export interface TableShareType {
  headCells: TableHeaderOption[]
  rows: Array<any>
  limitPage?: number
  isShowCheckbox?: boolean
  keyName: keyof TableHeaderOption
  pageCurrent?: number
  selected?: string[]
  childComp: any
  onSelectAllClick?: (
    event: ChangeEvent<HTMLInputElement>,
    newSelected: Array<any>
  ) => void
  onSortChange?: (index: number, orderBy: string | undefined) => void
}

export interface TableHeaderOption {
  id: string
  align: 'center' | 'inherit' | 'justify' | 'left' | 'right'
  disablePadding: boolean
  label: string
  useSort?: boolean
  orderBy?: OrderBy
}

export interface EnhancedTableProps {
  numSelected?: number
  onSelectAllClick?: (event: ChangeEvent<HTMLInputElement>) => void
  rowCount: number
  headCells: TableHeaderOption[]
  isShowCheckbox?: boolean
  onSortChange?: (index: number, orderBy: string | undefined) => void
}

export interface IStatus {
  status: string
  label: string
  type?: number
}

export interface IAction {
  type?: 'delete' | 'edit'
}

export interface ItemRowTableProps {
  row: any
  uuId: string
  isItemSelected?: boolean
  onClickItem?: (id: string) => void
  onClickDetail?: (id: string) => void
  onClickDelete?: (id: string) => void
  listCell?: any[]
  isShowCheckbox?: boolean
  keyName?: keyof TableHeaderOption
  selected?: string[]
  headCells?: TableHeaderOption[]
}

export interface DateRange {
  startDate: Date | null
  endDate: Date | null
}
