import ConditionalRender from '@/components/ConditionalRender'
import ModalDeleteRecords from '@/components/modal/ModalDeleteRecords'
import { PathConstant } from '@/const'
import modules from '@/modules/routes'
import { AuthState, logout, selectAuth } from '@/reducer/auth'
import { updateLoading, updateModuleName } from '@/reducer/screen'
import { AppDispatch } from '@/store'
import morLogoSingle from '@/ui/images/mor-logo-single.png'
import { Logout, ArrowBack, ArrowForward } from '@mui/icons-material'
import { Box, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

interface ILeftNavigation {
  isShowSideBar: boolean
  onShowSideBar: () => void
}

const LeftNavigation = ({ isShowSideBar, onShowSideBar }: ILeftNavigation) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { pathname } = useLocation()

  const { permissions }: AuthState = useSelector(selectAuth)

  const [isShowModalLogout, setIsShowModalLogout] = useState(false)

  const handleNavigateToHomePage = () => {
    navigate(PathConstant.MAIN)
  }

  const handleNavigateToModule = (moduleName: string, pathNavigate: string) => {
    const isCurrentModule: boolean = pathname.includes(pathNavigate)
    if (!isCurrentModule) {
      navigate(pathNavigate)
      dispatch(updateModuleName(moduleName))
    }
  }

  const handleLogout = () => {
    dispatch(updateLoading(true))
    dispatch(logout())
      .unwrap()
      .then(() => {
        window.location.href = PathConstant.LOGIN
      })
    dispatch(updateLoading(false))
  }

  return (
    <Box className={clsx(classes.rootLeftNavigation, 'position-rel')}>
      <Box
        className={clsx(classes.logoContainer, 'center-root')}
        onClick={handleNavigateToHomePage}
      >
        <img src={morLogoSingle} />
      </Box>
      <Box className={classes.modules}>
        {/* <Avatar onClick={handleAvatarClick} /> */}
        {modules.map(
          md =>
            permissions[md.role] && (
              <Box
                title={md.name}
                key={md.id}
                className={classes.module}
                onClick={() => handleNavigateToModule(md.name, md.pathNavigate)}
              >
                <md.Icon
                  className={clsx(
                    classes.moduleIcon,
                    pathname.includes(md.name) && 'active'
                  )}
                />
              </Box>
            )
        )}
        <Box
          className={clsx(classes.modules, classes.toggleMenu)}
          title="toggle menu"
          onClick={onShowSideBar}
        >
          <ConditionalRender
            conditional={isShowSideBar}
            fallback={<ArrowBack className={classes.logoutImg} />}
          >
            <ArrowForward className={classes.logoutImg} />
          </ConditionalRender>
        </Box>
        <Box
          className={clsx(
            classes.modules,
            classes.moduleLogout,
            classes.moduleResponsive
          )}
          title="logout"
          onClick={() => setIsShowModalLogout(true)}
        >
          <Logout className={classes.logoutImg} />
        </Box>
        <ModalDeleteRecords
          labelSubmit="Log out"
          open={isShowModalLogout}
          onClose={() => setIsShowModalLogout(false)}
          onSubmit={handleLogout}
          titleMessage="Logout"
          subMessage="Do you really want to log out?"
        />
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => {
  const borderGrey = `1px solid ${theme.color.grey.secondary}`
  return {
    moduleLogout: {
      cursor: 'pointer',
      margin: 'unset !important',
    },
    logoutImg: {
      color: theme.color.black.secondary,
      width: '24px !important',
      height: '24px !important',
      transform: 'rotate(180deg)',
    },
    rootLeftNavigation: {
      zIndex: '2',
      width: theme.spacing(9),
      minWidth: theme.spacing(9),
      height: '100%',
      background: theme.color.white,
      borderRight: borderGrey,
    },
    logoContainer: {
      height: theme.spacing(9),
      borderBottom: borderGrey,
      cursor: 'pointer',
      '& img': {
        width: theme.spacing(5),
      },
    },
    modules: {
      marginTop: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: theme.spacing(3),
    },
    module: {
      cursor: 'pointer',
    },
    moduleResponsive: {
      cursor: 'pointer',
      position: 'absolute',
      bottom: theme.spacing(2),
      width: '100%',
    },
    toggleMenu: {
      cursor: 'pointer',
      marginTop: theme.spacing(10),
    },
    moduleIcon: {
      fontSize: '32px !important',
      color: theme.color.black.secondary,
      '&.active': {
        color: theme.color.blue.primary,
      },
      '&:hover': {
        color: theme.color.blue.primary,
      },
    },
  }
})

export default LeftNavigation
