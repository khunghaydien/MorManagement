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
import { CUSTOMER_REQUEST_KEY, CUSTOMER_STATUS } from '@/modules/customer/const'
import { ICustomer, ICustomerValid, Optional } from '@/modules/customer/types'
import { ErrorResponse, EventInput } from '@/types'
import { Box, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { convertStatusInSelectOption } from '@/modules/customer/utils'

interface IProps {
  customer: Optional<ICustomer>
  setCustomer: Dispatch<SetStateAction<Optional<ICustomer>>>
  inValidForm: Optional<ICustomerValid>
  setInValidForm: Dispatch<SetStateAction<Optional<ICustomerValid>>>
  errors: ErrorResponse[]
}

function GeneralForm({ customer, setCustomer, inValidForm, errors }: IProps) {
  const { t } = useTranslation(LangConstant.NS_CUSTOMER)

  const classes = useStyles()

  const customerStatus = convertStatusInSelectOption(
    Object.values(CUSTOMER_STATUS)
  )

  const handleInputChange = (event: EventInput, name: keyof ICustomer) => {
    const { value } = event.target
    setCustomer((prev: Optional<ICustomer>) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (name: keyof ICustomer) => {
    setCustomer((prev: Optional<ICustomer>) => ({
      ...prev,
      [name]: !prev[name],
    }))
  }

  const handleSelectChange = (value: any, name: keyof ICustomer) => {
    setCustomer((prev: Optional<ICustomer>) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleChooseDate = (value: Date, name: keyof ICustomer) => {
    setCustomer((prev: Optional<ICustomer>) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <CardForm title={t('TXT_GENERAL_INFORMATION')}>
      <Box style={{ width: '546px' }}>
        <FormLayout top={24}>
          <InputTextLabel
            name="customer-name"
            label={t('LB_CUSTOMER_NAME')}
            placeholder={t('PLH_INPUT_TEXT_CUSTOMER_NAME')}
            require
            value={customer.name}
            onChange={(e: EventInput) =>
              handleInputChange(e, CUSTOMER_REQUEST_KEY.NAME)
            }
            errorMessage={inValidForm[CUSTOMER_REQUEST_KEY.NAME]?.errorMessage}
            error={inValidForm[CUSTOMER_REQUEST_KEY.NAME]?.error}
          ></InputTextLabel>
        </FormLayout>

        <FormLayout top={24} gap={24}>
          <FormItem label={t('LB_BRANCH')} require>
            <SelectBranch
              errorMessage={
                inValidForm[CUSTOMER_REQUEST_KEY.BRANCH_ID]?.errorMessage
              }
              error={inValidForm[CUSTOMER_REQUEST_KEY.BRANCH_ID]?.error}
              value={String(customer.branchId)}
              onChange={value =>
                handleSelectChange(value, CUSTOMER_REQUEST_KEY.BRANCH_ID)
              }
            />
          </FormItem>
          <FormItem
            label={t('LB_SERVICE')}
            require
            errorMessage={
              inValidForm[CUSTOMER_REQUEST_KEY.SERVICE_ID]?.errorMessage
            }
            error={inValidForm[CUSTOMER_REQUEST_KEY.SERVICE_ID]?.error}
          >
            <SelectService
              placeholder={t('PLH_SELECT_SERVICE')}
              error={inValidForm[CUSTOMER_REQUEST_KEY.SERVICE_ID]?.error}
              onChange={value =>
                handleSelectChange(value, CUSTOMER_REQUEST_KEY.SERVICE_ID)
              }
              value={customer.serviceId}
            />
          </FormItem>
        </FormLayout>

        {/* <FormLayout top={24}>
          <InputTextLabel
            name="contact-point"
            label={t('LB_CONTACT_POINT')}
            placeholder={PLACEHOLDER_INPUT}
            require
            // value={customer.}
          ></InputTextLabel>
        </FormLayout> */}

        <FormLayout top={24} gap={24} width={254}>
          <FormItem
            label={t('LB_PRIORITY')}
            require
            errorMessage={
              inValidForm[CUSTOMER_REQUEST_KEY.PRIORITY]?.errorMessage
            }
            error={inValidForm[CUSTOMER_REQUEST_KEY.PRIORITY]?.error}
          >
            <SelectPriority
              onChange={value =>
                handleSelectChange(value, CUSTOMER_REQUEST_KEY.PRIORITY)
              }
              value={String(customer.priority)}
              error={inValidForm[CUSTOMER_REQUEST_KEY.PRIORITY]?.error}
            />
          </FormItem>
          {/* <FormItem label={t('LB_CONTACT_PERSON')} require>
            <InputAutocomplete
              listOptions={listOptions}
              onChange={value =>
                handleSelectChange(
                  value,
                  CUSTOMER_REQUEST_KEY.CONTACT_PERSON_ID
                )
              }
              placeholder={PLACEHOLDER_SELECT}
              defaultTags={customer.contactPersonId}
            />
          </FormItem> */}
        </FormLayout>

        <FormLayout top={24}>
          <InputTextLabel
            name="customer-scale"
            label={t('LB_CUSTOMER_SCALE')}
            placeholder={t('PLH_CUSTOMER_SCALE')}
            require={false}
            value={customer.scale}
            onChange={(e: EventInput) =>
              handleInputChange(e, CUSTOMER_REQUEST_KEY.SCALE)
            }
            errorMessage={inValidForm[CUSTOMER_REQUEST_KEY.SCALE]?.errorMessage}
            error={inValidForm[CUSTOMER_REQUEST_KEY.SCALE]?.error}
          ></InputTextLabel>
        </FormLayout>

        <FormLayout top={24}>
          <InputTextLabel
            name="url-website"
            label={t('LB_URL_WEBSITE')}
            placeholder={t('PLH_CUSTOMER_WEBSITE')}
            value={customer.website}
            onChange={(e: EventInput) =>
              handleInputChange(e, CUSTOMER_REQUEST_KEY.WEBSITE)
            }
            errorMessage={
              inValidForm[CUSTOMER_REQUEST_KEY.WEBSITE]?.errorMessage
            }
            error={inValidForm[CUSTOMER_REQUEST_KEY.WEBSITE]?.error}
          ></InputTextLabel>
        </FormLayout>

        <FormLayout top={24} gap={24}>
          <FormItem
            label={t('LB_STATUS')}
            require
            errorMessage={
              inValidForm[CUSTOMER_REQUEST_KEY.STATUS]?.errorMessage
            }
          >
            <InputDropdown
              listOptions={customerStatus}
              onChange={value =>
                handleSelectChange(value, CUSTOMER_REQUEST_KEY.STATUS)
              }
              placeholder={t('PLH_SELECT_STATUS')}
              value={String(customer.status)}
              width={'100%'}
              error={inValidForm[CUSTOMER_REQUEST_KEY.STATUS]?.error}
            />
          </FormItem>

          <FormItem
            label={t('LB_COLLABORATION_START_DATE')}
            require
            errorMessage={
              inValidForm[CUSTOMER_REQUEST_KEY.COLLABORATION_START_DATE]
                ?.errorMessage
            }
          >
            <InputDatePicker
              defaultValue={customer.collaborationStartDate}
              onChange={(date: Date) =>
                handleChooseDate(
                  date,
                  CUSTOMER_REQUEST_KEY.COLLABORATION_START_DATE
                )
              }
              error={
                inValidForm[CUSTOMER_REQUEST_KEY.COLLABORATION_START_DATE]
                  ?.error
              }
            />
          </FormItem>
        </FormLayout>

        <FormLayout top={24}>
          <InputCheckbox
            label={t('LB_SIGN_NDA')}
            className={classes.customCheckbox}
            checked={customer.signNda}
            onClick={() => handleCheckboxChange(CUSTOMER_REQUEST_KEY.SIGN_NDA)}
          />
        </FormLayout>
      </Box>
    </CardForm>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  customCheckbox: {
    '& > span': {
      fontSize: 14,
      lineHeight: '24px',
    },
  },
}))

export default GeneralForm
