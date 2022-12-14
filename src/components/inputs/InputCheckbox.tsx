import { Box, Checkbox, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'

interface InputCheckboxProps {
  label: any
  checked: boolean
  indeterminate?: boolean
  className?: string
  onClick: () => void
}

const InputCheckbox = ({
  label,
  checked,
  indeterminate,
  className,
  onClick,
}: InputCheckboxProps) => {
  const classes = useStyles({ label })
  return (
    <Box
      className={clsx(classes.rootInputCheckbox, className)}
      onClick={onClick}
    >
      <Checkbox
        className={classes.checkbox}
        checked={checked}
        indeterminate={indeterminate}
      />
      {!!label && <Box className={classes.label}>{label}</Box>}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  rootInputCheckbox: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    margin: '0 !important',
    '& .Mui-checked': {
      color: `${theme.color.blue.primary} !important`,
    },
  },
  checkbox: {
    padding: '0 !important',
    marginRight: (props: any) => (props.label ? '4px !important' : '0'),
    color: `${theme.color.black.tertiary} !important`,
  },
  label: {},
}))

InputCheckbox.defaultProps = {
  label: 'Label',
  checked: false,
  indeterminate: false,
}

export default InputCheckbox
