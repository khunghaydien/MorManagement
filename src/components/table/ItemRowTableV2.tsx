import { ItemRowTableProps, TableHeaderOption } from '@/types'
import { theme } from '@/ui/mui/v5'
import { getTextEllipsis } from '@/utils'
import { Box } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import { useMemo } from 'react'
import PriorityStatus from '../common/PriorityStatus'
import ConditionalRender from '../ConditionalRender'
import ActionTable from './ActionTable'
import StatusItem from './StatusItem'

export default function ItemRowTableV2(props: ItemRowTableProps) {
  const classes = useStyles()
  const {
    row,
    uuId,
    onClickItem = () => {},
    onClickDetail = () => {},
    onClickDelete = () => {},
    isShowCheckbox,
    headCells = [],
    selected = [],
    keyName = 'id',
  } = props

  const handleClick = () => {
    onClickItem(uuId)
  }
  const handleClickDetail = () => {
    onClickDetail(uuId)
  }
  const handleClickDelete = () => {
    onClickDelete(uuId)
  }
  const isSelected = (name: string) => selected.indexOf(name) !== -1
  const isItemSelected = isSelected(row[keyName])
  const keyException = ['status', 'action', 'priority']

  const listCell = useMemo(
    () =>
      headCells.map((item: TableHeaderOption) => ({
        key: item.id,
        value: row[item.id],
        align: item.align,
      })),
    [headCells, row]
  )

  return (
    <TableRow
      hover
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.name}
      selected={isItemSelected}
    >
      <ConditionalRender conditional={!!isShowCheckbox}>
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
      </ConditionalRender>

      {listCell.map((item: any, index: number) =>
        !keyException.includes(item.key) ? (
          <TableCell
            title={item.value}
            onClick={handleClickDetail}
            key={`${index}`}
            align={item.align}
            className={clsx(classes.rootItemRowTable, 'cursor-pointer')}
          >
            <span
              title={item.value}
              className={clsx(
                classes.rootItemRowTable,
                index === 0 && 'first-item'
              )}
            >
              {getTextEllipsis(item?.value?.toString())}
            </span>
          </TableCell>
        ) : (
          <TableCell key={`${index}`} align={item.align}>
            <ConditionalRender
              key={item.key}
              conditional={item.key === 'status'}
            >
              <Box
                className={clsx(
                  classes.rootItemRowTable,
                  'flex-center cursor-pointer'
                )}
                onClick={handleClickDetail}
              >
                <StatusItem typeStatus={item.value} />
              </Box>
            </ConditionalRender>
            <ConditionalRender
              key={`${index}-action`}
              conditional={item.key === 'action'}
            >
              <ActionTable
                actions={item.value}
                onClickDetail={handleClickDetail}
                onClickDelete={handleClickDelete}
              />
            </ConditionalRender>
            <ConditionalRender
              key={`${index}-priority`}
              conditional={item.key === 'priority'}
            >
              <Box sx={{ cursor: 'pointer' }} onClick={handleClickDetail}>
                <PriorityStatus priority={item.value} />
              </Box>
            </ConditionalRender>
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
    '&.flex-center': {
      display: 'flex',
      justifyContent: 'center',
    },
    '&.cursor-pointer': {
      cursor: 'pointer',
    },
  },
}))
