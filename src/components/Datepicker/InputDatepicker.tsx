import { LangConstant } from '@/const'
import { Theme } from '@mui/material'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@mui/styles'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface PropTypes {
  placeholder?: string
  onChange?: Function
  className?: string
  disabled?: boolean
  inputRef?: any
  maxDate?: Date | null
  minDate?: Date | null
  defaultValue?: Date | null
  value?: Date
  inputFormat?: string
  error?: boolean
}

export default function InputDatePicker(props: PropTypes) {
  const {
    placeholder,
    onChange = () => {},
    value,
    defaultValue,
    inputFormat = 'DD/MM/YYYY',
    error,
    ...other
  } = props
  const classes = useStyles()
  const { t: i18Common } = useTranslation(LangConstant.NS_COMMON)

  const [valueLocal, setValueLocal] = useState<Date | null>(null)

  const onDatePickerChange = (newValue: any) => {
    let dateSelected = null
    if (newValue && newValue.isValid()) {
      dateSelected = newValue.toDate()
    }
    setValueLocal(newValue)
    onChange(dateSelected)
  }

  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (defaultValue) {
      setValueLocal(defaultValue)
    }
  }, [defaultValue])

  useEffect(() => {
    if (value) {
      setValueLocal(value)
    }
  }, [value])

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        label=""
        value={valueLocal}
        onChange={onDatePickerChange}
        renderInput={params => (
          <TextField
            {...params}
            inputProps={{
              ...params.inputProps,
              placeholder: i18Common('PLH_SELECT_DATE') as string,
            }}
          />
        )}
        inputFormat={inputFormat}
        className={clsx(classes.rootDatePicker, error ? classes.error : '')}
        inputRef={inputRef}
        {...other}
      />
    </LocalizationProvider>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  rootDatePicker: {
    width: theme.spacing(20),
    height: theme.spacing(5),
    '& > div': {
      height: '100%',
    },
    '& input': {
      padding: '8px 14px',
      fontSize: 14,
      lineHeight: 1,
      color: theme.color.black.primary,
    },
  },
  error: {
    '& fieldset': {
      borderColor: theme.color.error.primary,
    },
  },
}))
