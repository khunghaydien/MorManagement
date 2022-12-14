import { HttpStatusCode } from '@/api/types'
import CommonScreenLayout from '@/components/common/CommonScreenLayout'
import ConditionalRender from '@/components/ConditionalRender'
import ModalDeleteRecords from '@/components/modal/ModalDeleteRecords'
import ItemRowTableV2 from '@/components/table/ItemRowTableV2'
import TablePaginationShare from '@/components/table/TablePaginationShare'
import TableShare from '@/components/table/TableShare'
import { LangConstant, PathConstant, TableConstant } from '@/const'
import {
  CustomerState,
  deleteCustomers,
  getListCustomers,
  selectCustomer,
} from '@/modules/customer/reducer/customer'
import { updateAlert, updateLoading } from '@/reducer/screen'
import { AppDispatch } from '@/store'
import { Box, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import moment from 'moment'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import StringFormat from 'string-format'
import { CUSTOMER_STATUS } from '../../const'
import { IListCustomersParams } from '../../types'

import { customerListHeadCells } from './instance'
import HeaderCustomer from './HeaderCustomer'
import { AuthState, selectAuth } from '@/reducer/auth'
import { cloneDeep } from 'lodash'
import { IAction, IStatus } from '@/types'

export interface DataTableShare {
  id: string
  customerName: string
  service: string
  contactName: string
  collaboration: string
  priority: string
  branch: string
  status: IStatus
  action: IAction[]
}

interface IShowModalDeleteCustomer {
  status: boolean
  idCustomer: string
}

interface IServiceItem {
  skillSetId?: number
  skillSetGroupId?: number
  name: string
  note?: string
}

const convertKeyArrayToString = (listData: Array<IServiceItem>) => {
  let result = ''
  if (listData && listData.length > 0) {
    listData.forEach((item: IServiceItem, index: number) => {
      if (index === 0) {
        result = result.concat('', item.name)
      } else {
        result = result.concat(', ', item.name)
      }
    })
  }
  return result
}

export function convertDataStatus(item: any): IStatus {
  let _resultData = { status: '', label: '' }
  if (CUSTOMER_STATUS[item?.id]) {
    return CUSTOMER_STATUS[item?.id]
  }
  return _resultData
}
export function createData(item: any): DataTableShare {
  return {
    id: item.id,
    priority: item.priority?.id,
    status: convertDataStatus(item?.status),
    service: convertKeyArrayToString(item?.services),
    contactName: item.contactName,
    collaboration: moment(item.collaborationStartDate).format('YYYY/MM/DD'),
    customerName: item?.name,
    branch: item?.branch?.name,
    action: [{ type: 'delete' }],
  }
}

const CustomerList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const classes = useStyles()
  const { t: i18Customer } = useTranslation(LangConstant.NS_CUSTOMER)
  const { customerList }: CustomerState = useSelector(selectCustomer)
  const { permissions }: AuthState = useSelector(selectAuth)

  const [listSelected, setListSelected] = useState<string[]>([])
  const [rows, setRows] = useState<Array<any>>([])
  const [params, setParams] = useState<IListCustomersParams>({
    pageNum: TableConstant.PAGE_CURRENT_DEFAULT,
    pageSize: TableConstant.LIMIT_DEFAULT,
    keyword: '',
    branchId: '',
    collaborationStartDate: null,
    priority: null,
    serviceId: [],
    startDate: null,
    endDate: null,
    sort: 'desc',
  })
  const [showModalDeleteCustomers, setShowModalDeleteCustomers] =
    useState<IShowModalDeleteCustomer>({ status: false, idCustomer: '' })

  const [headCells, setHeadCells] = useState(() => {
    const newCustomerListHeadCells = cloneDeep(customerListHeadCells)
    return permissions.useCustomerDelete
      ? customerListHeadCells
      : newCustomerListHeadCells.splice(0, newCustomerListHeadCells.length - 1)
  })

  const getListCustomersApi = (params = {}) => {
    const _params: IListCustomersParams = {
      ...params,
    }
    if (_params.serviceId?.length) {
      _params.serviceId = _params.serviceId
        .map((skillSet: any) => skillSet.value)
        .join(',')
    }
    dispatch(updateLoading(true))
    dispatch(getListCustomers({ ..._params }))
      .unwrap()
      .finally(() => {
        dispatch(updateLoading(false))
      })
  }

  const handleChangePage = (_: unknown, newPage: number) => {
    setParams(prev => ({
      ...prev,
      pageNum: +newPage,
    }))
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setParams(prev => ({
      ...prev,
      pageNum: 1,
      pageSize: +event.target.value,
    }))
  }

  const handleSelectAllClick = (
    event: ChangeEvent<HTMLInputElement>,
    newSelected: Array<any>
  ) => {
    setListSelected(newSelected)
  }
  const handleClick = (id: string) => {
    const isChecked = listSelected.includes(id)
    let newSelected: string[] = []
    if (isChecked) {
      listSelected.filter(item => item === id)
    } else {
      newSelected = newSelected.concat(listSelected, id)
    }
    setListSelected(newSelected)
  }
  const handleClickDetail = (id: string) => {
    navigate(`${PathConstant.CUSTOMER_LIST}/${id}`)
  }
  const alertActionSuccess = updateAlert({
    isShowAlert: true,
    alertInfo: {
      type: 'success',
      message: StringFormat(
        i18Customer('MSG_DELETE_CUSTOMER_ITEM_SUCCESS'),
        showModalDeleteCustomers.idCustomer
      ),
    },
  })
  const onDeleteCustomer = () => {
    dispatch(updateLoading(true))
    dispatch(deleteCustomers(showModalDeleteCustomers.idCustomer))
      .unwrap()
      .then(() => {
        dispatch(alertActionSuccess)
        getListCustomersApi(params)
      })
    dispatch(updateLoading(false))
  }
  const handleCloseModalDeleteCustomers = () => {
    setShowModalDeleteCustomers({ status: false, idCustomer: '' })
  }

  const handleSubmitModalDeleteCustomers = () => {
    onDeleteCustomer()
  }

  const handleDeleteCustomer = async (customerId: string) => {
    setShowModalDeleteCustomers({ status: true, idCustomer: customerId })
  }

  const handleSortChange = (index: number, orderBy: string | undefined) => {
    const newHeadCells = [...headCells]
    const newOrderBy = orderBy === 'asc' ? 'desc' : 'asc'
    newHeadCells[index].orderBy = newOrderBy
    setHeadCells(newHeadCells)
    setParams(prev => ({
      ...prev,
      sort: newOrderBy,
    }))
  }

  useEffect(() => {
    getListCustomersApi(params)
  }, [params])

  useEffect(() => {
    if (customerList?.content) {
      setRows(customerList.content.map((item: any) => createData(item)))
    }
  }, [customerList?.content])

  return (
    <CommonScreenLayout title={i18Customer('TXT_CUSTOMER_MANAGEMENT_TITLE')}>
      <ModalDeleteRecords
        titleMessage={i18Customer('TXT_DELETE_CUSTOMER')}
        subMessage={StringFormat(
          i18Customer('MSG_CONFIRM_CUSTOMER_DELETE'),
          showModalDeleteCustomers.idCustomer
        )}
        open={showModalDeleteCustomers.status}
        onClose={handleCloseModalDeleteCustomers}
        onSubmit={handleSubmitModalDeleteCustomers}
      />
      <Box className={classes.rootCustomerList}>
        <HeaderCustomer listSelected={listSelected} setParams={setParams} />
        <TableShare
          keyName={'id'}
          headCells={headCells}
          rows={rows}
          limitPage={params.pageSize}
          pageCurrent={params.pageNum}
          isShowCheckbox={false}
          selected={listSelected}
          onSortChange={handleSortChange}
          childComp={(row: any) => (
            <ItemRowTableV2
              row={row}
              key={`table-checkbox-${row['id']}`}
              isShowCheckbox={false}
              uuId={row['id']}
              selected={listSelected}
              headCells={headCells}
              keyName={'id'}
              onClickItem={handleClick}
              onClickDelete={handleDeleteCustomer}
              onClickDetail={handleClickDetail}
            />
          )}
          onSelectAllClick={handleSelectAllClick}
        />
        <ConditionalRender conditional={!!rows.length} fallback={''}>
          <TablePaginationShare
            rowsPerPageOptions={TableConstant.ROWS_PER_PAGE_OPTIONS}
            totalElements={customerList?.totalElements}
            pageLimit={params.pageSize as number}
            currentPage={params.pageNum as number}
            onChangePage={handleChangePage}
            onChangeLimitPage={handleChangeRowsPerPage}
          />
        </ConditionalRender>
      </Box>
    </CommonScreenLayout>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  rootCustomerList: {
    width: '100%',
    marginBottom: '10px',
  },
}))
export default CustomerList
