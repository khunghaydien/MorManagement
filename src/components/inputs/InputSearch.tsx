import { EventInput } from '@/types'
import { Search } from '@mui/icons-material'
import { InputAdornment, TextField, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

interface InputSearchProps {
  label?: any
  value: string
  placeholder?: any
  onChange: (newVal: string) => void
}

const InputSearch = ({
  value,
  label,
  placeholder = '',
  onChange,
}: InputSearchProps) => {
  const classes = useStyles()

  return (
    <TextField
      placeholder={placeholder}
      className={classes.rootInputSearch}
      value={value}
      variant="outlined"
      label={label}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
      onChange={(e: EventInput) => onChange(e.target.value)}
    />
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  rootInputSearch: {
    width: 320,
    height: theme.spacing(5),
    '& .MuiInputBase-root': {
      height: theme.spacing(5),
    },
  },
}))

export default InputSearch
