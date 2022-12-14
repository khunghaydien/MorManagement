import ConditionalRender from '@/components/ConditionalRender'
import ModalDeleteRecords from '@/components/modal/ModalDeleteRecords'
import ItemRowTableV2 from '@/components/table/ItemRowTableV2'
import TablePaginationShare from '@/components/table/TablePaginationShare'
import TableShare from '@/components/table/TableShare'
import { LangConstant, PathConstant, TableConstant } from '@/const'
import { AuthState, selectAuth } from '@/reducer/auth'
import { ISkillSet, TableHeaderOption } from '@/types'
import { formatDate } from '@/utils'
import { Box, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { cloneDeep } from 'lodash'
import { ChangeEvent, Dispatch, SetStateAction, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import StringFormat from 'string-format'
import { PartnerState, selectPartner } from '../../reducer/partner'
import { ListPartnersParams } from '../../types'
import { convertDataStatus } from '../customer-list'

const partnerListHeadCells: TableHeaderOption[] = [
  {
    id: 'id',
    align: 'left',
    disablePadding: true,
    label: 'Partner Code',
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Partner Name',
  },
  {
    id: 'strength',
    align: 'left',
    disablePadding: true,
    label: 'Strength',
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
    label: 'Contact Name',
  },
  {
    id: 'collaborationStartDate',
    align: 'center',
    disablePadding: true,
    label: 'Collaboration Start Date',
    useSort: true,
    orderBy: 'desc',
  },
  {
    id: 'priority',
    align: 'center',
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

export function createData(item: any) {
  return {
    id: item.id,
    name: item.name,
    strength: item.strengths
      .map((skillSet: ISkillSet) => skillSet.name)
      .join(', '),
    branch: item.branch.name,
    contactName: item.contactName,
    collaborationStartDate: formatDate(item.collaborationStartDate),
    priority: item.priority.id,
    status: convertDataStatus(item.status),
    action: [{ type: 'delete' }],
  }
}

interface TablePartnerListProps {
  params: ListPartnersParams
  listChecked: string[]
  setListChecked: Dispatch<SetStateAction<string[]>>
  onDeletePartner: (idPartner: string) => void
  setParams: Dispatch<SetStateAction<ListPartnersParams>>
}
interface IShowModalDeletePartner {
  status: boolean
  idPartner: string
}

const TablePartnerList = ({
  params,
  listChecked,
  setListChecked,
  setParams,
  onDeletePartner,
}: TablePartnerListProps) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const { t: i18Customer } = useTranslation(LangConstant.NS_CUSTOMER)

  const { total, listPartners }: PartnerState = useSelector(selectPartner)
  const { permissions }: AuthState = useSelector(selectAuth)

  const [showModalDeletePartner, setShowModalDeletePartner] =
    useState<IShowModalDeletePartner>({
      status: false,
      idPartner: '',
    })

  const rows = useMemo(() => {
    return listPartners.map((item: any) => createData(item))
  }, [listPartners])

  const [headCells, setHeadCells] = useState(() => {
    const newPartnerListHeadCells = cloneDeep(partnerListHeadCells)
    return permissions.usePartnerDelete
      ? partnerListHeadCells
      : newPartnerListHeadCells.splice(0, newPartnerListHeadCells.length - 1)
  })

  const handleSelectAll = (_: any, newChecked: Array<any>) => {
    setListChecked(newChecked)
  }

  const handleSingleSelect = (id: string) => {
    const newListChecked = [...listChecked]
    const indexById = listChecked.findIndex(_id => _id === id)
    if (indexById !== -1) {
      newListChecked.splice(indexById, 1)
    } else {
      newListChecked.push(id)
    }
    setListChecked(newListChecked)
  }

  const handlePageChange = (_: any, newPage: number) => {
    setParams(prev => ({
      ...prev,
      pageNum: newPage,
    }))
    setListChecked([])
  }

  const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newLimit = parseInt(event.target.value, 10)
    setListChecked([])
    setParams(prev => ({
      ...prev,
      pageNum: 1,
      pageSize: newLimit,
    }))
  }

  const handleNavigateToDetailPage = (partnerId: string) => {
    const url = StringFormat(
      PathConstant.CUSTOMER_PARTNER_DETAIL_FORMAT,
      partnerId
    )
    navigate(url)
  }

  const handleDeletePartner = (id: string) => {
    setShowModalDeletePartner({
      status: true,
      idPartner: id,
    })
  }

  const handleCloseModalDeletePartner = () => {
    setShowModalDeletePartner({
      status: false,
      idPartner: '',
    })
  }

  const handleSubmitModalDeletePartner = () => {
    onDeletePartner(showModalDeletePartner.idPartner)
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

  return (
    <Box className={classes.rootTablePartnerList}>
      <ModalDeleteRecords
        titleMessage={i18Customer('TXT_DELETE_PARTNER')}
        subMessage={StringFormat(
          i18Customer('MSG_CONFIRM_PARTNER_DELETE'),
          showModalDeletePartner.idPartner
        )}
        open={showModalDeletePartner.status}
        onClose={handleCloseModalDeletePartner}
        onSubmit={handleSubmitModalDeletePartner}
      />
      <TableShare
        keyName={'id'}
        isShowCheckbox={false}
        headCells={headCells}
        selected={listChecked}
        rows={rows}
        onSelectAllClick={handleSelectAll}
        onSortChange={handleSortChange}
        childComp={(row: any) => (
          <ItemRowTableV2
            row={row}
            key={`table-checkbox-${row['id']}`}
            isShowCheckbox={false}
            uuId={row['id']}
            headCells={headCells}
            selected={listChecked}
            keyName={'id'}
            onClickItem={handleSingleSelect}
            onClickDetail={handleNavigateToDetailPage}
            onClickDelete={handleDeletePartner}
          />
        )}
      />
      <ConditionalRender conditional={!!rows.length} fallback={''}>
        <TablePaginationShare
          rowsPerPageOptions={TableConstant.ROWS_PER_PAGE_OPTIONS}
          totalElements={total}
          pageLimit={params.pageSize as number}
          currentPage={params.pageNum as number}
          onChangePage={handlePageChange}
          onChangeLimitPage={handleRowsPerPageChange}
        />
      </ConditionalRender>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  rootTablePartnerList: {
    marginTop: theme.spacing(4),
  },
}))

TablePartnerList.defaultProps = {}

export default TablePartnerList
