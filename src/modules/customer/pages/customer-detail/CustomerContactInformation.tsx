import CardForm from '@/components/Form/CardForm'
import FormItem from '@/components/Form/FormItem/FormItem'
import FormLayout from '@/components/Form/FormLayout'
import InputTextArea from '@/components/inputs/InputTextArea'
import InputTextLabel from '@/components/inputs/InputTextLabel'
import { LangConstant } from '@/const'
import { CUSTOMER_REQUEST_KEY } from '@/modules/customer/const'
import { ICustomer, ICustomerValid, Optional } from '@/modules/customer/types'
import { ErrorResponse } from '@/types'
import { Box } from '@mui/material'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

interface IProps {
  customer: Optional<ICustomer>
  setCustomer: Dispatch<SetStateAction<Optional<ICustomer>>>
  errors: ErrorResponse[]
  inValidForm: Optional<ICustomerValid>
}

function ContactForm({ customer, setCustomer, inValidForm }: IProps) {
  const { t } = useTranslation(LangConstant.NS_CUSTOMER)

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    name: keyof ICustomer
  ) => {
    const { value } = event.target
    setCustomer((prev: Optional<ICustomer>) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <CardForm title={t('TXT_CONTACT_INFORMATION')}>
      <Box style={{ width: '546px' }}>
        <FormLayout top={24}>
          <InputTextLabel
            name="customer-name"
            label={t('LB_CONTACT_NAME')}
            placeholder={t('PLH_CONTACT_NAME')}
            require
            value={customer.contactName}
            onChange={(e: any) =>
              handleInputChange(e, CUSTOMER_REQUEST_KEY.CONTACT_NAME)
            }
            errorMessage={inValidForm[CUSTOMER_REQUEST_KEY.NAME]?.errorMessage}
            error={inValidForm[CUSTOMER_REQUEST_KEY.NAME]?.error}
          ></InputTextLabel>
        </FormLayout>

        <FormLayout top={24}>
          <InputTextLabel
            name="phone-number"
            label={t('LB_PHONE_NUMBER')}
            placeholder={t('PLH_CUSTOMER_PHONE_NUMBER')}
            value={customer.contactPhoneNumber}
            onChange={(e: any) =>
              handleInputChange(e, CUSTOMER_REQUEST_KEY.CONTACT_PHONE_NUMBER)
            }
          ></InputTextLabel>
        </FormLayout>

        <FormLayout top={24}>
          <InputTextLabel
            name="address"
            label={t('LB_ADDRESS')}
            placeholder={t('PLH_CUSTOMER_ADDRESS')}
            value={customer.contactAddress}
            onChange={(e: any) =>
              handleInputChange(e, CUSTOMER_REQUEST_KEY.CONTACT_ADDRESS)
            }
          ></InputTextLabel>
        </FormLayout>

        <FormLayout top={24}>
          <FormItem label={t('LB_NOTE')}>
            <InputTextArea
              placeholder={t('PLH_NOTE')}
              defaultValue={customer.contactNote}
              onChange={(e: any) =>
                handleInputChange(e, CUSTOMER_REQUEST_KEY.CONTACT_NOTE)
              }
            />
          </FormItem>
        </FormLayout>
      </Box>
    </CardForm>
  )
}

export default ContactForm
