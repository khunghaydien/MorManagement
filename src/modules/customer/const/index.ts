import { IContract, ICustomer, IStatusConstant } from '../types'

export const CUSTOMER_REQUEST_KEY: { [key: string]: keyof ICustomer } = {
  SIGN_NDA: 'signNda',
  NAME: 'name',
  BRANCH_ID: 'branchId',
  PRIORITY: 'priority',
  SERVICE_ID: 'serviceId',
  COLLABORATION_START_DATE: 'collaborationStartDate',
  STATUS: 'status',
  SCALE: 'scale',
  WEBSITE: 'website',
  CONTACT_NAME: 'contactName',
  CONTACT_PHONE_NUMBER: 'contactPhoneNumber',
  CONTACT_ADDRESS: 'contactAddress',
  CONTACT_NOTE: 'contactNote',
  CONTACT_PERSON_ID: 'contactPersonId',
}

export const CONTRACT_REQUEST_KEY: { [key: string]: keyof IContract } = {
  ID: 'id',
  CODE: 'code',
  TYPE: 'type',
  GROUP: 'group',
  VALUE: 'value',
  EXPECTED_REVENUE: 'expectedRevenue',
  STATUS: 'status',
  START_DATE: 'startDate',
  END_DATE: 'endDate',
  NOTE: 'note',
}

export const CUSTOMER_STATUS_TYPE = {
  DRAFT: 1,
  IN_CONTACT: 2,
  CONFIRM_COLLABORATION: 3,
  SIGN_CONTRACT: 4,
  CONTRACT_EXPIRED: 5,
  END_COLLABORATION: 6,
  OTHER: 7,
}

export const CUSTOMER_STATUS: { [key: number]: IStatusConstant } = {
  [CUSTOMER_STATUS_TYPE.DRAFT]: {
    type: 1,
    label: 'Draft',
    status: 'draft',
  },
  [CUSTOMER_STATUS_TYPE.IN_CONTACT]: {
    type: 2,
    label: 'In Contact',
    status: 'success',
  },
  [CUSTOMER_STATUS_TYPE.CONFIRM_COLLABORATION]: {
    type: 3,
    label: 'Confirm Collaboration',
    status: 'inProgress',
  },
  [CUSTOMER_STATUS_TYPE.SIGN_CONTRACT]: {
    type: 4,
    label: 'Sign Contract',
    status: 'success',
  },
  [CUSTOMER_STATUS_TYPE.CONTRACT_EXPIRED]: {
    type: 5,
    label: 'Contract Expired',
    status: 'error',
  },
  [CUSTOMER_STATUS_TYPE.END_COLLABORATION]: {
    type: 6,
    label: 'End Collaboration',
    status: 'success',
  },
  [CUSTOMER_STATUS_TYPE.OTHER]: {
    type: 7,
    label: 'Other',
    status: 'draft',
  },
}

export const CONTRACT_STATUS_TYPE = {
  NOTIFIED: 1,
  FILE_RECEIVED: 2,
  CONFIRM_FINAL_VERSION: 3,
  SENT_TO_CUSTOMER: 4,
  HARDCOPY_RECEIVED: 5,
}

export const CONTRACT_STATUS: { [key: number]: IStatusConstant } = {
  [CONTRACT_STATUS_TYPE.NOTIFIED]: {
    type: 1,
    label: 'Notified',
    status: 'draft',
  },
  [CONTRACT_STATUS_TYPE.FILE_RECEIVED]: {
    type: 2,
    label: 'File Received',
    status: 'inProgress',
  },
  [CONTRACT_STATUS_TYPE.CONFIRM_FINAL_VERSION]: {
    type: 3,
    label: 'Confirm Final Version',
    status: 'inProgress',
  },
  [CONTRACT_STATUS_TYPE.SENT_TO_CUSTOMER]: {
    type: 4,
    label: 'Sent To Customer',
    status: 'inProgress',
  },
  [CONTRACT_STATUS_TYPE.HARDCOPY_RECEIVED]: {
    type: 5,
    label: 'Hardcopy Received',
    status: 'success',
  },
}

export const PROJECT_STATUS_TYPE = {
  NOT_STARTED: 1,
  IN_PROGRESS: 2,
  COMPLETED: 3,
  CANCELLED: 4,
}

export const PROJECT_STATUS: { [key: number]: IStatusConstant } = {
  [PROJECT_STATUS_TYPE.NOT_STARTED]: {
    type: 1,
    label: 'Not Started',
    status: 'draft',
  },
  [PROJECT_STATUS_TYPE.IN_PROGRESS]: {
    type: 2,
    label: 'In Progress',
    status: 'inProgess',
  },
  [PROJECT_STATUS_TYPE.COMPLETED]: {
    type: 3,
    label: 'Completed',
    status: 'success',
  },
  [PROJECT_STATUS_TYPE.CANCELLED]: {
    type: 4,
    label: 'Cancel',
    status: 'error',
  },
}

export const PRIORITY_STATUS = {
  low: 1,
  medium: 2,
  high: 3,
}
