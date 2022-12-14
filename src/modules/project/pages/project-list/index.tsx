import CommonScreenLayout from "@/components/common/CommonScreenLayout"
import { Box, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'react-i18next'
import { LangConstant, TableConstant } from "@/const"
import ProjectListAction from "./ProjectListAction"
import { IListProjectsParams } from '../../types'
import { useEffect, useState } from "react"
import TableProjectList from "./TableProjectList"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store"
import { updateLoading } from '@/reducer/screen'
import { deleteProject, getListProjects } from '../../reducer/project'

const ProjectList = () => {
    const classes = useStyles()
    const dispatch = useDispatch<AppDispatch>()
    const { t: i18Project } = useTranslation(LangConstant.NS_PROJECT)
    const [params, setParams] = useState<IListProjectsParams>({
        pageNum: TableConstant.PAGE_CURRENT_DEFAULT,
        pageSize: TableConstant.LIMIT_DEFAULT,
    })
    const [listChecked, setListChecked] = useState<string[]>([])
    const handleDeleteProject = (id: string) => {
        //xóa theo id
        dispatch(updateLoading(true))
        dispatch(deleteProject(id))
            .unwrap()
            .then(() => {
                dispatch(alertActionSuccess(id))
                getListPartnersApi(params)
            })
        dispatch(updateLoading(false))
    }
    const getListPartnersApi = (params: IListProjectsParams = {}) => {
        const _params = {
            ...params,
        }
        dispatch(updateLoading(true))
        dispatch(getListProjects({ ..._params }))
            .unwrap()
            .finally(() => {
                dispatch(updateLoading(false))
            })
    }

    useEffect(() => {
        getListPartnersApi(params)
    }, [params])

    return (
        <>
            <CommonScreenLayout title={i18Project('TXT_PROJECT_MANAGEMENT_TITLE')}>
                <Box className={classes.projectContainer}>
                    <ProjectListAction
                        setParams={setParams}
                    />
                    <TableProjectList
                        listChecked={listChecked}
                        setListChecked={setListChecked}
                        params={params}
                        setParams={setParams}
                        onDeleteProject={handleDeleteProject}
                    />
                </Box>
            </CommonScreenLayout>
        </>
    )
}
const useStyles = makeStyles((theme: Theme) => ({
    rootProjectList: {},
    title: {
        fontSize: 16,
        fontWeight: 700,
        borderBottom: `1px solid ${theme.color.grey.secondary}`,
        width: 'max-content',
        paddingBottom: '28px',
    },
    projectContainer: {
        marginTop: theme.spacing(3),
    },
}))
export default ProjectList

function alertActionSuccess(id: string): any {
    throw new Error("Function not implemented.")
}

