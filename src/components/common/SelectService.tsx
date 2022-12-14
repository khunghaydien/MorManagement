import { LangConstant } from '@/const'
import { commonSelector, CommonState, getSkillSets } from '@/reducer/common'
import { AppDispatch } from '@/store'
import { ISkillSet, OptionItem, SkillSet } from '@/types'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import InputAutocomplete from '../inputs/InputAutocomplete'

interface IProps {
  value?: OptionItem[]
  width?: number
  useLabel?: boolean
  onChange: (value: OptionItem[]) => void
  error?: boolean
  errorMessage?: string
  placeholder?: any
}

const SelectService = ({
  width,
  value,
  useLabel,
  placeholder,
  onChange,
  error,
  errorMessage,
}: IProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const { t } = useTranslation(LangConstant.NS_CUSTOMER)
  const { skillSets }: CommonState = useSelector(commonSelector)

  const listOptions: OptionItem[] = useMemo(() => {
    const result: any[] = []
    skillSets.forEach((item: SkillSet) => {
      result.push(...item.skillSets)
    })
    return result.map((item: ISkillSet) => ({
      label: item.name,
      value: item.skillSetId,
      id: item.skillSetId,
    }))
  }, [skillSets])

  useEffect(() => {
    if (!skillSets.length) {
      dispatch(getSkillSets())
    }
  }, [])

  return (
    <InputAutocomplete
      placeholder={placeholder}
      listOptions={listOptions}
      onChange={onChange}
      defaultTags={value}
      error={error}
      errorMessage={errorMessage}
    />
  )
}

export default SelectService
