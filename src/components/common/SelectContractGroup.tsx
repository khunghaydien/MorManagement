import { LangConstant } from '@/const'
import {
  commonSelector,
  CommonState,
  getContractGroups,
} from '@/reducer/common'
import { AppDispatch } from '@/store'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import InputDropdown from '../inputs/InputDropdown'

interface IProps {
  value: string
  width?: number
  useLabel?: boolean
  onChange: (value: string) => void
  error?: boolean
  errorMessage?: any
}

const SelectContractGroup = ({
  width,
  value,
  useLabel,
  onChange,
  error,
  errorMessage,
}: IProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const { t } = useTranslation(LangConstant.NS_CUSTOMER)
  const { contractGroups }: CommonState = useSelector(commonSelector)

  useEffect(() => {
    if (!contractGroups.length) {
      dispatch(getContractGroups())
    }
  }, [])

  return (
    <InputDropdown
      useLabel={useLabel}
      label={t('LB_CONTRACT_GROUP')}
      placeholder={!useLabel ? t('PLH_INPUT_SELECT') : ''}
      width={width ?? '100%'}
      value={value}
      listOptions={contractGroups}
      onChange={onChange}
      error={error}
      errorMessage={errorMessage}
    />
  )
}

export default SelectContractGroup
