import { LangConstant } from '@/const'
import { EventInput } from '@/types'
import { Box, TextField, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import { ReactElement, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import InputErrorMessage from '../common/InputErrorMessage'

interface PropTypes {
  type?: string
  name?: string
  label?: any
  require?: boolean
  placeholder?: any
  value?: string | null
  onChange?: Function
  maxLength?: number
  errorMessage?: string
  readonly?: boolean
  iconLeft?: ReactElement
  error?: boolean
}

function InputTextLabel(props: PropTypes) {
  const {
    type = 'text',
    name,
    label,
    require,
    placeholder,
    value,
    onChange = () => {},
    errorMessage = '',
    readonly,
    iconLeft,
    error
  } = props
  const classes = useStyles()
  const { t: i18nCommon } = useTranslation(LangConstant.NS_COMMON)

  const inValid = useMemo(() => {
    return !!require ? !!error : !!error && !!errorMessage
  }, [errorMessage, error])

  const localValue: string = useMemo(() => {
    return value ? value : ''
  }, [value])

  const handleChange = (e: EventInput) => {
    onChange(e)
  }

  return (
    <Box className={classes.rootInputTextLabel}>
      {label && (
        <label htmlFor={`form-input-${name}`} className={clsx(classes.label)}>
          {label}
          {require ? <span className={clsx(classes.mark)}>*</span> : null}
        </label>
      )}
      <Box
        className={clsx(classes.inputWrapper, inValid && classes.errorInput)}
      >
        {iconLeft && iconLeft}
        <TextField
          label=""
          variant="outlined"
          type={type}
          name={name}
          id={'form-input-' + name}
          placeholder={placeholder}
          className={clsx(classes.input, readonly && classes.disabled)}
          value={localValue}
          disabled={readonly}
          error={inValid}
          onChange={handleChange}
        />
      </Box>
      {inValid && (
        <InputErrorMessage
          className={classes.errorMessage}
          content={
            errorMessage ? errorMessage : i18nCommon('MSG_REQUIRE_FIELD')
          }
        />
      )}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  rootInputTextLabel: {
    color: theme.color.black.primary,
    fontSize: theme.typography.fontSize,
    lineHeight: '14px',
    width: '100%',
  },
  inputWrapper: {
    height: theme.spacing(5),

    '& input': {
      color: theme.color.black.primary,
      fontSize: theme.typography.fontSize,
      lineHeight: '14px',
      borderRadius: theme.spacing(0.5),
      height: 40,
      padding: theme.spacing(0, 1.5),
    },
  },
  label: {
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  mark: {
    color: theme.color.error.secondary,
    marginLeft: theme.spacing(0.5),
  },
  input: {
    width: '100%',
    height: '100%',
    outline: 'none',
    border: 'none',
    borderRadius: theme.spacing(0.5),
  },
  errorInput: {
    borderColor: theme.color.error.primary,
  },
  disabled: {
    cursorPointer: 'none',
    background: theme.color.grey.secondary,
  },
  errorMessage: {
    marginTop: theme.spacing(1),
  },
}))

export default InputTextLabel
