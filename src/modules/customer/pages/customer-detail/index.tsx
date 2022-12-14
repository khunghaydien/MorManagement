import CommonScreenLayout from '@/components/common/CommonScreenLayout'
import { LangConstant, PathConstant } from '@/const'
import { AuthState, selectAuth } from '@/reducer/auth'
import { Box, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ICustomer, Optional } from '../../types'
import CustomerContactInformation from './CustomerContactInformation'
import CustomerContractInformation from './CustomerContractInformation'
import CustomerGeneralInformation from './CustomerGeneralInformation'
import CustomerProjectInformation from './CustomerProjectInformation'
import useFetchCustomerDetail, {
  initialCustomer,
} from './hooks/useFetchCustomerDetail'

const CustomerDetail = () => {
  const {
    customer,
    setCustomer,
    contracts,
    setContracts,
    projects,
    getCustomerDetailFromApi,
    inValidForm,
    setInValidForm,
    handleClickSubmit,
    errors,
  } = useFetchCustomerDetail()
  const { t } = useTranslation(LangConstant.NS_CUSTOMER)
  const navigate = useNavigate()
  const params = useParams()
  const classes = useStyles()

  const { permissions }: AuthState = useSelector(selectAuth)

  const [customerTemp, setCustomerTemp] =
    useState<Optional<ICustomer>>(initialCustomer)

  useEffect(() => {
    const customerId = params.customerId ?? ''
    if (customerId) {
      getCustomerDetailFromApi(customerId, setCustomerTemp)
    }
  }, [])

  const isViewDetail: boolean = useMemo(() => {
    return !!params.customerId
  }, [params.customerId])

  const isButtonSubmitDisabled = useMemo(() => {
    if (!isViewDetail) return false
    return JSON.stringify(customer) === JSON.stringify(customerTemp)
  }, [isViewDetail, customer])

  const textButtonSubmit = useMemo(() => {
    return !!params.customerId
      ? t('TXT_UPDATE_CUSTOMER')
      : t('TXT_CREATE_CUSTOMER')
  }, [params.customerId])

  const handleBackPage = () => {
    navigate(PathConstant.CUSTOMER_LIST)
  }

  return (
    <CommonScreenLayout
      useBackPage
      backLabel={t('LB_BACK_TO_CUSTOMER_LIST')}
      onBack={handleBackPage}
    >
      <Box className={classes.formWrapper}>
        <CustomerGeneralInformation
          customer={customer}
          setCustomer={setCustomer}
          inValidForm={inValidForm}
          setInValidForm={setInValidForm}
          errors={errors}
        />
        <CustomerContactInformation
          customer={customer}
          setCustomer={setCustomer}
          errors={errors}
          inValidForm={inValidForm}
        />
        <CustomerContractInformation
          contracts={contracts}
          setContracts={setContracts}
        />
        {isViewDetail && <CustomerProjectInformation projects={projects} />}
        {!!permissions.useCustomerUpdate && (
          <Box className={classes.mt24}>
            <Button
              disabled={isButtonSubmitDisabled}
              variant="contained"
              data-title="btn"
              onClick={() => handleClickSubmit(isViewDetail, setCustomerTemp)}
            >
              {textButtonSubmit}
            </Button>
          </Box>
        )}
      </Box>
    </CommonScreenLayout>
  )
}

const useStyles = makeStyles(() => ({
  formWrapper: {
    paddingBottom: 80,
  },
  mt24: {
    marginTop: 24,
  },
}))

export default CustomerDetail
