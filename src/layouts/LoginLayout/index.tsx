import ScreenAlert from '@/components/alerts/ScreenAlert'
import LogoCompany from '@/components/common/LogoCompany'
import Processing from '@/components/common/Processing'
import { LangConstant, PathConstant } from '@/const'
import { getSelfInfo, login, selectAuth } from '@/reducer/auth'
import { updateAlert } from '@/reducer/screen'
import { AppDispatch } from '@/store'
import { LoginFormControls } from '@/types'
import { validateEmail, validatePassword } from '@/utils'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import LoginTheme from './components/LoginTheme'

const LoginLayout = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch<AppDispatch>()
  const { t: i18 } = useTranslation()
  const { t: i18Login } = useTranslation(LangConstant.NS_LOGIN)
  const { token, permissions } = useSelector(selectAuth)

  const roles = !!Object.keys(permissions).length

  const [hasLogin, setHasLogin] = useState(false)

  const [loginFormErrors, setLoginFormErrors] = useState({
    emailError: false,
    passwordError: false,
  })
  const [loginFormMessageErrors, setLoginFormMessageErrors] = useState({
    emailErrorMessage: '',
    passwordErrorMessage: '',
  })

  const mapErrorMessageToState = ({ email, password }: LoginFormControls) => {
    if (!email.trim()) {
      setLoginFormMessageErrors(prev => ({
        ...prev,
        emailErrorMessage: i18('MSG_REQUIRE_FIELD'),
      }))
    } else {
      setLoginFormMessageErrors(prev => ({
        ...prev,
        emailErrorMessage: i18Login('MSG_MAIL_ERROR'),
      }))
    }
    if (!password.trim()) {
      setLoginFormMessageErrors(prev => ({
        ...prev,
        passwordErrorMessage: i18('MSG_REQUIRE_FIELD'),
      }))
    } else {
      setLoginFormMessageErrors(prev => ({
        ...prev,
        passwordErrorMessage: i18Login('MSG_PASSWORD_ERROR'),
      }))
    }
  }
  const requestLogin = ({ email, password }: LoginFormControls) => {
    setLoginFormErrors({
      emailError: false,
      passwordError: false,
    })
    setLoginFormMessageErrors({
      emailErrorMessage: '',
      passwordErrorMessage: '',
    })
    const loginAction = login({ email, password })
    const alertActionSuccess = updateAlert({
      isShowAlert: true,
      alertInfo: {
        type: 'success',
        message: i18Login('MSG_LOGIN_SUCCESS'),
      },
    })
    const alertActionFailure = updateAlert({
      isShowAlert: true,
      alertInfo: {
        type: 'error',
        message: i18Login('MSG_LOGIN_FAILED'),
      },
    })
    dispatch(loginAction)
      .unwrap()
      .then(() => {
        dispatch(alertActionSuccess)
        navigateToHomePage()
      })
      .catch(() => {
        dispatch(alertActionFailure)
      })
  }
  const navigateToHomePage = () => {
    const from = location.state?.from?.pathname || '/'
    navigate(from, { replace: true })
  }
  const handleFormLoginChange = (type: string) => {
    type === 'email' &&
      setLoginFormErrors(prev => ({ ...prev, emailError: false }))
    type === 'password' &&
      setLoginFormErrors(prev => ({ ...prev, passwordError: false }))
  }
  const handleLogin = ({ email, password }: LoginFormControls) => {
    const emailError = !validateEmail(email.trim())
    const passwordError = !validatePassword(password.trim())
    const loginFormControlsInvalid = emailError || passwordError
    if (loginFormControlsInvalid) {
      setLoginFormErrors({
        emailError,
        passwordError,
      })
      mapErrorMessageToState({ email, password })
    } else {
      requestLogin({
        email: email.trim(),
        password: password.trim(),
      })
    }
  }

  useEffect(() => {
    if (!token) {
      setHasLogin(true)
      return
    }
    if (roles) {
      navigate(PathConstant.MAIN)
      return
    }
    dispatch(getSelfInfo())
      .unwrap()
      .finally(() => {
        setHasLogin(true)
      })
  }, [roles])

  return !hasLogin ? (
    <Processing open />
  ) : (
    <Fragment>
      <ScreenAlert />
      <LoginTheme className="display-flex">
        <Box className={classes.width50}>
          <LogoCompany />
        </Box>
        <Box className={clsx(classes.width50, 'center-root')}>
          <LoginForm
            formErrors={loginFormErrors}
            messageErrors={loginFormMessageErrors}
            onSubmit={handleLogin}
            onChange={handleFormLoginChange}
          />
        </Box>
      </LoginTheme>
    </Fragment>
  )
}
const useStyles = makeStyles(() => ({
  width50: {
    width: '50%',
  },
}))
export default LoginLayout
