import ButtonAddPlus from '@/components/buttons/ButtonAddPlus'
import ConditionalRender from '@/components/ConditionalRender'
import CardForm from '@/components/Form/CardForm'
import FormLayout from '@/components/Form/FormLayout'
import ModalAddNewContract from '@/components/modal/ModalAddNewContract'
import ItemRowTableV2 from '@/components/table/ItemRowTableV2'
import TableShare from '@/components/table/TableShare'
import { LangConstant } from '@/const'
import {
  commonSelector,
  CommonState,
  getContractGroups,
  getContractTypes,
} from '@/reducer/common'
import { AppDispatch } from '@/store'
import { OptionItem, TableHeaderOption } from '@/types'
import { formatCurrency, formatDate, uuid } from '@/utils'
import { makeStyles } from '@mui/styles'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { CONTRACT_STATUS } from '../../const'
import { IContract, Optional } from '../../types'

import { initialContract } from '../customer-detail/hooks/useFetchCustomerDetail'

const headCells: TableHeaderOption[] = [
  {
    id: 'contractNumber',
    align: 'left',
    disablePadding: true,
    label: 'Contract Number',
  },
  {
    id: 'type',
    align: 'left',
    disablePadding: true,
    label: 'Contract Type',
  },
  {
    id: 'group',
    align: 'left',
    disablePadding: true,
    label: 'Contract Group',
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
    label: 'Expected Revenue',
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

const createData = (
  item: any,
  { contractTypes, contractGroups }: ListOptionsFilterContracts
) => {
  return {
    id: item.id,
    contractNumber: item.code,
    type: contractTypes.find(
      (contract: OptionItem) => contract.value === item.type
    )?.label,
    group: contractGroups.find(
      (group: OptionItem) => group.value === item.group
    )?.label,
    startDate: formatDate(item.startDate),
    endDate: formatDate(item.endDate),
    value: formatCurrency(+item.value, {}),
    expectedRevenue: formatCurrency(+item.expectedRevenue, {}),
    status: CONTRACT_STATUS[item.status],
    action: [{ type: 'delete' }],
  }
}

interface IPayloadEmit {
  contracts: any[]
}

interface PartnerContractInformationProps {
  partner: any
  flagGetDetail: boolean
  onChange: (payload: IPayloadEmit) => void
}

const PartnerContractInformation = ({
  partner,
  flagGetDetail,
  onChange,
}: PartnerContractInformationProps) => {
  const classes = useStyles()
  const dispatch = useDispatch<AppDispatch>()
  const { t: i18Customer } = useTranslation(LangConstant.NS_CUSTOMER)

  const { contractTypes, contractGroups, listStatus }: CommonState =
    useSelector(commonSelector)

  const [showModalAddNewContract, setShowModalAddNewContract] = useState(false)
  const [listContracts, setListContracts] = useState<Optional<IContract>[]>([])
  const [contract, setContract] = useState<Optional<IContract>>(initialContract)
  const [isViewContract, setIsViewContract] = useState<boolean>(false)

  const rows = useMemo(() => {
    return listContracts.map((contract: Optional<IContract>) =>
      createData(contract, { contractTypes, contractGroups, listStatus })
    )
  }, [listContracts])

  const handleAddNewContract = (newContract: any) => {
    const _newContract = {
      ...newContract,
      startDate: new Date(newContract.startDate)?.getTime() as number,
      endDate: new Date(newContract.endDate)?.getTime() as number,
    }

    if (isViewContract) {
      const contractIndex = listContracts.findIndex(
        (contract: Optional<IContract>) => contract.id === _newContract.id
      )
      if (contractIndex > -1) {
        const _contracts = [...listContracts]
        _contracts.splice(contractIndex, 1, _newContract)
        setListContracts(_contracts)
        onChange({
          contracts: _contracts,
        })
      }
    } else {
      const newListContracts = [...listContracts]
      newListContracts.push({ ..._newContract })
      setListContracts(newListContracts)
      onChange({
        contracts: newListContracts,
      })
    }
  }

  const fillPartnerDetail = () => {
    const { contracts } = partner
    setListContracts(contracts)
  }

  const handleDeleteContract = (contractIndex: number) => {
    const newListContracts = [...listContracts]
    newListContracts.splice(contractIndex, 1)
    setListContracts(newListContracts)
    onChange({
      contracts: newListContracts,
    })
  }

  const handleClickDetail = (contractId: string) => {
    const contractSelected: any = listContracts.find(
      (contract: Optional<IContract>) => contract.id === contractId
    )

    if (contractSelected) {
      const _contract = {
        ...contractSelected,
      }
      setContract(_contract)
      setIsViewContract(true)
      setShowModalAddNewContract(true)
    }
  }

  const openModalAddContract = () => {
    setIsViewContract(false)
    setShowModalAddNewContract(true)
  }

  useEffect(() => {
    if (!contractTypes.length) {
      dispatch(getContractTypes())
    }
    if (!contractGroups.length) {
      dispatch(getContractGroups())
    }
  }, [])

  useEffect(() => {
    if (flagGetDetail) {
      fillPartnerDetail()
    }
  }, [flagGetDetail])

  return (
    <CardForm title={i18Customer('TXT_CONTRACT_INFORMATION')}>
      <FormLayout top={24}>
        <TableShare
          keyName="id"
          isShowCheckbox={false}
          headCells={headCells}
          rows={rows}
          childComp={(row: any, index: number) => (
            <ItemRowTableV2
              row={row}
              key={`table-checkbox-${row['id']}`}
              headCells={headCells}
              isShowCheckbox={false}
              uuId={row['id']}
              keyName={'id'}
              onClickDelete={() => handleDeleteContract(index)}
              onClickDetail={handleClickDetail}
            />
          )}
        />
      </FormLayout>
      <FormLayout top={24}>
        <ButtonAddPlus
          label={i18Customer('LB_ADD_NEW_CONTRACT')}
          onClick={openModalAddContract}
        />
      </FormLayout>
      <ConditionalRender conditional={showModalAddNewContract}>
        <ModalAddNewContract
          contracts={listContracts}
          open={showModalAddNewContract}
          setOpen={setShowModalAddNewContract}
          onSubmit={handleAddNewContract}
          contract={contract}
          setContract={setContract}
          isViewMode={isViewContract}
        />
      </ConditionalRender>
    </CardForm>
  )
}

const useStyles = makeStyles(() => ({
  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

export default PartnerContractInformation
