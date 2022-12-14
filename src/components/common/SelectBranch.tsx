import { CommonState, getBranchList, commonSelector } from '@/reducer/common'
import { AppDispatch } from '@/store'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import InputDropdown from '../inputs/InputDropdown'

interface SelectBranchProps {
  value: string
  width?: number
  useLabel?: boolean
  onChange: (value: string) => void
  error?: boolean
  errorMessage?: any
}

const SelectBranch = ({
  width,
  value,
  useLabel,
  onChange,
  error,
  errorMessage,
}: SelectBranchProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const { t } = useTranslation()

  const { listBranches }: CommonState = useSelector(commonSelector)

  useEffect(() => {
    if (!listBranches.length) {
      dispatch(getBranchList())
    }
  }, [])

  return (
    <InputDropdown
      useLabel={useLabel}
      label={t('PLH_SELECT_BRANCH')}
      placeholder={!useLabel ? t('PLH_SELECT_BRANCH') : ''}
      width={width ?? '100%'}
      value={value}
      listOptions={listBranches}
      onChange={onChange}
      error={error}
      errorMessage={errorMessage}
    />
  )
}

export default SelectBranch
