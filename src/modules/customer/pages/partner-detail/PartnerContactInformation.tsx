import CardForm from '@/components/Form/CardForm'
import FormItem from '@/components/Form/FormItem/FormItem'
import FormLayout from '@/components/Form/FormLayout'
import InputTextArea from '@/components/inputs/InputTextArea'
import InputTextLabel from '@/components/inputs/InputTextLabel'
import { LangConstant } from '@/const'
import { ErrorResponse, EventInput } from '@/types'
import { getErrorFromApi } from '@/utils'
import { Box } from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface PartnerContactInformationProps {
  errors: ErrorResponse[]
  flagGetDetail: boolean
  partner: any
  onChange: (payload: any) => void
}

const PartnerContactInformation = ({
  errors,
  flagGetDetail,
  partner,
  onChange,
}: PartnerContactInformationProps) => {
  const { t: i18Customer } = useTranslation(LangConstant.NS_CUSTOMER)

  const [flagMounted, setFlagMounted] = useState(false)
  const [contactName, setContactName] = useState('')
  const [contactPhoneNumber, setContactPhoneNumber] = useState('')
  const [contactAddress, setContactAddress] = useState('')
  const [note, setNote] = useState('')

  const contactInformation = useMemo(() => {
    return {
      contactName,
      contactPhoneNumber,
      contactAddress,
      note,
    }
  }, [contactName, contactPhoneNumber, contactAddress, note])

  const handleTextChange = (
    value: string,
    setState: Dispatch<SetStateAction<string>>
  ) => {
    setState(value)
  }

  const fillPartnerDetail = () => {
    setContactName(partner.contactName)
    setContactPhoneNumber(partner.contactPhoneNumber)
    setContactAddress(partner.contactAddress)
    setNote(partner.note)
  }

  useEffect(() => {
    if (flagMounted) {
      onChange(contactInformation)
    }
    setFlagMounted(true)
  }, [contactInformation])

  useEffect(() => {
    if (flagGetDetail) {
      fillPartnerDetail()
    }
  }, [flagGetDetail])

  return (
    <CardForm title={i18Customer('TXT_CONTACT_INFORMATION')}>
      <Box style={{ width: '546px' }}>
        <InputTextLabel
          require
          error={getErrorFromApi('contactName', errors).error}
          errorMessage={getErrorFromApi('contactName', errors).message}
          value={contactName}
          name="contact-name"
          label={i18Customer('LB_CONTACT_NAME')}
          placeholder={i18Customer('PLH_CONTACT_NAME')}
          onChange={(event: EventInput) =>
            handleTextChange(event.target.value, setContactName)
          }
        />
        <FormLayout top={24}>
          <InputTextLabel
            type="number"
            value={contactPhoneNumber}
            name="phone-number"
            label={i18Customer('LB_PHONE_NUMBER')}
            placeholder={i18Customer('PLH_PHONE_NUMBER')}
            onChange={(event: EventInput) =>
              handleTextChange(event.target.value, setContactPhoneNumber)
            }
          />
        </FormLayout>
        <FormLayout top={24}>
          <InputTextLabel
            error={getErrorFromApi('contactAddress', errors).error}
            errorMessage={getErrorFromApi('contactAddress', errors).message}
            value={contactAddress}
            name="address"
            label={i18Customer('LB_ADDRESS')}
            placeholder={i18Customer('PLH_EMAIL_ADDRESS')}
            onChange={(event: EventInput) =>
              handleTextChange(event.target.value, setContactAddress)
            }
          />
        </FormLayout>
        <FormLayout top={24}>
          <FormItem label={i18Customer('LB_NOTE')}>
            <InputTextArea
              defaultValue={note}
              placeholder={i18Customer('PLH_NOTE')}
              onChange={(e: EventInput) =>
                handleTextChange(e.target.value, setNote)
              }
            />
          </FormItem>
        </FormLayout>
      </Box>
    </CardForm>
  )
}

export default PartnerContactInformation
