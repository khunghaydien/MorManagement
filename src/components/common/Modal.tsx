import { ReactNode } from 'react'
import { Box, Dialog, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import CloseIcon from '../icons/CloseIcon'
import Typography from './Typography'
import CommonButton from '../buttons/CommonButton'
import { useTranslation } from 'react-i18next'

interface ModalProps {
  open: boolean
  title?: any
  width?: number
  cancelDisabled?: boolean
  submitDisabled?: boolean
  labelSubmit?: any
  children: ReactNode
  onClose: () => void
  onSubmit: () => void
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | undefined
}

const Modal = ({
  color,
  open,
  title,
  width,
  submitDisabled,
  labelSubmit,
  children,
  onClose,
  onSubmit,
}: ModalProps) => {
  const classes = useStyles({ color })
  const { t: i18 } = useTranslation()
  return (
    <Dialog className={classes.rootModal} open={open}>
      <Box className={classes.modal} style={{ width }}>
        <Box className={classes.modalHeader}>
          <Typography className={classes.title}>{title}</Typography>
          <CloseIcon onClick={onClose} />
        </Box>
        <Box className={classes.modalContent}>{children}</Box>
        <Box className={classes.modalFooter}>
          <CommonButton
            className={classes.buttonCancel}
            color="inherit"
            width={80}
            onClick={onClose}
          >
            {i18('LB_CANCEL')}
          </CommonButton>
          <CommonButton
            className={classes.btnSubmit}
            color={color}
            disabled={submitDisabled}
            onClick={onSubmit}
          >
            {labelSubmit}
          </CommonButton>
        </Box>
      </Box>
    </Dialog>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  rootModal: {},
  modal: {
    borderRadius: '4px',
    borderTop: (props: any) =>
      `6px solid ${
        props.color === 'error'
          ? theme.color.error.primary
          : theme.color.blue.primary
      }`,
  },
  modalHeader: {
    height: theme.spacing(7),
    padding: theme.spacing(0, 1.5, 0, 3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: theme.color.grey.tertiary,
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
  },
  modalContent: {
    padding: theme.spacing(2, 3),
    fontSize: `${theme.spacing(2)}`,
  },
  modalFooter: {
    padding: theme.spacing(2, 3),
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(2),
    background: theme.color.grey.tertiary,
  },
  buttonCancel: {
    padding: theme.spacing(1, 2),
    cursor: 'pointer',
    color: `${theme.color.black.secondary} !important`,
  },
  btnSubmit: {
    width: 'max-content !important',
  },
}))

Modal.defaultProps = {
  width: 600,
  labelSubmit: 'BUTTON',
}

export default Modal
