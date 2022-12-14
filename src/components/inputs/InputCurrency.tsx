import CurrencyInput from 'react-currency-input-field'

interface InputCurrencyProps {
  value: string | number | undefined
  placeholder?: any
  error?: boolean
  onChange: (value: string) => void
}

const InputCurrency = ({
  value,
  placeholder,
  error,
  onChange,
}: InputCurrencyProps) => {
  const handleChange = (newValue: any) => {
    onChange(newValue)
  }

  return (
    <CurrencyInput
      className={`currency-input ${error && 'error'}`}
      allowDecimals
      placeholder={placeholder}
      suffix=" VND"
      value={value}
      onValueChange={handleChange}
    />
  )
}

export default InputCurrency
