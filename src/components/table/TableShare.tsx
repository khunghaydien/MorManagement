import { TableShareType } from '@/types'
import { Box, Theme } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import { makeStyles } from '@mui/styles'
import { ChangeEvent } from 'react'
import NoData from '../common/NoData'
import ConditionalRender from '../ConditionalRender'
import TableHeadShare from './TableHeadShare'

const TableShare = (props: TableShareType) => {
  const classes = useStyles()
  const {
    headCells = [],
    rows,
    isShowCheckbox,
    keyName = 'id',
    childComp = () => {},
    selected = [],
    onSelectAllClick = () => {},
    onSortChange,
  } = props

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map(n => n[keyName])
      onSelectAllClick(event, newSelected)
      return
    }
    onSelectAllClick(event, [])
  }
  return (
    <Box sx={{ width: '100%' }} className={classes.rootTableShare}>
      <TableContainer sx={{ maxHeight: 800 }} className={'scrollbar'}>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={'medium'}
          stickyHeader
          aria-label="sticky table"
        >
          <TableHeadShare
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            onSortChange={onSortChange}
            rowCount={rows.length}
            headCells={headCells}
            isShowCheckbox={isShowCheckbox}
          />
          <TableBody>
            <ConditionalRender
              conditional={!!rows.length}
              fallback={<TableNoData />}
            >
              {rows.map(childComp)}
            </ConditionalRender>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
const TableNoData = () => (
  <tr>
    <td colSpan={100}>
      <NoData />
    </td>
  </tr>
)
const useStyles = makeStyles((theme: Theme) => ({
  rootTableShare: {
    boxShadow: '0px 0px 0px 1px #E0E0E0',
    borderRadius: '4px',
    padding: theme.spacing(0.5, 0.5, 0, 0.5),
    '& [data-title="wrap-table"]': {},
  },
}))

export default TableShare
