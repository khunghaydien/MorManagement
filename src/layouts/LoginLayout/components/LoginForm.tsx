import { SyntheticEvent, useEffect, useState } from 'react'
import { Box, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'react-i18next'
import Typography from '@/components/common/Typography'
import LoginInputField from '@/components/login/LoginInputField'
import InputCheckbox from '@/components/inputs/InputCheckbox'
import CommonButton from '@/components/buttons/CommonButton'
import {
  EventInput,
  LoginFormControls,
  LoginFormErrors,
  LoginFormMessageErrors,
} from '@/types'
import { LangConstant } from '@/const'

interface LoginFormProps {
  formErrors: LoginFormErrors
  messageErrors: LoginFormMessageErrors
  onSubmit: (loginFormControls: LoginFormControls) => void
  onChange: (type: string) => void
}

const LoginForm = ({
  formErrors,
  messageErrors,
  onSubmit,
  onChange,
}: LoginFormProps) => {
  const classes = useStyles()
  const { t: i18Login } = useTranslation(LangConstant.NS_LOGIN)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail)
    onChange('email')
  }

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword)
    onChange('password')
  }

  const handleLogin = (e: SyntheticEvent) => {
    e.preventDefault()
    onSubmit({
      email,
      password,
    })
  }

  return (
    <Box className={classes.rootLoginForm}>
      <form onSubmit={handleLogin}>
        <Typography className={classes.title}>
          {i18Login('TXT_LOGIN_FORM_TITLE')}
        </Typography>
        <Box className={classes.formControls}>
          <LoginInputField
            placeholder={i18Login('PLH_EMAIL')}
            error={formErrors.emailError}
            errorMessage={messageErrors.emailErrorMessage}
            value={email}
            onChange={handleEmailChange}
          />
          <LoginInputField
            type={showPassword ? 'text' : 'password'}
            placeholder={i18Login('PLH_PASSWORD')}
            error={formErrors.passwordError}
            errorMessage={messageErrors.passwordErrorMessage}
            value={password}
            onChange={handlePasswordChange}
          />
          <InputCheckbox
            label={i18Login('LB_SHOW_PASSWORD')}
            checked={showPassword}
            onClick={handleTogglePassword}
          />
          <CommonButton
            type="submit"
            disabled={formErrors.emailError || formErrors.passwordError}
            width={384}
            height={48}
          >
            {i18Login('LB_LOGIN')}
          </CommonButton>
        </Box>
      </form>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  rootLoginForm: {
    background: theme.color.white,
    borderRadius: theme.spacing(3),
    padding: theme.spacing(5, 9),
    boxShadow: '0px 6px 1px rgba(63, 48, 37, 0.25)',
  },
  title: {
    color: theme.color.black.primary,
    fontSize: 24,
    fontWeight: 700,
    textAlign: 'center',
  },
  formControls: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
}))

export default LoginForm
