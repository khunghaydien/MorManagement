import { AppConstant } from '@/const'
import {
  Alert,
  AlertColor,
  AlertTitle,
  Snackbar,
  Typography,
  useTheme,
} from '@mui/material'

interface CommonAlertProps {
  isShow: boolean
  isAutoClose: boolean
  type: any
  message: string
  title: string
  anchorOrigin: any
  onClose: () => void
}

const CommonAlert = ({
  isShow,
  type,
  onClose,
  anchorOrigin,
  message,
  isAutoClose,
  title,
}: CommonAlertProps) => {
  const theme = useTheme()
  return (
    <Snackbar
      open={isShow}
      autoHideDuration={isAutoClose ? AppConstant.SNACK_BAR_DURATION : null}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert
        onClose={onClose}
        variant="filled"
        severity={type}
        style={{ zIndex: theme.zIndex.appBar + 100 }}
      >
        {title && <AlertTitle color="inherit">{title}</AlertTitle>}
        <Typography
          variant="body2"
          component="p"
          color="inherit"
          dangerouslySetInnerHTML={{
            __html: message,
          }}
        />
      </Alert>
    </Snackbar>
  )
}

export default CommonAlert
