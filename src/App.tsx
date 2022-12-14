import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { AuthState, selectAuth } from './reducer/auth'
import { AppConstant, PathConstant } from '@/const'
import NotFound from '@/components/common/NotFound'
import LoginLayout from '@/layouts/LoginLayout'
import MainLayout from '@/layouts/MainLayout'

const App = () => {
  const { token }: AuthState = useSelector(selectAuth)
  
  useEffect(() => {
    if (!token) {
      localStorage.removeItem(AppConstant.USER_LOCAL)
    }
  }, [token])

  return (
    <Routes>
      <Route path={PathConstant.LOGIN} element={<LoginLayout />} />
      <Route path={PathConstant.MAIN + '*'} element={<MainLayout />} />
      <Route path={PathConstant.NOT_FOUND} element={<NotFound />} />
    </Routes>
  )
}

export default App
