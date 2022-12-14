import { Button, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'

interface CommonButtonProps {
  disabled?: boolean
  children: string
  height?: number
  width?: number
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | undefined
  variant?: 'text' | 'contained' | 'outlined' | undefined
  className?: string
  onClick?: () => void
}

const CommonButton = ({
  disabled,
  height,
  width,
  children,
  color,
  variant,
  className,
  onClick,
  ...otherProps
}: CommonButtonProps) => {
  const classes = useStyles({
    height,
    width,
  })
  return (
    <Button
      type="button"
      className={clsx(classes.rootCommonButton, className)}
      variant={variant}
      disabled={disabled}
      color={color}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </Button>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  rootCommonButton: {
    height: (props: any) => `${props.height}px`,
    lineHeight: (props: any) => `${props.height}px`,
    width: (props: any) => `${props.width}px`,
    color: theme.color.white,
    borderRadius: theme.spacing(0.5),
    fontWeight: '700 !important',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all .3s',
    '&:hover': {
      background: `${theme.color.orange.primary} !important`,
    },
  },
}))

CommonButton.defaultProps = {
  width: 150,
  height: 32,
  variant: 'contained',
  type: 'button',
}

export default CommonButton
