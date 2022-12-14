import { TableHeaderOption } from '@/types'

export const customerListHeadCells: TableHeaderOption[] = [
  {
    id: 'id',
    align: 'left',
    disablePadding: true,
    label: 'Customer code',
  },
  {
    id: 'customerName',
    align: 'left',
    disablePadding: true,
    label: 'Customer name',
  },
  {
    id: 'service',
    align: 'left',
    disablePadding: true,
    label: 'Service',
  },
  {
    id: 'branch',
    align: 'left',
    disablePadding: true,
    label: 'Branch',
  },
  {
    id: 'contactName',
    align: 'left',
    disablePadding: true,
    label: 'Contact name',
  },
  {
    id: 'collaboration',
    align: 'center',
    disablePadding: true,
    label: 'Collaboration Start date',
    orderBy: 'desc',
    useSort: true,
  },
  {
    id: 'priority',
    align: 'left',
    disablePadding: true,
    label: 'Priority',
  },
  {
    id: 'status',
    align: 'center',
    disablePadding: true,
    label: 'Status',
  },
  {
    id: 'action',
    align: 'center',
    disablePadding: true,
    label: 'Action',
  },
]
