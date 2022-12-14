import { PathConstant } from '@/const'
import { Navigate, useLocation } from 'react-router-dom'

const ModuleCustomer = () => {
  const location = useLocation()
  return (
    <Navigate
      to={PathConstant.CUSTOMER_LIST}
      state={{ from: location }}
      replace
    />
  )
}

export default ModuleCustomer
