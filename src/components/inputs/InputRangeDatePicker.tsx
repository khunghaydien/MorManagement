import { DateRange } from '@/types'
import { Box, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useState } from 'react'
import InputErrorMessage from '../common/InputErrorMessage'
import InputDatePicker from '../Datepicker/InputDatepicker'
import FormItem from '../Form/FormItem/FormItem'

type DateLabel = {
  startDate?: string
  endDate?: string
}

interface InputRangeDatePickerProps {
  error?: boolean
  dateLabel?: DateLabel
  onChange: (dateRange: DateRange) => void
}

const InputRangeDatePicker = ({
  error,
  dateLabel,
  onChange,
}: InputRangeDatePickerProps) => {
  const classes = useStyles()

  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  })

  const handleDateChange = (date: Date, key: string) => {
    const newDateRange = {
      ...dateRange,
      [key]: date,
    }
    setDateRange(newDateRange)
    onChange(newDateRange)
  }

  return (
    <Box className={classes.rootInputRangeDate}>
      <Box className={classes.container}>
        <FormItem label={dateLabel?.startDate}>
          <InputDatePicker
            error={error}
            maxDate={dateRange.endDate}
            defaultValue={dateRange.startDate}
            onChange={(date: Date) => handleDateChange(date, 'startDate')}
          />
        </FormItem>
        <Box className={classes.spaceFix}>to</Box>
        <FormItem label={dateLabel?.endDate}>
          <InputDatePicker
            error={error}
            minDate={dateRange.startDate}
            defaultValue={dateRange.endDate}
            onChange={(date: Date) => handleDateChange(date, 'endDate')}
          />
        </FormItem>
      </Box>
      {error && (
        <InputErrorMessage
          className={classes.errorMessage}
          content="Start Date cannot have the date before End Date"
        />
      )}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  rootInputRangeDate: {},
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  errorMessage: {
    marginTop: theme.spacing(1),
  },
  spaceFix: {
    marginTop: theme.spacing(2),
  },
}))

InputRangeDatePicker.defaultProps = {
  dateLabel: {
    startDate: 'Start Date',
    endDate: 'End Date',
  },
}

export default InputRangeDatePicker
