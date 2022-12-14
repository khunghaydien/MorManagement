import { OptionItem } from '@/types'

export type ICustomer = {
  signNda: boolean
  name: string
  branchId: string
  priority: string
  serviceId: OptionItem[]
  collaborationStartDate: Date | null
  status: string
  scale: string
  website: string
  contactName: string
  contactPhoneNumber: string | null
  contactAddress: string | null
  contactNote: string | null
  contactPersonId: string[] | number[]
}

export interface ICustomerRequest {
  signNda: boolean
  name: string
  branchId: string
  priority: string
  serviceId: string[] | number[]
  collaborationStartDate: number | string
  status: number | string
  scale: string
  website: string
  contactName: string
  contactPhoneNumber: string
  contactAddress: string
  contactNote: string
  contactPersonId: string[] | number[]
}

export interface IContract {
  id?: string
  code: string
  type: OptionItem
  group: OptionItem
  startDate: Date | null
  endDate: Date | null
  status: OptionItem
  value: string
  expectedRevenue: string
  note: string
}

export interface IProject {
  endDate: Date | null
  id: string
  name: string
  startDate: Date | null
  status: any
  totalCurrentRevenue: number
  type: string
  technologies: ITechnology[]
}

export interface ITechnology {
  skillSetId: number | string | null
  skillSetGroupId: number | string | null
  name: string | null
  note: string | null
}

export type Optional<T> = {
  [K in keyof T]?: T[K]
}

export type ListPartnersParams = {
  branchId?: string
  collaborationStartDate?: string | number | null
  keyword?: string
  pageNum?: number
  pageSize?: number
  priority?: string | number | null
  skillSetIds?: any
  serviceIds?: any
  startDate?: Date | null
  endDate?: Date | null
  sort?: string
}

export type IListCustomersParams = {
  branchId?: string
  collaborationStartDate?: string | number | null
  keyword?: string
  pageNum?: number
  pageSize?: number
  priority?: string | number | null
  serviceId?: any
  skillSetIds?: any
  startDate?: Date | null
  endDate?: Date | null
  sort?: string
}

export type CommonEmitPayload = {
  value: any
  key: string
}

export interface IStatus {
  type: number
  name: string
}

export interface IStatusConstant {
  type: number
  label: string
  status: string
}

export interface ICustomerRequest {
  contract: IContract[]
  customer: ICustomer
}

export type ICustomerValid = {
  [key in keyof ICustomer]: {
    error: boolean
    errorMessage: string
  }
}

export type ContractValid = {
  [key in keyof IContract]: {
    error: boolean
    errorMessage: string
  }
}

export interface OptionItemResponse {
  id?: string | number
  name?: string
  note?: any
}

export interface IPartnerGeneralRes {
  branch: OptionItemResponse
  collaborationStartDate: number
  id: string
  scale: string
  status: OptionItemResponse
  name: string
  signNda: boolean
  strengths: any[]
  website: string
  noteStatus: any
  priority: OptionItemResponse
  person: any
}

export interface IPartnerContactRes {
  contactName: string
  contactAddress: string
  contactPhoneNumber: string
  contactNote: string
}

export interface PartnerDetailResponse {
  general: IPartnerGeneralRes
  contact: IPartnerContactRes
  contracts: any[]
  projects: any[]
}
