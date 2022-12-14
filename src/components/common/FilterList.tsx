import { ReactElement, useState } from 'react'
import FilterListIcon from '@mui/icons-material/FilterList'
import { Box, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import CloseIcon from '../icons/CloseIcon'
import CommonButton from '../buttons/CommonButton'

interface FilterListProps {
  className?: string
  children: ReactElement
  title?: string
  submitDisabled?: boolean
  onSubmit: () => void
}

const FilterList = ({
  title = 'Filter List',
  className,
  children,
  submitDisabled,
  onSubmit,
}: FilterListProps) => {
  const classes = useStyles()

  const [isShowFilter, setIsShowFilter] = useState(false)

  const handleToggleShowFilter = () => setIsShowFilter(!isShowFilter)

  const handleSubmit = () => {
    handleToggleShowFilter()
    onSubmit()
  }

  return (
    <Box className={clsx(classes.rootFilterList, 'center-root', className)}>
      <FilterListIcon
        className={classes.icon}
        onClick={handleToggleShowFilter}
      />
      {isShowFilter && (
        <Box className={classes.filter}>
          <Box className={classes.filterHeader}>
            <Box className={classes.title}>{title}</Box>
            <CloseIcon onClick={handleToggleShowFilter} />
          </Box>
          <Box className={classes.filterBody}>{children}</Box>
          <Box className={classes.filterFooter}>
            <CommonButton
              disabled={submitDisabled}
              width={60}
              onClick={handleSubmit}
            >
              Filter
            </CommonButton>
          </Box>
        </Box>
      )}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  rootFilterList: {},
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    cursor: 'pointer',
    color: theme.color.black.secondary,
  },
  filter: {
    background: '#ffffff',
    height: '100vh',
    position: 'fixed',
    zIndex: 3,
    top: 0,
    right: 0,
    borderLeft: `1px solid ${theme.color.grey.secondary}`,
    minWidth: 400,
    maxWidth: 500,
  },
  filterHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.color.grey.secondary}`,
  },
  filterBody: {
    padding: theme.spacing(2, 2, 0, 2),
  },
  filterFooter: {
    padding: theme.spacing(2),
  },
}))

export default FilterList
