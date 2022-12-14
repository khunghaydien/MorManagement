import { LangConstant } from '@/const'
import { commonSelector, CommonState, getContractTypes } from '@/reducer/common'
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

const SelectContractType = ({
  width,
  value,
  useLabel,
  onChange,
  error,
  errorMessage,
}: IProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const { t } = useTranslation(LangConstant.NS_CUSTOMER)
  const { contractTypes }: CommonState = useSelector(commonSelector)

  useEffect(() => {
    if (!contractTypes.length) {
      dispatch(getContractTypes())
    }
  }, [])

  return (
    <InputDropdown
      useLabel={useLabel}
      label={t('LB_CONTRACT_TYPE')}
      placeholder={!useLabel ? t('PLH_INPUT_SELECT') : ''}
      width={width ?? '100%'}
      value={value}
      listOptions={contractTypes}
      onChange={onChange}
      error={error}
      errorMessage={errorMessage}
    />
  )
}

export default SelectContractType
