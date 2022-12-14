import ButtonAddWithIcon from '@/components/buttons/ButtonAddWithIcon'
import FilterList from '@/components/common/FilterList'
import SelectBranch from '@/components/common/SelectBranch'
import SelectPriority from '@/components/common/SelectPriority'
import SelectService from '@/components/common/SelectService'
import FormItem from '@/components/Form/FormItem/FormItem'
import InputRangeDatePicker from '@/components/inputs/InputRangeDatePicker'
import InputSearch from '@/components/inputs/InputSearch'
import { LangConstant } from '@/const'
import { INPUT_TIME_DELAY } from '@/const/app.const'
import { AuthState, selectAuth } from '@/reducer/auth'
import { DateRange, OptionItem } from '@/types'
import { theme } from '@/ui/mui/v5'
import { Box, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import _ from 'lodash'
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IListCustomersParams } from '../../types'

const listFilter = [
  {
    id: 'serviceId',
    label: 'Service',
    value: 'serviceId',
  },
  {
    id: 'branchId',
    label: 'Branch',
    value: 'branch',
  },
  {
    id: 'collaborationStartDate',
    label: 'Collaboration Start Date',
    value: 'collaborationStartDate',
  },
  {
    id: 'priority',
    label: 'Priority',
    value: 'priority',
  },
]

interface HeaderCustomerProps {
  listSelected?: Array<any>
  setParams: Dispatch<SetStateAction<IListCustomersParams>>
}

const HeaderCustomer = ({ setParams }: HeaderCustomerProps) => {
  const classes = useStyles()
  const { t: i18Customer } = useTranslation(LangConstant.NS_CUSTOMER)
  const navigate = useNavigate()
  const { permissions }: AuthState = useSelector(selectAuth)

  const [valueSearch, setValueSearch] = useState('')
  const [filters, setFilters] = useState<IListCustomersParams>({
    priority: '',
    branchId: '',
    serviceId: [],
    startDate: null,
    endDate: null,
  })

  const debounceFn = useCallback(
    _.debounce(handleDebounceFn, INPUT_TIME_DELAY),
    []
  )
  function handleDebounceFn(keyword: string) {
    setParams((prev: IListCustomersParams) => ({
      ...prev,
      keyword,
    }))
  }

  const handleSearchChange = (newValueSearch: string) => {
    setValueSearch(newValueSearch)
    debounceFn(newValueSearch)
  }

  const handleFilterChange = (value: any, key: string) => {
    setFilters((prev: any) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleDateRangeChange = (dateRange: DateRange) => {
    const _dateRange = {
      startDate: dateRange.startDate?.getTime(),
      endDate: dateRange.endDate?.getTime(),
    }
    setFilters((prev: any) => ({
      ...prev,
      ..._dateRange,
    }))
  }

  const handleFilter = () => {
    setParams(prev => ({
      ...prev,
      ...filters,
    }))
  }

  return (
    <Box className={classes.rootHeaderCustomers}>
      <Box data-title="header">
        <Box data-title="actions-and-filter">
          <Box data-title="wrap-filter">
            <InputSearch
              value={valueSearch}
              placeholder={i18Customer('PLH_SEARCH_CUSTOMER')}
              label={i18Customer('LB_SEARCH')}
              onChange={handleSearchChange}
            />
            <FilterList title="Filter Customer List" onSubmit={handleFilter}>
              <Box className={classes.fieldFilters}>
                <FormItem label={i18Customer('LB_BRANCH')}>
                  <SelectBranch
                    width={160}
                    value={String(filters.branchId)}
                    onChange={(branchId: string) =>
                      handleFilterChange(branchId, 'branchId')
                    }
                  />
                </FormItem>
                <FormItem label={i18Customer('LB_PRIORITY')}>
                  <SelectPriority
                    width={160}
                    value={String(filters.priority)}
                    onChange={(priority: string) =>
                      handleFilterChange(priority, 'priority')
                    }
                  />
                </FormItem>
                <FormItem label={i18Customer('LB_SERVICE')}>
                  <SelectService
                    placeholder={i18Customer('PLH_SELECT_SERVICE')}
                    value={filters.serviceId}
                    onChange={(serviceId: OptionItem[]) =>
                      handleFilterChange(serviceId, 'serviceId')
                    }
                  />
                </FormItem>
                <InputRangeDatePicker
                  dateLabel={{
                    startDate: 'Collaboration Date',
                    endDate: 'Collaboration Date',
                  }}
                  onChange={handleDateRangeChange}
                />
              </Box>
            </FilterList>
          </Box>
          {!!permissions.useCustomerCreate && (
            <ButtonAddWithIcon onClick={() => navigate('create')}>
              {i18Customer('LB_ADD_CUSTOMER')}
            </ButtonAddWithIcon>
          )}
        </Box>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((themeMui: Theme) => ({
  rootHeaderCustomers: {
    width: '100%',
    marginBottom: '10px',
    '& [data-title="header"]': {
      width: '100%',
      '& [data-title="title"]': {
        fontWeight: '700',
        fontSize: themeMui.spacing(2),
        color: theme.color.black.primary,
        borderBottom: `1px solid ${theme.color.grey.secondary}`,
        paddingBottom: themeMui.spacing(3),
        width: 'max-content',
        paddingRight: themeMui.spacing(4),
        marginBottom: themeMui.spacing(3),
      },
      '& [data-title="actions-and-filter"]': {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: themeMui.spacing(4),
        flexWrap: 'wrap',
        gap: '20px',
        '& [data-title="wrap-filter"]': {
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
        },
        '& [data-title="wrap-actions"]': {
          display: 'flex',
          gap: '20px',
          '& [data-title="btn"]': {
            display: 'flex',
            gap: '10px',
            fontWeight: '700',
            fontSize: '14px',
            alignItems: 'center',
            color: theme.color.white,
            svg: { fontSize: '20px' },
            '& [data-title="icon-add"]': {
              fontSize: '20px',
              fontWeight: '700',
            },
          },
        },
      },
    },
  },
  labelAdd: {
    marginLeft: themeMui.spacing(0.5),
  },
  labelAction: {
    marginRight: themeMui.spacing(0.5),
  },
  buttonAdd: {
    height: theme.spacing(5),
  },
  fieldFilters: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}))
export default HeaderCustomer
