import { Box, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'

interface InputErrorMessageProps {
  content: string
  className?: string
}

const InputErrorMessage = ({ content, className }: InputErrorMessageProps) => {
  const classes = useStyles()
  return (
    <Box className={clsx(classes.rootInputErrorMessage, className)}>
      {content}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  rootInputErrorMessage: {
    fontSize: 12,
    color: theme.color.error.primary,
  },
}))

export default InputErrorMessage
