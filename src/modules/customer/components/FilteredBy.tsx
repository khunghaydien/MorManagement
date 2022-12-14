import SelectBranch from '@/components/common/SelectBranch'
import SelectPriority from '@/components/common/SelectPriority'
import SelectService from '@/components/common/SelectService'
import InputDatePicker from '@/components/Datepicker/InputDatepicker'
import { LangConstant } from '@/const'
import { OptionItem } from '@/types'
import { Dispatch, Fragment, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { IListCustomersParams, ListPartnersParams } from '../types'

interface FilteredByProps {
  filteredBy: string
  serviceKey: string
  params: any
  setParams: Dispatch<SetStateAction<IListCustomersParams | ListPartnersParams>>
}

const FilteredBy = ({
  serviceKey,
  filteredBy,
  params,
  setParams,
}: FilteredByProps) => {
  const { t: i18Customer } = useTranslation(LangConstant.NS_CUSTOMER)

  const handleChange = (value: any, key: string) => {
    setParams((prev: any) => ({
      ...prev,
      [key]: key === 'collaborationStartDate' ? value.getTime() : value,
    }))
  }

  return (
    <Fragment>
      {filteredBy === 'branchId' && (
        <SelectBranch
          useLabel
          width={160}
          value={params.branchId}
          onChange={(branchId: string) => handleChange(branchId, 'branchId')}
        />
      )}
      {filteredBy === serviceKey && (
        <SelectService
          placeholder={i18Customer(
            serviceKey === 'serviceId'
              ? 'PLH_SELECT_SERVICE'
              : 'PLH_SELECT_STRENGTH'
          )}
          value={params[serviceKey]}
          onChange={(serviceIds: OptionItem[]) =>
            handleChange(serviceIds, serviceKey)
          }
        />
      )}
      {filteredBy === 'priority' && (
        <SelectPriority
          useLabel
          width={160}
          value={params.priority}
          onChange={(priority: string) => handleChange(priority, 'priority')}
        />
      )}
      {filteredBy === 'collaborationStartDate' && (
        <InputDatePicker
          value={
            params.collaborationStartDate
              ? new Date(params.collaborationStartDate)
              : params.collaborationStartDate
          }
          onChange={(collaborationStartDate: Date) =>
            handleChange(collaborationStartDate, 'collaborationStartDate')
          }
        />
      )}
    </Fragment>
  )
}

export default FilteredBy
