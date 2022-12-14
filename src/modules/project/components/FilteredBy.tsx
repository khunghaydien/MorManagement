import SelectBranch from '@/components/common/SelectBranch'
import SelectPriority from '@/components/common/SelectPriority'
import SelectService from '@/components/common/SelectService'
import InputDatePicker from '@/components/Datepicker/InputDatepicker'
import { OptionItem } from '@/types'
import { Dispatch, Fragment, SetStateAction } from 'react'
import { IListProjectsParams } from '../types'

interface FilteredByProps {
  filteredBy: string
  serviceKey: string
  params: any
  setParams: Dispatch<SetStateAction<IListProjectsParams>>
}

const FilteredBy = ({
  serviceKey,
  filteredBy,
  params,
  setParams,
}: FilteredByProps) => {
  const handleChange = (value: any, key: string) => {
    setParams((prev: any) => ({
      ...prev,
      [key]: key === 'startDate' || key === 'endDate' ? value.getTime() : value,
    }))
  }

  return (
    <Fragment>
      {filteredBy === 'branchId' && (
        <SelectBranch
          useLabel
          width={160}
          value={params?.branchId}
          onChange={(branchId: string) => handleChange(branchId, 'branchId')}
        />
      )}
      {/* {filteredBy === 'divisionIds' && (
        <SelectPriority
          useLabel
          width={160}
          value={params?.divisionIds}
          onChange={(priority: string) => handleChange(priority, 'priority')}
        />
      )}
      {filteredBy === 'technologyIds' && (
        <SelectPriority
          useLabel
          width={160}
          value={params?.technologyIds}
          onChange={(priority: string) => handleChange(priority, 'priority')}
        />
      )} */}
      {filteredBy === 'startDate' && (
        <InputDatePicker
          value={
            params?.startDate ? new Date(params?.startDate) : params?.startDate
          }
          onChange={(startDate: Date) => handleChange(startDate, 'startDate')}
        />
      )}
      {filteredBy === 'endDate' && (
        <InputDatePicker
          value={params?.endDate ? new Date(params?.endDate) : params?.endDate}
          onChange={(endDate: Date) => handleChange(endDate, 'endDate')}
        />
      )}
    </Fragment>
  )
}

export default FilteredBy
