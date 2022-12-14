import SelectBranch from '@/components/common/SelectBranch'
import SelectPriority from '@/components/common/SelectPriority'
import SelectService from '@/components/common/SelectService'
import InputDatePicker from '@/components/Datepicker/InputDatepicker'
import CardForm from '@/components/Form/CardForm'
import FormItem from '@/components/Form/FormItem/FormItem'
import FormLayout from '@/components/Form/FormLayout'
import InputCheckbox from '@/components/inputs/InputCheckbox'
import InputDropdown from '@/components/inputs/InputDropdown'
import InputTextLabel from '@/components/inputs/InputTextLabel'
import { LangConstant } from '@/const'
import { CUSTOMER_STATUS } from '@/modules/customer/const'
import { ErrorResponse, EventInput, OptionItem } from '@/types'
import { getErrorFromApi } from '@/utils'
import { Box } from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { convertStatusInSelectOption } from '../../utils'

interface PartnerGeneralInformationProps {
  errors: ErrorResponse[]
  partner: any
  flagGetDetail: boolean
  skillSetsDetail: OptionItem[]
  onChange: (payload: any) => void
}

const customerStatus = convertStatusInSelectOption(
  Object.values(CUSTOMER_STATUS)
)

const PartnerGeneralInformation = ({
  errors,
  partner,
  flagGetDetail,
  skillSetsDetail,
  onChange,
}: PartnerGeneralInformationProps) => {
  const { t: i18Customer } = useTranslation(LangConstant.NS_CUSTOMER)
  const [branchId, setBranchId] = useState(partner.branchId || '')
  const [collaborationStartDate, setCollaborationStartDate] = useState<Date>()
  const [signNda, setSignNda] = useState(false)
  const [name, setName] = useState('')
  const [scale, setScale] = useState('')
  const [website, setWebsite] = useState('')
  const [priority, setPriority] = useState('')
  const [skillSets, setSkillSets] = useState<OptionItem[]>([])
  // const [contactPerson, setContactPerson] = useState('')
  const [status, setStatus] = useState('')
  const [flagMounted, setFlagMounted] = useState(false)

  const generalInformation = useMemo(() => {
    return {
      signNda,
      name,
      scale,
      website,
      branchId,
      skillSetIds: skillSets.map(item => item.value),
      priority: priority || 0,
      status: status || 0,
      collaborationStartDate: collaborationStartDate?.getTime(),
      // contactPerson,
    }
  }, [
    signNda,
    name,
    scale,
    website,
    branchId,
    priority,
    skillSets,
    collaborationStartDate,
    // contactPerson,
    status,
  ])

  const onTextChange = (
    value: string,
    setState: Dispatch<SetStateAction<string>>
  ) => {
    setState(value)
  }

  const handleSignNdaChange = () => {
    setSignNda(!signNda)
  }

  const handleCollaborationStartDateChange = (date: Date) => {
    setCollaborationStartDate(date)
  }

  const fillPartnerDetail = () => {
    setName(partner.name)
    setBranchId(partner.branchId)
    setPriority(partner.priority)
    setScale(partner.scale)
    setWebsite(partner.website)
    setStatus(partner.status)
    setSignNda(partner.signNda)
    setCollaborationStartDate(new Date(partner.collaborationStartDate))
    setSkillSets(skillSetsDetail)
  }

  useEffect(() => {
    if (flagMounted) {
      onChange(generalInformation)
    }
    setFlagMounted(true)
  }, [generalInformation])

  useEffect(() => {
    if (flagGetDetail) {
      fillPartnerDetail()
    }
  }, [flagGetDetail])

  return (
    <CardForm title={i18Customer('TXT_GENERAL_INFORMATION')}>
      <Box style={{ width: '546px' }}>
        <FormLayout>
          <InputTextLabel
            require
            error={getErrorFromApi('name', errors).error}
            errorMessage={getErrorFromApi('name', errors).message}
            value={name}
            name="partner-name"
            label={i18Customer('LB_PARTNER_NAME')}
            placeholder={i18Customer('PLH_PARTNER_NAME')}
            onChange={(event: EventInput) =>
              onTextChange(event.target.value, setName)
            }
          />
        </FormLayout>
        <FormLayout top={24} gap={24}>
          <FormItem label={i18Customer('LB_BRANCH')} require>
            <SelectBranch
              error={getErrorFromApi('branchId', errors).error}
              errorMessage={getErrorFromApi('branchId', errors).message}
              value={branchId}
              onChange={(newBranch: string) =>
                onTextChange(newBranch, setBranchId)
              }
            />
          </FormItem>
          <FormItem label={i18Customer('LB_STRENGTH')} require>
            <SelectService
              placeholder={i18Customer('PLH_SELECT_STRENGTH')}
              error={getErrorFromApi('skillSetIds', errors).error}
              errorMessage={getErrorFromApi('skillSetIds', errors).message}
              value={skillSets}
              onChange={(skillSets: OptionItem[]) => setSkillSets(skillSets)}
            />
          </FormItem>
        </FormLayout>
        <FormLayout top={24} gap={24}>
          <FormItem label={i18Customer('LB_PRIORITY')} require>
            <SelectPriority
              error={getErrorFromApi('priority', errors).error}
              errorMessage={getErrorFromApi('priority', errors).message}
              width={260}
              value={priority}
              onChange={value => onTextChange(value, setPriority)}
            />
          </FormItem>
          {/* <FormItem label={i18Customer('LB_CONTACT_PERSON')} require>
            <InputDropdown
              listOptions={listOptions}
              onChange={() => {}}
              placeholder={i18Customer('PLH_SELECT_CONTACT_PERSON')}
              width={'100%'}
              value={contactPerson}
            />
          </FormItem> */}
        </FormLayout>
        <FormLayout top={24}>
          <InputTextLabel
            value={scale}
            error={getErrorFromApi('scale', errors).error}
            errorMessage={getErrorFromApi('scale', errors).message}
            name="partner-scale-name"
            label={i18Customer('LB_PARTNER_SCALE')}
            placeholder={i18Customer('PLH_PARTNER_SCALE')}
            onChange={(event: EventInput) =>
              onTextChange(event.target.value, setScale)
            }
          />
        </FormLayout>
        <FormLayout top={24}>
          <InputTextLabel
            error={getErrorFromApi('website', errors).error}
            errorMessage={getErrorFromApi('website', errors).message}
            value={website}
            name="partner-website"
            label={i18Customer('LB_PARTNER_WEBSITE')}
            placeholder={i18Customer('PLH_PARTNER_WEBSITE')}
            onChange={(event: EventInput) =>
              onTextChange(event.target.value, setWebsite)
            }
          />
        </FormLayout>
        <FormLayout top={24} gap={24}>
          <FormItem label={i18Customer('LB_STATUS')} require>
            <InputDropdown
              error={getErrorFromApi('status', errors).error}
              errorMessage={getErrorFromApi('status', errors).message}
              listOptions={customerStatus}
              onChange={value => {
                onTextChange(value, setStatus)
              }}
              placeholder={i18Customer('PLH_SELECT_STATUS')}
              width={'100%'}
              value={status}
            />
          </FormItem>
          <FormItem
            label={i18Customer('LB_COLLABORATION_START_DATE')}
            require
            errorMessage={
              getErrorFromApi('collaborationStartDate', errors).message
            }
          >
            <InputDatePicker
              error={getErrorFromApi('collaborationStartDate', errors).error}
              value={collaborationStartDate}
              onChange={handleCollaborationStartDateChange}
            />
          </FormItem>
        </FormLayout>
        <FormLayout top={24}>
          <InputCheckbox
            label={i18Customer('LB_SIGN_NDA')}
            checked={signNda}
            onClick={handleSignNdaChange}
          />
        </FormLayout>
      </Box>
    </CardForm>
  )
}

export default PartnerGeneralInformation
