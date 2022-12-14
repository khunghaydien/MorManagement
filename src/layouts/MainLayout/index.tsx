import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import ScreenAlert from '@/components/alerts/ScreenAlert'
import Processing from '@/components/common/Processing'
import { PathConstant } from '@/const'
import { AuthState, getSelfInfo, selectAuth } from '@/reducer/auth'
import { AppDispatch } from '@/store'
import { Box, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import AllRoutesOfFeatures from './components/AllRoutesOfFeatures'
import LeftNavigation from './components/LeftNavigation'
import Sidebar from './components/Sidebar'
import { ScreenState, selectScreen } from '@/reducer/screen'
import { SCREEN } from '@/const/app.const'

const MainLayout = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const dispatch = useDispatch<AppDispatch>()
  const { token, permissions }: AuthState = useSelector(selectAuth)
  const { isLoading }: ScreenState = useSelector(selectScreen)

  const [isShowSideBar, setIsShowSideBar] = useState(false)
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  })
  const [hasRequestProfile, setHasRequestProfile] = useState(false)

  const isRoles = useMemo(() => {
    return !!Object.keys(permissions).length
  }, [permissions])

  const useSidebar = useMemo(() => {
    return pathname !== PathConstant.MAIN
  }, [pathname])

  if (!token) {
    window.location.href = PathConstant.LOGIN
  }
  const handleShowSideBar = () => {
    setIsShowSideBar(!isShowSideBar)
  }

  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (dimensions.width > SCREEN) {
      setIsShowSideBar(true)
    } else {
      setIsShowSideBar(false)
    }
  }, [dimensions])

  useEffect(() => {
    if (!token) return
    if (!isRoles && hasRequestProfile) {
      navigate(PathConstant.LOGIN)
      return
    }
    !isRoles &&
      dispatch(getSelfInfo()).finally(() => {
        setHasRequestProfile(true)
      })
  }, [hasRequestProfile])

  return !isRoles ? (
    <Processing open />
  ) : (
    <Fragment>
      <ScreenAlert />
      <Processing open={isLoading} />
      <Box className={classes.rootMainLayout}>
        <LeftNavigation
          isShowSideBar={isShowSideBar}
          onShowSideBar={handleShowSideBar}
        />
        {useSidebar && <Sidebar isShowSideBar={isShowSideBar} />}
        <Box className={classes.pages}>
          <AllRoutesOfFeatures />
        </Box>
      </Box>
    </Fragment>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  rootMainLayout: {
    padding: 0,
    display: 'flex',
    height: '100vh',
  },
  pages: {
    width: '100%',
    flex: 1,
    overflow: 'auto',
  },
}))

export default MainLayout
