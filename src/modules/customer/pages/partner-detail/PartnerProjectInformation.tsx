import CardForm from '@/components/Form/CardForm'
import ItemRowTable from '@/components/table/ItemRowTable'
import ItemRowTableV2 from '@/components/table/ItemRowTableV2'
import TableShare from '@/components/table/TableShare'
import { LangConstant } from '@/const'
import { TableHeaderOption } from '@/types'
import { formatCurrency, formatDate } from '@/utils'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { PROJECT_STATUS } from '../../const'
import { ITechnology } from '../../types'

const headCells: TableHeaderOption[] = [
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Project Name',
  },
  {
    id: 'type',
    align: 'left',
    disablePadding: true,
    label: 'Project Type',
  },
  {
    id: 'technologies',
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
    id: 'totalCurrentCost',
    align: 'left',
    disablePadding: true,
    label: 'Total Current Cost',
  },
  {
    id: 'status',
    align: 'center',
    disablePadding: true,
    label: 'Status',
  },
]

const createData = (prj: any) => {
  return {
    name: prj.name,
    type: prj.type,
    technologies: prj.technologies
      .map((tech: ITechnology) => tech.name)
      .join(', '),
    startDate: formatDate(prj.startDate),
    endDate: formatDate(prj.endDate),
    totalCurrentCost: formatCurrency(+prj.totalCurrentRevenue, {}),
    status: PROJECT_STATUS[prj.status.id],
  }
}

interface PartnerProjectInformationProps {
  listProjects: any[]
}

const PartnerProjectInformation = ({
  listProjects,
}: PartnerProjectInformationProps) => {
  const { t: i18Customer } = useTranslation(LangConstant.NS_CUSTOMER)

  const rows = useMemo(() => {
    return listProjects.map(prj => createData(prj))
  }, [listProjects])

  return (
    <CardForm title={i18Customer('TXT_PROJECT_INFORMATION')}>
      <TableShare
        keyName={'id'}
        isShowCheckbox={false}
        headCells={headCells}
        rows={rows}
        childComp={(row: any, index: number) => (
          <ItemRowTableV2
            isShowCheckbox={false}
            row={row}
            key={`table-checkbox-${index}`}
            uuId={row['id']}
            keyName={'id'}
            headCells={headCells}
          />
        )}
      />
    </CardForm>
  )
}

export default PartnerProjectInformation
