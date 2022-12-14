import { LangConstant } from '@/const'
import { CONTRACT_REQUEST_KEY, CONTRACT_STATUS } from '@/modules/customer/const'
import { initialContract } from '@/modules/customer/pages/customer-detail/hooks/useFetchCustomerDetail'
import { IContract, Optional } from '@/modules/customer/types'
import { convertStatusInSelectOption } from '@/modules/customer/utils'
import { EventInput } from '@/types'
import { uuid } from '@/utils'
import { Box, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Modal from '../common/Modal'
import SelectContractGroup from '../common/SelectContractGroup'
import SelectContractType from '../common/SelectContractType'
import InputDatePicker from '../Datepicker/InputDatepicker'
import FormItem from '../Form/FormItem/FormItem'
import FormLayout from '../Form/FormLayout'
import InputDropdown from '../inputs/InputDropdown'
import InputTextArea from '../inputs/InputTextArea'
import InputTextLabel from '../inputs/InputTextLabel'
import InputCurrency from '../inputs/InputCurrency'

interface ModalAddNewContractProps {
  open: boolean
  setOpen: Function
  onSubmit: (contract: Optional<IContract>) => void
  contracts: any[]
  contract: Optional<IContract>
  setContract: Dispatch<SetStateAction<Optional<IContract>>>
  isViewMode: boolean
}

const contractStatus = convertStatusInSelectOption(
  Object.values(CONTRACT_STATUS)
)

type ErrorContract = {
  [key in keyof IContract]: {
    error: boolean
    errorMessage: string
  }
}

const initContractError: Optional<ErrorContract> = {
  [CONTRACT_REQUEST_KEY.CODE]: {
    error: false,
    errorMessage: '',
  },
}

const ModalAddNewContract = ({
  open,
  setOpen,
  onSubmit,
  contracts,
  contract,
  setContract,
  isViewMode,
}: ModalAddNewContractProps) => {
  const classes = useStyles()
  const { t: i18 } = useTranslation()
  const { t: i18Customer } = useTranslation(LangConstant.NS_CUSTOMER)

  const PLACEHOLDER_INPUT = i18Customer('PLH_INPUT_TEXT')
  const PLACEHOLDER_SELECT = i18Customer('PLH_SELECT')
  const [contractError, setContractError] =
    useState<Optional<ErrorContract>>(initContractError)
  const requireKeys: Array<keyof IContract> = useMemo(() => {
    return [
      'code',
      'type',
      'group',
      'value',
      'expectedRevenue',
      'status',
      'startDate',
      'endDate',
    ]
  }, [])
  const oldContractNumber = useMemo(() => {
    return contract.code
  }, [])

  const handleInputChange = (event: EventInput, name: keyof IContract) => {
    const { value } = event.target
    setContract((prev: any) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCurrencyChange = (value: string, key: keyof IContract) => {
    setContract((prev: any) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSelectChange = (value: any, name: keyof IContract) => {
    setContract((prev: Optional<IContract>) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleChooseDate = (value: Date, name: keyof IContract) => {
    setContract((prev: Optional<IContract>) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleClose = () => {
    setContractError(initContractError)
    setContract(initialContract)
    setOpen(false)
  }

  const handleSubmit = () => {
    if (handleValidate()) return

    const newContract: Optional<IContract> = isViewMode
      ? { ...contract }
      : { ...contract, id: uuid() }
    onSubmit(newContract)

    handleClose()
  }

  const handleValidate = () => {
    let error = false

    let isContractHadExist
    if (!isViewMode) {
      isContractHadExist = contracts.find(
        (item: any) => String(item.code) === String(contract.code)
      )
    } else {
      const _contracts = contracts.filter(
        (item: Optional<IContract>) =>
          String(item.code) !== String(oldContractNumber)
      )
      isContractHadExist = _contracts.find(
        (item: any) => String(item.code) === String(contract.code)
      )
    }

    if (isContractHadExist) {
      setContractError({
        ...contractError,
        code: {
          error: true,
          errorMessage: i18Customer('MSG_DUPLICATE_CONTRACT_NUMBER'),
        },
      })
      return true
    }

    requireKeys.forEach((key: keyof IContract) => {
      const value = contract[key]
      setContractError((prev: Optional<ErrorContract>) => ({
        ...prev,
        [key]: {
          error: !value || !JSON.stringify(value).length,
        },
      }))
      if (!value || !JSON.stringify(value).length) {
        error = true
      }
    })

    return error
  }

  const isDisabledBtnSubmit = useMemo(() => {
    let inValid = requireKeys.some((key: keyof IContract) => {
      const value = contract[key]
      return !value || !JSON.stringify(value).length
    })
    return inValid
  }, [contract])

  return (
    <Modal
      open={open}
      title={i18Customer(
        isViewMode ? 'LB_UPDATE_CONTRACT' : 'LB_ADD_NEW_CONTRACT'
      )}
      labelSubmit={i18(isViewMode ? 'LB_UPDATE' : 'LB_CREATE')}
      onClose={handleClose}
      onSubmit={handleSubmit}
      submitDisabled={isDisabledBtnSubmit}
    >
      <Box className={clsx(classes.listFields, 'scrollbar')}>
        <InputTextLabel
          type="text"
          require
          value={contract.code}
          name="contractNumber"
          label={i18Customer('LB_CONTRACT_NUMBER')}
          placeholder={PLACEHOLDER_INPUT}
          onChange={(e: EventInput) =>
            handleInputChange(e, CONTRACT_REQUEST_KEY.CODE)
          }
          error={contractError[CONTRACT_REQUEST_KEY.CODE]?.error}
          errorMessage={contractError[CONTRACT_REQUEST_KEY.CODE]?.errorMessage}
        />

        <Box className={classes.flex}>
          <FormItem
            label={i18Customer('LB_CONTRACT_TYPE')}
            require
            error={contractError[CONTRACT_REQUEST_KEY.TYPE]?.error}
            errorMessage={
              contractError[CONTRACT_REQUEST_KEY.TYPE]?.errorMessage
            }
          >
            <SelectContractType
              value={contract.type as string}
              onChange={value =>
                handleSelectChange(value, CONTRACT_REQUEST_KEY.TYPE)
              }
            />
          </FormItem>
          <FormItem
            label={i18Customer('LB_CONTRACT_GROUP')}
            require
            error={contractError[CONTRACT_REQUEST_KEY.GROUP]?.error}
            errorMessage={
              contractError[CONTRACT_REQUEST_KEY.GROUP]?.errorMessage
            }
          >
            <SelectContractGroup
              value={contract.group as string}
              onChange={value =>
                handleSelectChange(value, CONTRACT_REQUEST_KEY.GROUP)
              }
            />
          </FormItem>
        </Box>
        <FormItem
          label={i18Customer('LB_VALUE')}
          require
          error={contractError[CONTRACT_REQUEST_KEY.VALUE]?.error}
          errorMessage={contractError[CONTRACT_REQUEST_KEY.VALUE]?.errorMessage}
        >
          <InputCurrency
            error={contractError[CONTRACT_REQUEST_KEY.VALUE]?.error}
            placeholder="ex: 1.000.000 VND"
            value={contract.value}
            onChange={value =>
              handleCurrencyChange(value, CONTRACT_REQUEST_KEY.VALUE)
            }
          />
        </FormItem>
        <FormItem
          label={i18Customer('LB_EXPECTED_REVENUE')}
          require
          error={contractError[CONTRACT_REQUEST_KEY.EXPECTED_REVENUE]?.error}
          errorMessage={
            contractError[CONTRACT_REQUEST_KEY.EXPECTED_REVENUE]?.errorMessage
          }
        >
          <InputCurrency
            error={contractError[CONTRACT_REQUEST_KEY.EXPECTED_REVENUE]?.error}
            placeholder="ex: 1.000.000 VND"
            value={contract.expectedRevenue}
            onChange={value =>
              handleCurrencyChange(value, CONTRACT_REQUEST_KEY.EXPECTED_REVENUE)
            }
          />
        </FormItem>

        <FormItem
          label="Contract Status"
          require
          error={contractError[CONTRACT_REQUEST_KEY.STATUS]?.error}
          errorMessage={
            contractError[CONTRACT_REQUEST_KEY.STATUS]?.errorMessage
          }
        >
          <InputDropdown
            width={259}
            value={contract.status as string}
            placeholder={PLACEHOLDER_SELECT}
            listOptions={contractStatus}
            onChange={value =>
              handleSelectChange(value, CONTRACT_REQUEST_KEY.STATUS)
            }
          />
        </FormItem>

        <FormLayout gap={24} width={350}>
          <FormItem
            label={i18Customer('LB_START_DATE')}
            require
            error={contractError[CONTRACT_REQUEST_KEY.START_DATE]?.error}
            errorMessage={
              contractError[CONTRACT_REQUEST_KEY.START_DATE]?.errorMessage
            }
          >
            <InputDatePicker
              defaultValue={contract.startDate}
              onChange={(date: Date) =>
                handleChooseDate(date, CONTRACT_REQUEST_KEY.START_DATE)
              }
              maxDate={contract.endDate}
            />
          </FormItem>

          <FormItem
            label={i18Customer('LB_END_DATE')}
            require
            error={contractError[CONTRACT_REQUEST_KEY.END_DATE]?.error}
            errorMessage={
              contractError[CONTRACT_REQUEST_KEY.END_DATE]?.errorMessage
            }
          >
            <InputDatePicker
              defaultValue={contract.endDate}
              onChange={(date: Date) =>
                handleChooseDate(date, CONTRACT_REQUEST_KEY.END_DATE)
              }
              minDate={contract.startDate}
            />
          </FormItem>
        </FormLayout>

        <FormItem label={i18Customer('LB_NOTE')}>
          <InputTextArea
            defaultValue={contract.note}
            onChange={(e: EventInput) =>
              handleInputChange(e, CONTRACT_REQUEST_KEY.NOTE)
            }
          />
        </FormItem>
      </Box>
    </Modal>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  listFields: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    overflow: 'auto',
    maxHeight: '600px',
    overflowX: 'hidden',
    paddingRight: theme.spacing(1),
  },
  flex: {
    display: 'flex',
    gap: theme.spacing(3),
  },
  formItem: {
    width: 'unset !important',
  },
}))

export default ModalAddNewContract
