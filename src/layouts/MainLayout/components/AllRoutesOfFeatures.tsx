import Home from '@/components/common/Home'
import PrivateRoute from '@/components/common/PrivateRoute'
import { PathConstant } from '@/const'
import { ModuleCustomer } from '@/modules'
import {
  CustomerDetail,
  CustomerList,
  PartnerDetail,
  PartnerList,
} from '@/modules/customer/pages'
import CustomerDashboard from '@/modules/customer/pages/customer-dashboard'
import ModuleProject from '@/modules/project'
import { ProjectList } from '@/modules/project/pages'
import { AuthState, selectAuth } from '@/reducer/auth'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'

const AllRoutesOfFeatures = () => {
  const { permissions }: AuthState = useSelector(selectAuth)

  const {
    useCustomerList,
    useCustomerDetail,
    useCustomerCreate,
    usePartnerList,
    usePartnerDetail,
    usePartnerCreate,
    useProjectList,
  } = permissions

  return (
    <Routes>
      <Route path={PathConstant.MAIN} element={<Home />} />
      <Route
        path={PathConstant.MODULE_CUSTOMER}
        element={
          <PrivateRoute isAuth={useCustomerList}>
            <ModuleCustomer />
          </PrivateRoute>
        }
      />
      <Route
        path={PathConstant.CUSTOMER_DASHBOARD}
        element={
          <PrivateRoute isAuth={useCustomerList}>
            <CustomerDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path={PathConstant.CUSTOMER_LIST}
        element={
          <PrivateRoute isAuth={useCustomerList}>
            <CustomerList />
          </PrivateRoute>
        }
      />
      <Route
        path={PathConstant.CUSTOMER_DETAIL}
        element={
          <PrivateRoute isAuth={useCustomerDetail}>
            <CustomerDetail />
          </PrivateRoute>
        }
      />
      <Route
        path={PathConstant.CUSTOMER_CREATE}
        element={
          <PrivateRoute isAuth={useCustomerCreate}>
            <CustomerDetail />
          </PrivateRoute>
        }
      />
      <Route
        path={PathConstant.CUSTOMER_PARTNER_LIST}
        element={
          <PrivateRoute isAuth={usePartnerList}>
            <PartnerList />
          </PrivateRoute>
        }
      />
      <Route
        path={PathConstant.CUSTOMER_PARTNER_DETAIL}
        element={
          <PrivateRoute isAuth={usePartnerDetail}>
            <PartnerDetail isDetailPage />
          </PrivateRoute>
        }
      />
      <Route
        path={PathConstant.CUSTOMER_PARTNER_CREATE}
        element={
          <PrivateRoute isAuth={usePartnerCreate}>
            <PartnerDetail isDetailPage={false} />
          </PrivateRoute>
        }
      />
      <Route
        path={PathConstant.MODULE_PROJECT}
        element={
          <PrivateRoute isAuth={useProjectList}>
            <ModuleProject />
          </PrivateRoute>
        }
      />
      <Route
        path={PathConstant.PROJECT_LIST}
        element={
          <PrivateRoute isAuth={useProjectList}>
            <ProjectList />
          </PrivateRoute>
        }
      />
      <Route
        path="*"
        element={<Navigate to={PathConstant.NOT_FOUND} replace />}
      />
    </Routes>
  )
}

export default AllRoutesOfFeatures
