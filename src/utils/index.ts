import { MAX_ELLIPSIS } from '@/const/app.const'
import { CurrencyOptions, ErrorResponse } from '@/types'
import i18next from 'i18next'
import { isEmpty, pickBy } from 'lodash'
import moment from 'moment'

export const changeLang = (langCode: string) => {
  i18next.changeLanguage(langCode)
  document.documentElement.lang = langCode
}

export const validateEmail = (email: string) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return email
}

export const validatePassword = (password: string) => {
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.])[A-Za-z\d@$!%*#?&.]{8,}$/
  return password
}

export function uuid() {
  var temp_url = URL.createObjectURL(new Blob())
  var uuid = temp_url.toString()
  URL.revokeObjectURL(temp_url)
  return uuid.substr(uuid.lastIndexOf('/') + 1) // remove prefix (e.g. blob:null/, blob:www.test.com/, ...)
}

export function formatDate(date: Date | number, format?: string) {
  let _format = i18next.t('common:LB_DATE_FORMAT')
  if (format) _format = format
  return moment(new Date(date)).format(_format)
}

export function checkUrlValid(url: string) {
  const regex =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm
  return regex.test(url)
}

export const formatCurrency = (
  value: number,
  { style = 'currency', currency = 'VND' }: CurrencyOptions
) => {
  return value.toLocaleString('it-IT', { style, currency })
}

export const getErrorFromApi = (field: string, errors: ErrorResponse[]) => {
  const fieldError = errors.find(
    (error: ErrorResponse) => error.field === field
  )
  if (fieldError?.field) {
    return {
      error: !!fieldError.field,
      message: fieldError.message,
    }
  } else {
    return {
      error: false,
      message: '',
    }
  }
}

export const cleanObject = (obj: any) => {
  if (typeof obj !== 'object') return obj
  Object.keys(obj).forEach(
    key => typeof obj[key] === 'string' && obj[key].trim()
  )
  return pickBy(obj, item => {
    switch (true) {
      case typeof item === 'string':
        return !isEmpty(item)
      case item === null || item === undefined:
        return false
      default:
        return true
    }
  })
}

export const getTextEllipsis = (text: string) => {
  if (text?.length < MAX_ELLIPSIS) {
    return text
  }
  return `${text?.slice(0, MAX_ELLIPSIS)}...`
}

export default {
  changeLang,
  validateEmail,
}
