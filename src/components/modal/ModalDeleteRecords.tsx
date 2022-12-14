import { Box, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Modal from '../common/Modal'
import Typography from '../common/Typography'
import InputCheckbox from '../inputs/InputCheckbox'

interface ModalDeleteRecordsProps {
  titleMessage: string
  subMessage: string
  open: boolean
  labelSubmit?: any
  onClose: () => void
  onSubmit: () => void
}

const ModalDeleteRecords = ({
  open,
  onClose,
  labelSubmit,
  onSubmit,
  titleMessage,
  subMessage,
}: ModalDeleteRecordsProps) => {
  const classes = useStyles()
  const { t: i18 } = useTranslation()

  const [isConfirmedDelete, setIsConfirmedDelete] = useState(false)

  const handleClose = () => {
    setIsConfirmedDelete(false)
    onClose()
  }

  const handleSubmit = () => {
    handleClose()
    onSubmit()
  }

  const handleToggleIsConfirmedDelete = () => {
    setIsConfirmedDelete(!isConfirmedDelete)
  }

  return (
    <Modal
      open={open}
      title={titleMessage}
      labelSubmit={labelSubmit || 'Delete'}
      color="error"
      submitDisabled={!isConfirmedDelete}
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <Box className={classes.foreground}>
        <Typography className={classes.description}>{subMessage}</Typography>
      </Box>
      <Box className={classes.confirmed}>
        <InputCheckbox
          checked={isConfirmedDelete}
          label={i18('LB_CONFIRMED_DELETE')}
          onClick={handleToggleIsConfirmedDelete}
        />
      </Box>
    </Modal>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  description: {
    fontSize: '16px !important',
  },
  foreground: {
    background: theme.color.black.porcelain,
    padding: theme.spacing(2, 3),
  },
  confirmed: {
    marginTop: theme.spacing(2),
  },
}))

export default ModalDeleteRecords
