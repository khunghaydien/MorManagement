import { Dispatch, SetStateAction, useCallback, useEffect } from "react"
import { IListProjectsParams } from '../../types'
import { Box, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { AuthState, selectAuth } from '@/reducer/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from "react-i18next"
import { LangConstant } from '@/const'
import ButtonAddWithIcon from '@/components/buttons/ButtonAddWithIcon'
import FilterList from '@/components/common/FilterList'
import SelectService from '@/components/common/SelectService'
import FormItem from '@/components/Form/FormItem/FormItem'
import InputSearch from '@/components/inputs/InputSearch'
import { DateRange, OptionItem } from '@/types'
import { INPUT_TIME_DELAY } from '@/const/app.const'
import { useState } from 'react'
import _ from "lodash"
import { CommonState, commonSelector, getBranchList } from "@/reducer/common"
import { AppDispatch } from "@/store"
import InputRangeDatePicker from "@/components/inputs/InputRangeDatePicker"
import InputDropdown from "@/components/inputs/InputDropdown"
import { t } from "i18next"
interface PartnerListActionsProps {
    listChecked?: string[]
    setParams: Dispatch<SetStateAction<IListProjectsParams>>
}
const ProjectListAction = ({ setParams }: PartnerListActionsProps) => {
    const classes = useStyles()
    const { permissions }: AuthState = useSelector(selectAuth)
    const { t: i18Project } = useTranslation(LangConstant.NS_PROJECT)
    const [valueSearch, setValueSearch] = useState('')
    const [filters, setFilters] = useState({
        branchId: '',
        divisionIds: '',
        type: '',
        technologyIds: [],
        startDate: undefined,
        endDate: undefined,
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
        //thay đổi input tìm kiếm
        setValueSearch(newValueSearch)
        debounceFn(newValueSearch)
    }
    const handleNavigateToAddPage = () => {
        //tạo mới project
    }
    const handleFilter = () => {
        //xử lý submit filter
        setParams(prev => ({
            ...prev,
            ...filters
        }))
    }
    const handleFilterChange = (value: any, key: string) => {
        //xử lý thay đổi filter
        setFilters((prev: any) => ({
            ...prev,
            [key]: value,
        }))
    }

    const dispatch = useDispatch<AppDispatch>()
    const { listBranches }: CommonState = useSelector(commonSelector)

    useEffect(() => {
        if (!listBranches.length) {
            dispatch(getBranchList())
        }
    }, [])

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
    const listProjectType = [
        { id: 1, label: "Labo" },
        { id: 2, label: "Test" },

    ]
    const participateDivision = [{
        id: 1,
        label: "Back Office",
    }]

    return (
        <>
            <Box className={classes.rootProjectListActions}>
                <Box className={classes.flexGap24}>
                    <InputSearch
                        placeholder={i18Project('PLH_SEARCH_PROJECT')}
                        label={i18Project('LB_SEARCH')}
                        value={valueSearch}
                        onChange={handleSearchChange}
                    />
                    <FilterList title={i18Project('TXT_PROJECT_MANAGEMENT_TITLE').toString()} onSubmit={handleFilter}>
                        <Box className={classes.fieldFilters}>
                            <FormItem label={i18Project('LB_PROJECT_TYPE')} >
                                <InputDropdown
                                    width={160}
                                    label={t('LB_PROJECT_TYPE')}
                                    value={String(filters.type)}
                                    listOptions={listProjectType}
                                    onChange={(type: string) =>
                                        handleFilterChange(type, 'type')
                                    }
                                />
                            </FormItem>
                            <FormItem label={i18Project('LB_RESPONSIBLE_BRANCH')}>
                                <InputDropdown
                                    width={160}
                                    label={i18Project('LB_RESPONSIBLE_BRANCH').toString()}
                                    value={String(filters.branchId)}
                                    listOptions={listBranches}
                                    onChange={(branchId: string) =>
                                        handleFilterChange(branchId, 'branchId')
                                    }
                                />
                            </FormItem>
                            <FormItem label={i18Project('LB_PARTICIPATE_DIVISION')} >
                                <InputDropdown
                                    width={160}
                                    label={i18Project('LB_PARTICIPATE_DIVISION').toString()}
                                    value={filters.divisionIds}
                                    listOptions={participateDivision}
                                    onChange={(divisionIds: string) =>
                                        handleFilterChange(divisionIds, 'divisionIds')
                                    }
                                />
                            </FormItem>
                            <FormItem label={i18Project('LB_TECHNOLOGY')}>
                                <SelectService
                                    placeholder={i18Project('PLH_SELECT_TECHNOLOGY')}
                                    value={filters.technologyIds}
                                    onChange={(technology: OptionItem[]) =>
                                        handleFilterChange(technology, 'technologyIds')
                                    }
                                />
                            </FormItem>
                            <InputRangeDatePicker
                                dateLabel={{
                                    startDate: 'Start Date',
                                    endDate: 'End Date',
                                }}
                                onChange={handleDateRangeChange}
                            />

                        </Box>
                    </FilterList>
                </Box>
                {!!permissions.useProjectCreate && (
                    <ButtonAddWithIcon onClick={handleNavigateToAddPage}>
                        {i18Project('LB_ADD_NEW_PROJECT')}
                    </ButtonAddWithIcon>
                )}
            </Box>
        </>
    )
}
const useStyles = makeStyles((theme: Theme) => ({
    rootProjectListActions: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(2),
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
export default ProjectListAction