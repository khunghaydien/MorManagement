import { Box, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { ReactNode } from 'react'
import BackIcon from '../icons/BackIcon'
import clsx from 'clsx'

interface CommonScreenLayoutProps {
  children: ReactNode
  title?: any
  useBackPage?: boolean
  backLabel?: any
  onBack?: () => void
}

const CommonScreenLayout = ({
  title,
  useBackPage,
  children,
  backLabel,
  onBack,
}: CommonScreenLayoutProps) => {
  const classes = useStyles()

  return (
    <Box className={classes.rootCommonScreenLayout}>
      {!!useBackPage && <BackIcon onClick={onBack} label={backLabel} />}
      {!!title && (
        <Box className={clsx(classes.title, useBackPage && classes.mt16)}>
          {title}
        </Box>
      )}
      <Box className={classes.children}>{children}</Box>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  rootCommonScreenLayout: {
    padding: theme.spacing(3, 5),
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    paddingBottom: '28px',
    borderBottom: `1px solid ${theme.color.grey.secondary}`,
    width: 'max-content',
  },
  children: {
    marginTop: theme.spacing(3),
  },
  mt16: {
    marginTop: theme.spacing(2),
  },
}))

export default CommonScreenLayout
