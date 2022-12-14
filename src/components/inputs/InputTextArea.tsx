import { TextareaAutosize, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import { CSSProperties, useEffect, useMemo } from 'react'

interface PropType {
  // label: string
  placeholder?: any
  defaultValue?: string | null
  onChange?: Function
  style?: CSSProperties
  minRows?: number
  maxRows?: number
  className?: string
  height?: number
  resize?: 'both' | 'vertical' | 'horizontal' | 'initial' | 'unset' | 'none'
}

export default function InputTextArea(props: PropType) {
  const {
    placeholder,
    minRows,
    maxRows,
    defaultValue,
    style,
    onChange = () => {},
    height,
    className,
    resize = 'vertical',
    ...rest
  } = props

  const classes = useStyles()
  const customStyle = { ...style, height, resize }

  const localDefaultValue: string = useMemo(() => {
    return defaultValue ? defaultValue : ''
  }, [defaultValue])

  return (
    <TextareaAutosize
      placeholder={placeholder}
      minRows={minRows}
      maxRows={maxRows}
      defaultValue={localDefaultValue}
      onChange={e => onChange(e)}
      className={clsx(classes.rootInputTextArea, 'scrollbar', className)}
      style={customStyle}
      {...rest}
    ></TextareaAutosize>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  rootInputTextArea: {
    width: '100%',
    height: theme.spacing(19.25),
    padding: theme.spacing(1.5, 1.5),
    fontSize: 14,
    lineHeight: 1.4,
    color: theme.color.black.primary,
    borderColor: theme.color.grey.primary,
    borderRadius: theme.spacing(0.5),
    overflow: 'auto !important',
    minHeight: 50,
    '& *': {
      fontFamily: 'Roboto',
    },
    '&::placeholder': {
      color: theme.color.black.tertiary,
    },
    '&::-webkit-input-placeholder': {
      color: `${theme.color.black.tertiary} !important`,
    },
  },
}))
