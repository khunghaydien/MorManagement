import { Add } from '@mui/icons-material'
import { Button, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { ReactElement } from 'react'
import clsx from 'clsx'

interface ButtonAddWithIconProps {
  Icon?: ReactElement
  children: any
  onClick?: () => void
  height?: number
  className?: string
}

const ButtonAddWithIcon = ({
  Icon,
  height,
  children,
  className,
  onClick,
}: ButtonAddWithIconProps) => {
  const classes = useStyles({ height })

  return (
    <Button
      className={clsx(classes.rootButtonAddWithIcon, className)}
      variant="contained"
      data-title="btn"
      onClick={onClick}
    >
      {Icon ? Icon : <Add data-title="icon-add" />}
      <span className={classes.labelAdd}>{children}</span>
    </Button>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  rootButtonAddWithIcon: {
    height: ({ height }: any) => height,
    '&:hover': {
      background: `${theme.color.orange.primary} !important`,
    },
  },
  labelAdd: {
    marginLeft: theme.spacing(0.5),
  },
  labelAction: {
    marginRight: theme.spacing(0.5),
  },
}))

ButtonAddWithIcon.defaultProps = {
  height: 40,
}

export default ButtonAddWithIcon
