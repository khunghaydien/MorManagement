import { Fragment, useEffect } from 'react'
import { ScreenState, selectScreen, updateAlert } from '@/reducer/screen'
import { useDispatch, useSelector } from 'react-redux'
import CommonAlert from './CommonAlert'
import { AppConstant } from '@/const'

let showAlertTimeout: any = null

const ScreenAlert = () => {
  const dispatch = useDispatch()
  const { isShowAlert, alertInfo }: ScreenState = useSelector(selectScreen)

  const handleCloseAlert = () => {
    if (showAlertTimeout) {
      showAlertTimeout = null
      clearTimeout(showAlertTimeout)
    }
    dispatch(updateAlert({ isShowAlert: false }))
  }

  useEffect(() => {
    if (isShowAlert) {
      if (showAlertTimeout) {
        showAlertTimeout = null
        clearTimeout(showAlertTimeout)
      }
      showAlertTimeout = setTimeout(() => {
        handleCloseAlert()
      }, AppConstant.SNACK_BAR_DURATION)
    }
  }, [isShowAlert])
  useEffect(() => {
    return () => {
      clearTimeout(showAlertTimeout)
    }
  }, [])

  return !!isShowAlert ? (
    <CommonAlert
      {...alertInfo}
      isAutoClose
      isShow={isShowAlert}
      onClose={handleCloseAlert}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    />
  ) : (
    <Fragment />
  )
}

export default ScreenAlert
