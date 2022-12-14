import Typography from '@/components/common/Typography'
import { Box, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import { ReactNode } from 'react'

interface PropTypes {
  title: string
  padding?: number
  children?: ReactNode
  className?: string
  classNameTitle?: string
}

function CardForm(props: PropTypes) {
  const { title, padding, children, classNameTitle, className } = props

  const classes = useStyles()

  return (
    <Box className={clsx(classes.wrapper, className)} style={{ padding }}>
      <Typography className={clsx(classes.formTitle, classNameTitle)}>
        {title}
      </Typography>
      {children}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    padding: theme.spacing(3),
    border: `1px solid ${theme.color.grey.primary}`,
    borderRadius: theme.spacing(0.5),

    '&:nth-child(n + 2)': {
      marginTop: theme.spacing(3),
    },
  },
  formTitle: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
    borderRadius: theme.spacing(0.5),
    background: theme.color.grey.tertiary,
    color: theme.color.black.primary,
    fontSize: 18,
    fontWeight: 700,
    lineHeight: '24px',
    height: theme.spacing(7),
  },
}))

export default CardForm
