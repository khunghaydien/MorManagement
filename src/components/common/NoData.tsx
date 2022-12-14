import { LangConstant } from '@/const'
import { Box, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

function NoData({ type }: any) {
  const { t: i18Common } = useTranslation(LangConstant.NS_COMMON)
  const classes = useStyles()

  return (
    <Box className={clsx(classes.rootNoData)}>
      {i18Common('MSG_EMPTY_DATA')}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  rootNoData: {
    width: '100%',
    height: '100%',
    minHeight: theme.spacing(30),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& .class2': {
      color: 'red',
    },
  },
  class2: {
    color: 'red',
  },
}))

export default NoData
