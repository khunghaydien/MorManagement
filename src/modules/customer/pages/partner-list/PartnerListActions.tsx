import ButtonAddWithIcon from '@/components/buttons/ButtonAddWithIcon'
import FilterList from '@/components/common/FilterList'
import SelectBranch from '@/components/common/SelectBranch'
import SelectPriority from '@/components/common/SelectPriority'
import SelectService from '@/components/common/SelectService'
import FormItem from '@/components/Form/FormItem/FormItem'
import InputRangeDatePicker from '@/components/inputs/InputRangeDatePicker'
import InputSearch from '@/components/inputs/InputSearch'
import { LangConstant, PathConstant } from '@/const'
import { INPUT_TIME_DELAY } from '@/const/app.const'
import { AuthState, selectAuth } from '@/reducer/auth'
import { DateRange, OptionItem } from '@/types'
import { Box, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import _ from 'lodash'
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ListPartnersParams } from '../../types'
interface PartnerListActionsProps {
  listChecked?: string[]
  setParams: Dispatch<SetStateAction<ListPartnersParams>>
}

const PartnerListActions = ({ setParams }: PartnerListActionsProps) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const { t: i18Customer } = useTranslation(LangConstant.NS_CUSTOMER)
  const { permissions }: AuthState = useSelector(selectAuth)
  const [valueSearch, setValueSearch] = useState('')
  const [filters, setFilters] = useState({
    priority: '',
    branchId: '',
    skillSetIds: [],
    startDate: null,
    endDate: null,
  })

  const debounceFn = useCallback(
    _.debounce(handleDebounceFn, INPUT_TIME_DELAY),
    []
  )
  function handleDebounceFn(keyword: string) {
    setParams(prev => ({
      ...prev,
      keyword,
    }))
  }
  const handleSearchChange = (newValueSearch: string) => {
    setValueSearch(newValueSearch)
    debounceFn(newValueSearch)
  }

  const handleNavigateToAddPage = () => {
    navigate(PathConstant.CUSTOMER_PARTNER_CREATE)
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
    <Fragment>
      <Box className={classes.rootPartnerListActions}>
        <Box className={classes.flexGap24}>
          <InputSearch
            placeholder={i18Customer('PLH_SEARCH_PARTNER')}
            label={i18Customer('LB_SEARCH')}
            value={valueSearch}
            onChange={handleSearchChange}
          />
          <FilterList title="Filter Partner List" onSubmit={handleFilter}>
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
              <FormItem label={i18Customer('LB_STRENGTH')}>
                <SelectService
                  placeholder={i18Customer('PLH_SELECT_STRENGTH')}
                  value={filters.skillSetIds}
                  onChange={(skillSetIds: OptionItem[]) =>
                    handleFilterChange(skillSetIds, 'skillSetIds')
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
        {!!permissions.usePartnerCreate && (
          <ButtonAddWithIcon onClick={handleNavigateToAddPage}>
            {i18Customer('LB_ADD_NEW_PARTNER')}
          </ButtonAddWithIcon>
        )}
      </Box>
    </Fragment>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  rootPartnerListActions: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '20px',
  },
  flexGap24: {
    display: 'flex',
    gap: theme.spacing(3),
    flexWrap: 'wrap',
  },
  fieldFilters: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}))

export default PartnerListActions
