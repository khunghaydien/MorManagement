import ButtonAddPlus from '@/components/buttons/ButtonAddPlus'
import ConditionalRender from '@/components/ConditionalRender'
import CardForm from '@/components/Form/CardForm'
import ModalAddNewContract from '@/components/modal/ModalAddNewContract'
import ItemRowTable from '@/components/table/ItemRowTableV2'
import TablePaginationShare from '@/components/table/TablePaginationShare'
import TableShare from '@/components/table/TableShare'
import { LangConstant, TableConstant } from '@/const'
import { IContract, Optional } from '@/modules/customer/types'
import {
  commonSelector,
  CommonState,
  getContractGroups,
  getContractTypes,
} from '@/reducer/common'
import { AppDispatch } from '@/store'
import { EventInput, OptionItem, TableHeaderOption } from '@/types'
import { formatDate, formatCurrency } from '@/utils'
import { Box, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { CONTRACT_STATUS } from '@/modules/customer/const'
import { initialContract } from './hooks/useFetchCustomerDetail'

const contactHeadCells: TableHeaderOption[] = [
  {
    id: 'contactNumber',
    align: 'left',
    disablePadding: true,
    label: 'Contract number',
  },
  {
    id: 'contractType',
    align: 'left',
    disablePadding: true,
    label: 'Contract type',
  },
  {
    id: 'contractGroup',
    align: 'left',
    disablePadding: true,
    label: 'Contract group',
  },
  {
    id: 'startDate',
    align: 'left',
    disablePadding: true,
    label: 'Start Date',
  },
  {
    id: 'endDate',
    align: 'left',
    disablePadding: true,
    label: 'End Date',
  },
  {
    id: 'value',
    align: 'left',
    disablePadding: true,
    label: 'Value',
  },
  {
    id: 'expectedRevenue',
    align: 'left',
    disablePadding: true,
    label: 'Expected revenue',
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

interface ListOptionsFilterContracts {
  contractTypes: OptionItem[]
  contractGroups: OptionItem[]
  listStatus: OptionItem[]
}

export function createData(
  item: any,
  { contractTypes, contractGroups, listStatus }: ListOptionsFilterContracts
) {
  return {
    id: item.id,
    contactNumber: item.code,
    contractType: contractTypes.find(
      (contract: OptionItem) => contract.value === item.type
    )?.label,
    contractGroup: contractGroups.find(
      (group: OptionItem) => group.value === item.group
    )?.label,
    startDate: formatDate(new Date(item.startDate)),
    endDate: formatDate(new Date(item.endDate)),
    value: formatCurrency(+item.value, {}),
    expectedRevenue: formatCurrency(+item.expectedRevenue, {}),
    status: item.status,
    action: [{ type: 'delete' }],
  }
}

interface IProps {
  contracts: Optional<IContract>[]
  setContracts: Dispatch<SetStateAction<Optional<IContract>[]>>
}

function ContactTable({ contracts, setContracts }: IProps) {
  const { t: i18Customer } = useTranslation(LangConstant.NS_CUSTOMER)
  const classes = useStyles()
  const [contract, setContract] = useState<Optional<IContract>>(initialContract)
  const [isViewContract, setIsViewContract] = useState<boolean>(false)

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [page, setPage] = useState(TableConstant.PAGE_CURRENT_DEFAULT)
  const [pageLimit, setPageLimit] = useState(TableConstant.LIMIT_DEFAULT)
  const { contractTypes, contractGroups, listStatus }: CommonState =
    useSelector(commonSelector)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (!contractGroups.length) {
      dispatch(getContractGroups())
    }
    if (!contractTypes.length) {
      dispatch(getContractTypes())
    }
  }, [])

  const dataShow = useMemo(() => {
    if (!contracts || !contracts.length) return []
    const _contracts = JSON.parse(JSON.stringify(contracts))
    const result = _contracts.map((contract: IContract) =>
      createData(contract, { contractGroups, contractTypes, listStatus })
    )
    return result
  }, [contracts, pageLimit, page])

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: EventInput) => {
    setPageLimit(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleAddNewContract = (newContract: Optional<IContract>) => {
    const _newContract = {
      ...newContract,
      status: CONTRACT_STATUS[newContract.status as number],
    }

    if (isViewContract) {
      const contractIndex = contracts.findIndex(
        (contract: Optional<IContract>) => contract.id === _newContract.id
      )
      if (contractIndex > -1) {
        const _contracts = [...contracts]
        _contracts.splice(contractIndex, 1, _newContract)
        setContracts([..._contracts])
      }
    } else {
      setContracts(prev => [...prev, _newContract])
    }
  }

  const handleDeleteCustomer = async (customerId: string) => {
    const indexContractSelected = contracts.findIndex(
      (contract: Optional<IContract>) => contract.id === customerId
    )
    if (indexContractSelected > -1) {
      const _contracts = [...contracts]
      _contracts.splice(indexContractSelected, 1)
      setContracts(_contracts)
    }
  }

  const handleClickDetail = (contractId: string) => {
    const contractSelected: any = contracts.find(
      (contract: Optional<IContract>) => contract.id === contractId
    )

    if (contractSelected) {
      const _contract = {
        ...contractSelected,
        status: contractSelected.status?.type,
      }
      setContract(_contract)
      setIsViewContract(true)
      setOpenModal(true)
    }
  }

  const openModalAddContract = () => {
    setIsViewContract(false)
    setOpenModal(true)
  }

  return (
    <CardForm title={i18Customer('TXT_CONTRACT_INFORMATION')}>
      <TableShare
        keyName={'id'}
        headCells={contactHeadCells}
        rows={dataShow}
        limitPage={pageLimit}
        pageCurrent={page}
        childComp={(row: any, index: number) => (
          <ItemRowTable
            headCells={contactHeadCells}
            row={row}
            key={`${row['id']}-${index}`}
            uuId={row['id']}
            onClickDelete={handleDeleteCustomer}
            onClickDetail={handleClickDetail}
          />
        )}
      />
      <Box className={clsx('space-between-root', classes.buttonWrapper)}>
        <ButtonAddPlus
          onClick={openModalAddContract}
          label={i18Customer('LB_ADD_NEW_CONTRACT')}
        ></ButtonAddPlus>
        <ConditionalRender conditional={!!contracts.length}>
          <TablePaginationShare
            rowsPerPageOptions={TableConstant.ROWS_PER_PAGE_OPTIONS}
            totalElements={dataShow.length}
            pageLimit={pageLimit}
            currentPage={page}
            onChangePage={handleChangePage}
            onChangeLimitPage={handleChangeRowsPerPage}
          />
        </ConditionalRender>
      </Box>

      <ConditionalRender conditional={openModal}>
        <ModalAddNewContract
          open={openModal}
          setOpen={setOpenModal}
          contracts={contracts}
          contract={contract}
          setContract={setContract}
          onSubmit={handleAddNewContract}
          isViewMode={isViewContract}
        />
      </ConditionalRender>
    </CardForm>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  buttonWrapper: {
    paddingTop: theme.spacing(1.5),
  },
}))

export default ContactTable
