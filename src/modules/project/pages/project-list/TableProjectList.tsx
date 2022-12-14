import { Dispatch, SetStateAction, useState, useMemo, ChangeEvent } from "react"
import { IListProjectsParams, ProjectState } from '../../types'
import { Box, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ModalDeleteRecords from '@/components/modal/ModalDeleteRecords'
import { useTranslation } from 'react-i18next'
import { LangConstant, PathConstant, TableConstant } from "@/const"
import ItemRowTableV2 from '@/components/table/ItemRowTableV2'
import ConditionalRender from '@/components/ConditionalRender'
import TableShare from '@/components/table/TableShare'
import TablePaginationShare from '@/components/table/TablePaginationShare'
import { selectProject } from '../../reducer/project'
import StringFormat from 'string-format'
import { useSelector } from "react-redux"
import { cloneDeep } from "lodash"
import { AuthState, selectAuth } from '@/reducer/auth'
import { IStatus, TableHeaderOption } from '@/types'
import { useNavigate } from "react-router-dom"
import { formatDate } from '@/utils'
import { PROJECT_STATUS } from "@/modules/customer/const"

interface ITableProjectList {
    params: IListProjectsParams,
    listChecked: string[],
    setListChecked: Dispatch<SetStateAction<string[]>>
    onDeleteProject: (idProject: string) => void
    setParams: Dispatch<SetStateAction<IListProjectsParams>>
}
interface IShowModalDeleteProject {
    status: boolean
    idProject: string
}
const projectListHeadCells: TableHeaderOption[] = [
    {
        id: 'id',
        align: 'left',
        disablePadding: true,
        label: 'Project ID',
    },
    {
        id: 'projectName',
        align: 'left',
        disablePadding: true,
        label: 'Project Name',
    },
    {
        id: 'projectType',
        align: 'left',
        disablePadding: true,
        label: 'Project Type',
    },
    {
        id: 'responsibleBranch',
        align: 'left',
        disablePadding: true,
        label: 'Responsible Branch',
    },
    {
        id: 'participateDivision',
        align: 'left',
        disablePadding: true,
        label: 'Participate Division',
    },
    {
        id: 'technology',
        align: 'center',
        disablePadding: true,
        label: 'Technology',
    },
    {
        id: 'projectStartDate',
        align: 'center',
        disablePadding: true,
        label: 'Project Start Date',
    },
    {
        id: 'projectEndDate',
        align: 'center',
        disablePadding: true,
        label: 'Project End Date',
    },
    {
        id: 'status',
        align: 'center',
        disablePadding: true,
        label: 'Status',
    },
    {
        id: 'action',
        align: 'center',
        disablePadding: true,
        label: 'Action',
    },
]
export function convertDataStatus(item: any): IStatus {
    let _resultData = { status: '', label: '' }
    if (PROJECT_STATUS[item?.id]) {
        return PROJECT_STATUS[item?.id]
    }
    return _resultData
}
export function createData(item: any) {
    return {
        id: item.id,
        projectName: item.name,
        projectType: item.type.name,
        projectStartDate: formatDate(item.startDate),
        projectEndDate: item.endDate != 0 ? formatDate(item.endDate) : "",
        status: convertDataStatus(item?.status),
        responsibleBranch: item.branch.name ? item.branch.name : "",
        participateDivision: item.divisions.name ? item.divisions.name : "",
        technology: item.technologies.name ? item.technologies.name : "",
        action: [{ type: 'delete' }],
    }
}
const TableProjectList = ({ params, listChecked, setListChecked, onDeleteProject, setParams }: ITableProjectList) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const { t: i18Project } = useTranslation(LangConstant.NS_PROJECT)
    const [showModalDeleteProject, setShowModalDeleteProject] = useState<IShowModalDeleteProject>({
        status: false,
        idProject: '',
    })
    const { projectsTotalElements, projectList }: ProjectState = useSelector(selectProject)
    const rows = useMemo(() => {
        return projectList.map((item: any) => createData(item))
    }, [projectList])

    const { permissions }: AuthState = useSelector(selectAuth)
    const headCells = useMemo(() => {
        const newProjectListHeadCells = cloneDeep(projectListHeadCells)
        return permissions.usePartnerDelete
            ? projectListHeadCells
            : newProjectListHeadCells.splice(0, newProjectListHeadCells.length - 1)
    }, [permissions.useProjectDelete])

    const handleCloseModalDeleteProject = () => {
        //close modal delete project
        setShowModalDeleteProject({
            status: false,
            idProject: '',
        })
    }
    const handleSubmitModalDeleteProject = () => {
        //submit modal delete project
        onDeleteProject(showModalDeleteProject.idProject)
    }
    const handlePageChange = (_: any, newPage: number) => {
        // page change
        setParams(prev => ({
            ...prev,
            pageNum: newPage,
        }))
        setListChecked([])
    }
    const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>) => {
        //row perpage change
        const newLimit = parseInt(event.target.value, 10)
        setListChecked([])
        setParams(prev => ({
            ...prev,
            pageNum: 1,
            pageSize: newLimit,
        }))
    }

    const handleSelectAll = (_: any, newChecked: Array<any>) => {
        // xử lý select all
        setListChecked(newChecked)
    }
    const handleSingleSelect = (id: string) => {
        //xử lý select từng item
        const newListChecked = [...listChecked]
        const indexById = listChecked.findIndex(_id => _id === id)
        if (indexById !== -1) {
            newListChecked.splice(indexById, 1)
        } else {
            newListChecked.push(id)
        }
        setListChecked(newListChecked)
    }
    const handleNavigateToDetailPage = (projectId: string) => {
        //click to trang chi tiết
        //thêm lại trang detail sau
    }
    const handleDeleteProject = (id: string) => {
        //xóa project
        setShowModalDeleteProject({
            status: true,
            idProject: id,
        })
    }
    return (
        <>
            <Box className={classes.rootTableProjectList}>
                <ModalDeleteRecords
                    titleMessage={i18Project('TXT_DELETE_PROJECT')}
                    subMessage={StringFormat(
                        i18Project('MSG_CONFIRM_PROJECT_DELETE'),
                        showModalDeleteProject.idProject
                    )}
                    open={showModalDeleteProject.status}
                    onClose={handleCloseModalDeleteProject}
                    onSubmit={handleSubmitModalDeleteProject}
                />
                <TableShare
                    keyName={'id'}
                    isShowCheckbox={false}
                    headCells={headCells}
                    selected={listChecked}
                    rows={rows}
                    onSelectAllClick={handleSelectAll}
                    childComp={(row: any, index: number) => (
                        <ItemRowTableV2
                            row={row}
                            key={`table-checkbox-${row['id']}`}
                            isShowCheckbox={false}
                            uuId={row['id']}
                            headCells={headCells}
                            selected={listChecked}
                            keyName={'id'}
                            onClickItem={handleSingleSelect}
                            onClickDetail={handleNavigateToDetailPage}
                            onClickDelete={handleDeleteProject}
                        />
                    )}
                />
                <ConditionalRender conditional={!!rows.length} fallback={''}>
                    <TablePaginationShare
                        rowsPerPageOptions={TableConstant.ROWS_PER_PAGE_OPTIONS}
                        totalElements={projectsTotalElements}
                        pageLimit={params.pageSize as number}
                        currentPage={params.pageNum as number}
                        onChangePage={handlePageChange}
                        onChangeLimitPage={handleRowsPerPageChange}
                    />
                </ConditionalRender>
            </Box>

        </>
    )
}
const useStyles = makeStyles((theme: Theme) => ({
    rootTableProjectList: {
        marginTop: theme.spacing(4),
    },
}))
export default TableProjectList