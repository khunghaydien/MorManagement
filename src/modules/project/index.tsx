import { PathConstant } from '@/const'
import { Navigate, useLocation } from 'react-router-dom'

const ModuleProject = () => {
  const location = useLocation()
  return (
    <Navigate
      to={PathConstant.PROJECT_LIST}
      state={{ from: location }}
      replace
    />
  )
}

export default ModuleProject
