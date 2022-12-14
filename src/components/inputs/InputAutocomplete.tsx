import { OptionItem } from '@/types'
import { Autocomplete, Box, TextField, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useMemo } from 'react'
import InputErrorMessage from '@/components/common/InputErrorMessage'

interface InputAutocompleteProps {
  placeholder?: any
  width?: number | string
  defaultTags?: OptionItem[]
  listOptions: OptionItem[]
  uniqueKey?: string
  error?: boolean
  errorMessage?: any
  onChange: (tags: any) => void
  size?: 'small' | 'medium'
}

const InputAutocomplete = ({
  placeholder,
  width,
  defaultTags,
  listOptions,
  onChange,
  uniqueKey = 'value',
  error,
  errorMessage,
  size = 'small',
}: InputAutocompleteProps) => {
  const classes = useStyles()

  const handleChange = (_: any, _tags: any) => {
    onChange(_tags)
  }

  const defaultValue: OptionItem[] = useMemo(() => {
    if (!defaultTags || !defaultTags.length) return []
    const listSelected = defaultTags.map((item: any) => item[uniqueKey])
    return listOptions.filter((e: any) => listSelected.includes(e[uniqueKey]))
  }, [defaultTags, listOptions])

  return (
    <Box className={classes.rootInputAutocomplete}>
      <Autocomplete
        className={error ? classes.error : ''}
        multiple
        style={{ width }}
        options={listOptions}
        value={defaultValue}
        getOptionLabel={(option: OptionItem) =>
          option.label ? option.label : ''
        }
        renderInput={params => (
          <TextField
            placeholder={placeholder}
            className={classes.textInput}
            {...params}
          />
        )}
        onChange={handleChange}
        size={size}
      />
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
  rootInputAutocomplete: {
    width: '270px',
  },
  errorMessage: {
    marginTop: theme.spacing(0.5),
  },
  error: {
    '& fieldset': {
      borderColor: theme.color.error.primary,
    },
  },
  textInput: {
    '&	.MuiInputBase-root': {
      minHeight: theme.spacing(5),
    },
    '& input': {
      fontSize: 16,
    },
  },
}))

export default InputAutocomplete
