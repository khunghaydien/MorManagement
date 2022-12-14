import { CUSTOMER_LIST } from '@/const/path.const'
import {
  CONTRACT_REQUEST_KEY,
  CONTRACT_STATUS,
  CUSTOMER_REQUEST_KEY,
  PROJECT_STATUS,
} from '@/modules/customer/const'
import {
  createCustomer,
  getCustomerDetail,
  updateCustomer,
} from '@/modules/customer/reducer/customer'
import {
  ContractValid,
  IContract,
  ICustomer,
  ICustomerValid,
  IProject,
  Optional,
} from '@/modules/customer/types'
import { alertError, commonErrorAlert, updateLoading } from '@/reducer/screen'
import { AppDispatch } from '@/store'
import { ErrorResponse } from '@/types'
import { checkUrlValid, formatDate } from '@/utils'
import i18next from 'i18next'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const initialCustomer: ICustomer = {
  signNda: false,
  name: '',
  branchId: '',
  priority: '',
  serviceId: [],
  collaborationStartDate: null,
  status: '',
  scale: '',
  website: '',
  contactName: '',
  contactPhoneNumber: '',
  contactAddress: '',
  contactNote: '',
  contactPersonId: [],
}

export const initialContract: Optional<IContract> = {
  [CONTRACT_REQUEST_KEY.CODE]: '',
  [CONTRACT_REQUEST_KEY.TYPE]: '',
  [CONTRACT_REQUEST_KEY.GROUP]: '',
  [CONTRACT_REQUEST_KEY.START_DATE]: null,
  [CONTRACT_REQUEST_KEY.END_DATE]: null,
  [CONTRACT_REQUEST_KEY.STATUS]: '',
  [CONTRACT_REQUEST_KEY.VALUE]: '',
  [CONTRACT_REQUEST_KEY.EXPECTED_REVENUE]: '',
  [CONTRACT_REQUEST_KEY.NOTE]: '',
}

export const initialCustomerValid: Optional<ICustomerValid> = {
  [CUSTOMER_REQUEST_KEY.WEBSITE]: { error: false, errorMessage: '' },
}

