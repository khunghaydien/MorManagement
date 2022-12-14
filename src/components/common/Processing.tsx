import clsx from 'clsx'
import { Backdrop, CircularProgress, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

interface ProcessingProps {
  open: boolean
  className?: string
}

const Processing = ({ open, className, ...otherProps }: ProcessingProps) => {
  const classes = useStyles()
  return (
    <Backdrop
      open={open}
      className={clsx(classes.backdrop, className)}
      {...otherProps}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    zIndex: 9999,
    color: theme.color.white,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
}))

Processing.defaultProps = {
  open: false,
}

export default Processing
