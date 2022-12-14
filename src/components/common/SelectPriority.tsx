import { LangConstant } from '@/const'
import { commonSelector, CommonState, getPriorities } from '@/reducer/common'
import { AppDispatch } from '@/store'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import InputDropdown from '../inputs/InputDropdown'

interface SelectPriorityProps {
  value: string
  width?: number
  useLabel?: boolean
  onChange: (value: string) => void
  error?: boolean
  errorMessage?: any
}

const SelectPriority = ({
  width,
  value,
  useLabel,
  onChange,
  error,
  errorMessage,
}: SelectPriorityProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const { t } = useTranslation(LangConstant.NS_CUSTOMER)
  const { priorities }: CommonState = useSelector(commonSelector)

  useEffect(() => {
    if (!priorities.length) {
      dispatch(getPriorities())
    }
  }, [])

  return (
    <InputDropdown
      useLabel={useLabel}
      label={t('LB_PRIORITY')}
      placeholder={!useLabel ? t('PLH_SELECT_PRIORITY') : ''}
      width={width ?? '100%'}
      value={value}
      listOptions={priorities}
      onChange={onChange}
      error={error}
      errorMessage={errorMessage}
    />
  )
}

export default SelectPriority
