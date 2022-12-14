import CommonButton from '@/components/buttons/CommonButton'
import CommonScreenLayout from '@/components/common/CommonScreenLayout'
import FormLayout from '@/components/Form/FormLayout'
import { LangConstant, PathConstant } from '@/const'
import { AuthState, selectAuth } from '@/reducer/auth'
import { alertError, alertSuccess, updateLoading } from '@/reducer/screen'
import { AppDispatch } from '@/store'
import { ErrorResponse } from '@/types'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import StringFormat from 'string-format'
import { createPartner, updatePartner } from '../../reducer/partner'
import { PartnerService } from '../../services'
import { PartnerDetailResponse } from '../../types'
import PartnerContactInformation from './PartnerContactInformation'
import PartnerContractInformation from './PartnerContractInformation'
import PartnerGeneralInformation from './PartnerGeneralInformation'
import PartnerProjectInformation from './PartnerProjectInformation'

const initialRequestBody = {
  branchId: '',
  collaborationStartDate: '',
  companyContactPerson: '',
  contactAddress: '',
  contactName: '',
  contactPhoneNumber: '',
  contracts: [],
  name: '',
  note: '',
  priority: '',
  scale: '',
  signNda: false,
  skillSetIds: [],
  status: '',
  website: '',
}

interface PartnerDetailProps {
  isDetailPage: boolean
}

const PartnerDetail = ({ isDetailPage }: PartnerDetailProps) => {
  const navigate = useNavigate()
  const { t: i18Customer } = useTranslation(LangConstant.NS_CUSTOMER)
  const dispatch = useDispatch<AppDispatch>()
  const params = useParams()

  const { permissions }: AuthState = useSelector(selectAuth)

  const [requestBodySave, setRequestBodySave] = useState(initialRequestBody)
  const [partnerTemp, setPartnerTemp] = useState(initialRequestBody)
  const [listProjects, setListProjects] = useState([])
  const [flagGetDetail, setFlagGetDetail] = useState(false)
  const [skillSetsDetail, setSkillSetsDetail] = useState([])
  const [errors, setErrors] = useState<ErrorResponse[]>([])

  const labelButtonSubmit = useMemo(() => {
    return i18Customer(
      isDetailPage ? 'TXT_UPDATE_PARTNER' : 'TXT_CREATE_PARTNER'
    )
  }, [isDetailPage])

  const isButtonSubmitDisabled = useMemo(() => {
    if (!isDetailPage) return false
    return JSON.stringify(requestBodySave) === JSON.stringify(partnerTemp)
  }, [isDetailPage, requestBodySave])

  const handleBackPage = () => {
    navigate(PathConstant.CUSTOMER_PARTNER_LIST)
  }

  const handleRequestBodyChange = (payload: any) => {
    const newRequestBodySave = { ...requestBodySave, ...payload }
    setRequestBodySave(newRequestBodySave)
  }

  const createPartnerFromRedux = () => {
    dispatch(updateLoading(true))
    dispatch(createPartner(requestBodySave))
      .unwrap()
      .then(() => {
        handleBackPage()
      })
      .catch((errors: ErrorResponse[]) => {
        setErrors(errors)
      })
      .finally(() => {
        dispatch(updateLoading(false))
      })
  }

  const fillPartner = (partner: PartnerDetailResponse) => {
    const { general, contact, contracts, projects } = partner
    const {
      branch,
      collaborationStartDate,
      person,
      name,
      priority,
      scale,
      signNda,
      strengths,
      status,
      website,
    } = general
    const { contactAddress, contactName, contactPhoneNumber, contactNote } =
      contact
    const skillSetsOptionItem = strengths.map(item => ({
      id: item.skillSetId,
      value: item.skillSetId,
      label: item.name,
    }))
    setListProjects(projects as any)
    setSkillSetsDetail(skillSetsOptionItem as any)
    const partnerDetail = {
      branchId: branch.id as string,
      collaborationStartDate,
      companyContactPerson: person,
      contactAddress,
      contactName,
      contactPhoneNumber,
      contracts: contracts.map(item => ({
        ...item,
        group: item.group.id,
        type: item.type.id,
        status: item.status.id,
      })) as any,
      name,
      note: contactNote,
      priority: priority.id,
      scale,
      signNda,
      skillSetIds: strengths.map(item => item.skillSetId) as any,
      status: status.id || '',
      website,
    } as any
    setRequestBodySave(partnerDetail)
    setPartnerTemp(partnerDetail)
  }

  const getPartner = () => {
    const { partnerId } = params
    dispatch(updateLoading(true))
    PartnerService.getPartner(partnerId as string)
      .then(({ data }: any) => {
        fillPartner(data)
      })
      .catch((errors: ErrorResponse[]) => {
        navigate(PathConstant.CUSTOMER_PARTNER_LIST)
        dispatch(
          alertError({
            message: errors[0]?.message,
          })
        )
      })
      .finally(() => {
        setFlagGetDetail(true)
        dispatch(updateLoading(false))
      })
  }

  const updatePartnerFromRedux = () => {
    const { partnerId } = params
    dispatch(updateLoading(true))
    dispatch(
      updatePartner({
        id: partnerId as string,
        requestBody: requestBodySave,
      })
    )
      .unwrap()
      .then(() => {
        setErrors([])
        getPartner()
      })
      .catch((errors: ErrorResponse[]) => {
        setErrors(errors)
      })
    dispatch(updateLoading(false))
  }

  const handleSavePartner = () => {
    if (isDetailPage) {
      updatePartnerFromRedux()
    } else {
      createPartnerFromRedux()
    }
  }

  useEffect(() => {
    if (isDetailPage) {
      getPartner()
    }
    return () => {
      setErrors([])
    }
  }, [])

  return (
    <CommonScreenLayout
      useBackPage
      backLabel={i18Customer('LB_BACK_TO_PARTNER_LIST')}
      onBack={handleBackPage}
    >
      <PartnerGeneralInformation
        errors={errors}
        skillSetsDetail={skillSetsDetail}
        flagGetDetail={flagGetDetail}
        partner={requestBodySave}
        onChange={handleRequestBodyChange}
      />
      <PartnerContactInformation
        errors={errors}
        flagGetDetail={flagGetDetail}
        partner={requestBodySave}
        onChange={handleRequestBodyChange}
      />
      <PartnerContractInformation
        flagGetDetail={flagGetDetail}
        partner={requestBodySave}
        onChange={handleRequestBodyChange}
      />
      {isDetailPage && (
        <PartnerProjectInformation listProjects={listProjects} />
      )}
      {!!permissions.usePartnerUpdate && (
        <FormLayout top={24}>
          <CommonButton
            width={180}
            height={40}
            onClick={handleSavePartner}
            disabled={isButtonSubmitDisabled}
          >
            {labelButtonSubmit}
          </CommonButton>
        </FormLayout>
      )}
    </CommonScreenLayout>
  )
}

export default PartnerDetail
