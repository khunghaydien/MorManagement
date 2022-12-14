import { Box, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import defaultAvatar from '@/ui/images/default-avatar.png'

interface AvatarProps {
  src?: string
  onClick?: () => void
}

const Avatar = ({ src, onClick }: AvatarProps) => {
  const classes = useStyles()

  return (
    <Box className={classes.rootAvatar} onClick={onClick}>
      <img src={src || defaultAvatar} />
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  rootAvatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    cursor: 'pointer',
    '& img': {
      borderRadius: '50%',
    },
  },
}))

export default Avatar
