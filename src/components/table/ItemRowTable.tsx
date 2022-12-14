import { ItemRowTableProps } from '@/types'
import { theme } from '@/ui/mui/v5'
import Checkbox from '@mui/material/Checkbox'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import StatusItem from './StatusItem'

export default function ItemRowTable(props: ItemRowTableProps) {
  const classes = useStyles()
  const {
    row,
    uuId,
    onClickItem = () => {},
    onClickDetail = () => {},
    isShowCheckbox,
    selected = [],
    keyName = 'id',
  } = props
  const handleClick = () => {
    onClickItem(uuId)
  }
  const handleClickDetail = () => {
    onClickDetail(uuId)
  }
  const isSelected = (name: string) => selected.indexOf(name) !== -1
  const isItemSelected = isSelected(row[keyName])
  const listCell = Object.entries(row)
  return (
    <TableRow
      hover
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.name}
      selected={isItemSelected}
    >
      {isShowCheckbox ? (
        <TableCell padding="checkbox">
          <Checkbox
            onClick={handleClick}
            color="primary"
            checked={isItemSelected}
            inputProps={{
              'aria-labelledby': uuId,
            }}
          />
        </TableCell>
      ) : (
        ''
      )}

      {listCell.map((item: any, index: number) =>
        index === 0 ? (
          <TableCell
            onClick={handleClickDetail}
            component="th"
            id={uuId}
            scope="row"
            key={`${index}`}
            className="key-name"
          >
            <span className={clsx(classes.rootItemRowTable, 'first-item')}>
              {item[1]}
            </span>
          </TableCell>
        ) : (
          <TableCell onClick={handleClickDetail} key={`${index}`} align="left">
            {item[0] === 'status' ? (
              <StatusItem typeStatus={item[1]} />
            ) : (
              item[1]
            )}
          </TableCell>
        )
      )}
    </TableRow>
  )
}

const useStyles = makeStyles(() => ({
  rootItemRowTable: {
    '&.first-item': {
      color: theme.color.blue.primary,
    },
  },
}))
