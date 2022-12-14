import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'
import { EnhancedTableProps, TableHeaderOption } from '@/types'
import { TableSortLabel } from '@mui/material'

export default function TableHeadShare(props: EnhancedTableProps) {
  const {
    numSelected = 0,
    rowCount,
    headCells,
    isShowCheckbox,
    onSelectAllClick,
    onSortChange,
  } = props

  return (
    <TableHead>
      <TableRow>
        {isShowCheckbox ? (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
        ) : (
          ''
        )}

        {headCells.map((headCell: TableHeaderOption, index: number) => (
          <TableCell key={index} align={headCell.align}>
            <span style={{ textTransform: 'capitalize' }}>
              {!!headCell?.useSort ? (
                <TableSortLabel
                  active
                  direction={headCell.orderBy}
                  onClick={() =>
                    !!onSortChange
                      ? onSortChange(index, headCell.orderBy)
                      : null
                  }
                >
                  {headCell.label}
                </TableSortLabel>
              ) : (
                headCell.label
              )}
            </span>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
