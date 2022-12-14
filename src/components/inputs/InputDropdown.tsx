import { OptionItem } from '@/types'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Theme,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import InputErrorMessage from '@/components/common/InputErrorMessage'
import clsx from 'clsx'

interface InputDropdownProps {
  width?: number | string
  value: string
  useLabel?: boolean
  label?: any
  placeholder?: any
  listOptions: OptionItem[]
  error?: boolean
  errorMessage?: any
  hideClearValue?: boolean
  onChange: (value: string) => void
}

const InputDropdown = ({
  value,
  listOptions,
  width,
  useLabel,
  placeholder,
  label,
  error,
  errorMessage,
  hideClearValue,
  onChange,
}: InputDropdownProps) => {
  const classes = useStyles()

  const handleInputDropdownChange = (e: SelectChangeEvent) => {
    const value = e.target.value as string
    onChange(value)
  }

  return (
    <Box
      className={clsx(classes.rootInputDropdown, value && classes.valueExist)}
      style={{ width }}
    >
      <FormControl
        className={error ? classes.error : ''}
        fullWidth
        error={error}
      >
        {useLabel && <InputLabel>{label}</InputLabel>}
        <Select
          className={classes.select}
          value={value}
          label={useLabel && label}
          displayEmpty
          onChange={handleInputDropdownChange}
          renderValue={
            value !== ''
              ? undefined
              : () => <Box className={classes.placeholder}>{placeholder}</Box>
          }
        >
          {!hideClearValue && (
            <MenuItem value="" className={classes.clearValue}>
              Clear value
            </MenuItem>
          )}
          {listOptions.map((option: OptionItem) => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {error && (
        <InputErrorMessage
          className={classes.errorMessage}
          content={errorMessage}
        />
      )}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  rootInputDropdown: {
    '& .MuiFormLabel-root': {
      transform: 'translate(14px, 10px) scale(1)',
      color: theme.color.black.tertiary,
      fontSize: 14,
      '&.Mui-focused': {
        transform: 'translate(14px, -9px) scale(0.75)',
        fontSize: 16,
      },
    },
  },
  valueExist: {
    '& .MuiFormLabel-root': {
      transform: 'translate(14px, -9px) scale(0.75)',
    },
  },
  clearValue: {
    fontWeight: '700 !important',
  },
  placeholder: {
    color: theme.color.black.tertiary,
    fontSize: 14,
  },
  errorMessage: {
    marginTop: theme.spacing(0.5),
  },
  error: {
    '& fieldset': {
      borderColor: theme.color.error.primary,
    },
  },
  select: {
    height: theme.spacing(5),
  },
}))

InputDropdown.defaultProps = {
  width: 160,
  hideClearValue: false,
}

export default InputDropdown