function useFetchCustomerDetail() {
  const [customer, setCustomer] = useState<Optional<ICustomer>>(initialCustomer)
  const [contract, setContract] = useState<Optional<IContract>>(initialContract)
  const [contracts, setContracts] = useState<Optional<IContract>[]>([])
  const [projects, setProjects] = useState<IProject[]>([])
  const [inValidForm, setInValidForm] =
    useState<Optional<ICustomerValid>>(initialCustomerValid)
  const [errors, setErrors] = useState<ErrorResponse[]>([])
  const dispatch = useDispatch<AppDispatch>()

  const navigate = useNavigate()

  const convertDateToString = (date: Date | string | null) => {
    if (!date) return date
    return formatDate(new Date(date))
  }

  const isDisabledBtnSubmit = useMemo(() => {
    return (
      !customer.name ||
      !customer.branchId ||
      !customer.serviceId ||
      !customer.priority ||
      !customer.status ||
      !customer.collaborationStartDate ||
      !customer.contactName
    )
  }, [customer])

  const handleValidate = (keyName: keyof ICustomer, value: any) => {
    let error = false
    let errorMessage = ''
    switch (keyName) {
      case CUSTOMER_REQUEST_KEY.WEBSITE:
        error = !checkUrlValid(value)
        errorMessage = !checkUrlValid(value)
          ? i18next.t('common:MSG_NOT_VALID')
          : ''
        break
      default:
        break
    }
    setInValidForm({
      ...inValidForm,
      [keyName]: {
        error,
        errorMessage,
      },
    })
    return error
  }

  const handleShowErrorMessage = (errors: any[]) => {
    if (errors && errors.length) {
      errors.forEach((item: any) => {
        if (item.field && item.message) {
          if (item.field.includes('contract')) {
            // dispatch(alertError({ message: `${item.field} : ${item.message}` }))
          } else {
            // dispatch(alertError({ message: `${item.field} : ${item.message}` }))
            const arrKeyValid = item.field.split('.')
            const keyValid = arrKeyValid[arrKeyValid.length - 1]
            setInValidForm((prev: Optional<ICustomerValid>) => ({
              ...prev,
              [keyValid]: {
                error: true,
                errorMessage: item.message,
              },
            }))
          }
        }
      })
    }
  }

  const getCustomerDetailFromApi = (
    id: string,
    setCustomerTemp: Dispatch<SetStateAction<any>>
  ) => {
    dispatch(updateLoading(true))
    dispatch(getCustomerDetail(id))
      .unwrap()
      .then(({ data }: any) => {
        const { contact, contracts, general, projects } = data
        const _customer = { ...general, ...contact }

        const customer = {
          ..._customer,
          branchId: _customer.branch.id,
          status: _customer.status.id,
          collaborationStartDate: new Date(_customer.collaborationStartDate),
          priority: _customer.priority.id,
          serviceId: _customer.services.map((item: any) => ({
            ...item,
            value: item.skillSetId,
            label: item.name,
          })),
        }

        setCustomer(customer)
        setCustomerTemp(customer)

        setContracts(
          contracts.map((item: any) => ({
            ...item,
            startDate: new Date(item.startDate),
            endDate: new Date(item.endDate),
            status: CONTRACT_STATUS[item.status.id],
            type: item.type.id,
            group: item.group.id,
          }))
        )

        setProjects(
          projects.map((item: IProject) => ({
            ...item,
            ...(item.startDate
              ? { startDate: convertDateToString(item.startDate) }
              : {}),
            ...(item.endDate
              ? { endDate: convertDateToString(item.endDate) }
              : {}),
            status: PROJECT_STATUS[item.status.id],
            technologies:
              item.technologies &&
              item.technologies
                .map((technology: any) => technology.name)
                .join(', '),
          }))
        )
      })
      .catch(error => {
        dispatch(commonErrorAlert())
        throw error
      })
      .finally(() => dispatch(updateLoading(false)))
  }

  const createNewCustomer = () => {
    const payload: any = {}
    payload.customer = {
      ...customer,
      collaborationStartDate: customer.collaborationStartDate?.getTime(),
      serviceId: customer.serviceId?.map((c: any) => c.value),
    }
    payload.contract = contracts.map((contract: any) => ({
      ...contract,
      startDate: new Date(contract.startDate).getTime(),
      endDate: new Date(contract.endDate).getTime(),
      id: null,
      status: contract.status.type,
    }))
    dispatch(updateLoading(true))
    dispatch(createCustomer(payload))
      .unwrap()
      .then(({ hasError }) => {
        if (!hasError) {
          navigate(CUSTOMER_LIST)
        }
      })
      .catch((errors: any) => {
        setErrors(errors)
        handleShowErrorMessage(errors)
      })
      .finally(() => {
        dispatch(updateLoading(false))
      })
  }

  const updateCustomerInfo = (
    setCustomerTemp: Dispatch<SetStateAction<any>>
  ) => {
    const payload: any = {}
    payload.customer = {
      ...customer,
      collaborationStartDate: customer.collaborationStartDate?.getTime(),
      serviceId: customer.serviceId?.map((c: any) => c.value),
      contactPersonId: [],
    }
    payload.contract = contracts.map((contract: any) => ({
      ...contract,
      startDate: new Date(contract.startDate).getTime(),
      endDate: new Date(contract.endDate).getTime(),
      status: contract.status.type,
      id: contract.id,
    }))

    delete payload.customer.services
    delete payload.customer.branch

    dispatch(updateLoading(true))
    dispatch(updateCustomer({ customerId: payload.customer.id, data: payload }))
      .unwrap()
      .then(({ hasError }) => {
        if (!hasError) {
          getCustomerDetailFromApi(payload.customer.id, setCustomerTemp)
        }
      })
      .catch((errors: any) => {
        setErrors(errors)
        handleShowErrorMessage(errors)
      })
      .finally(() => {
        dispatch(updateLoading(false))
      })
  }

  const handleClickSubmit = (
    isViewDetail: boolean,
    setCustomerTemp: Dispatch<SetStateAction<any>>
  ) => {
    const keyFormValid = Object.keys(inValidForm) as Array<keyof ICustomer>
    const inValid = keyFormValid.some((key: keyof ICustomer) =>
      customer[key] ? handleValidate(key, customer[key]) : false
    )

    if (!inValid) {
      if (isViewDetail) {
        updateCustomerInfo(setCustomerTemp)
      } else {
        createNewCustomer()
      }
    }
  }

  return {
    customer,
    setCustomer,
    contract,
    setContract,
    contracts,
    setContracts,
    projects,
    getCustomerDetailFromApi,
    createNewCustomer,
    inValidForm,
    setInValidForm,
    handleClickSubmit,
    isDisabledBtnSubmit,
    errors,
  }
}

export default useFetchCustomerDetail
