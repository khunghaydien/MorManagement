import ConditionalRender from '@/components/ConditionalRender'
import CardForm from '@/components/Form/CardForm'
import ItemRowTable from '@/components/table/ItemRowTableV2'
import TablePaginationShare from '@/components/table/TablePaginationShare'
import TableShare from '@/components/table/TableShare'
import { LangConstant, TableConstant } from '@/const'
import { IProject } from '@/modules/customer/types'
import { formatCurrency } from '@/utils'
import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { ChangeEvent, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

const tableOptions: any[] = [
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
    id: 'technology',
    align: 'left',
    disablePadding: true,
    label: 'Technology',
  },
  {
    id: 'startDate',
    align: 'left',
    disablePadding: true,
    label: 'Start Date',
  },
  {
    id: 'endDate',
    align: 'left',
    disablePadding: true,
    label: 'End Date',
  },
  {
    id: 'totalCurrentRevenue',
    align: 'left',
    disablePadding: true,
    label: 'Total Curent Revenue',
  },
  {
    id: 'status',
    align: 'center',
    disablePadding: true,
    label: 'Status',
  },
]

export function createData(item: any) {
  return {
    projectName: item.name,
    projectType: item.type,
    technology: item.technologies,
    startDate: item.startDate,
    endDate: item.endDate,
    totalCurrentRevenue: formatCurrency(+item.totalCurrentRevenue, {}),
    status: item.status,
  }
}

interface IProps {
  projects: IProject[]
}

function ProjectTable({ projects }: IProps) {
  const { t: i18Customer } = useTranslation(LangConstant.NS_CUSTOMER)
  const classes = useStyles()

  const [page, setPage] = useState(TableConstant.PAGE_CURRENT_DEFAULT)
  const [pageLimit, setPageLimit] = useState(TableConstant.LIMIT_DEFAULT)

  const dataShow = useMemo(() => {
    if (!projects || !projects.length) return []
    return projects.map((project: IProject) => createData(project))
  }, [projects, pageLimit, page])

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setPageLimit(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <CardForm title={i18Customer('TXT_PROJECT_INFORMATION')}>
      <TableShare
        keyName={'id'}
        headCells={tableOptions}
        rows={dataShow}
        limitPage={pageLimit}
        pageCurrent={page}
        childComp={(row: any, index: number) => (
          <ItemRowTable
            headCells={tableOptions}
            row={row}
            key={`${row.id}-${index}`}
            isShowCheckbox={false}
            uuId={row['id']}
          />
        )}
      />
      <ConditionalRender conditional={!!dataShow.length}>
        <TablePaginationShare
          rowsPerPageOptions={TableConstant.ROWS_PER_PAGE_OPTIONS}
          totalElements={dataShow.length}
          pageLimit={pageLimit}
          currentPage={page}
          onChangePage={handleChangePage}
          onChangeLimitPage={handleChangeRowsPerPage}
        />
      </ConditionalRender>
    </CardForm>
  )
}

const useStyles = makeStyles((theme: Theme) => ({}))

export default ProjectTable
