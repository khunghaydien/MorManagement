import { HttpStatusCode } from '@/api/types'
import CommonScreenLayout from '@/components/common/CommonScreenLayout'
import { LangConstant, TableConstant } from '@/const'
import { updateAlert, updateLoading } from '@/reducer/screen'
import { AppDispatch } from '@/store'
import { Box, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import StringFormat from 'string-format'
import { deletePartner, getListPartners } from '../../reducer/partner'
import { ListPartnersParams } from '../../types'
import PartnerListActions from './PartnerListActions'
import TablePartnerList from './TablePartnerList'

const PartnerList = () => {
  const classes = useStyles()
  const dispatch = useDispatch<AppDispatch>()
  const { t: i18Customer } = useTranslation(LangConstant.NS_CUSTOMER)

  const [params, setParams] = useState<ListPartnersParams>({
    branchId: '',
    keyword: '',
    pageNum: TableConstant.PAGE_CURRENT_DEFAULT,
    pageSize: TableConstant.LIMIT_DEFAULT,
    skillSetIds: [],
    priority: '',
    collaborationStartDate: null,
    startDate: null,
    endDate: null,
    sort: 'desc',
  })
  const [listChecked, setListChecked] = useState<string[]>([])

  const getListPartnersApi = (params: ListPartnersParams = {}) => {
    const _params = {
      ...params,
    }
    if (_params.skillSetIds?.length) {
      _params.skillSetIds = _params.skillSetIds
        .map((skillSet: any) => skillSet.value)
        .join(',')
    }
    dispatch(updateLoading(true))
    dispatch(getListPartners({ ..._params }))
      .unwrap()
      .finally(() => {
        dispatch(updateLoading(false))
      })
  }

  const onDeleteCustomer = (id: string) => {
    dispatch(updateLoading(true))
    dispatch(deletePartner(id))
      .unwrap()
      .then(() => {
        dispatch(alertActionSuccess(id))
        getListPartnersApi(params)
      })
    dispatch(updateLoading(false))
  }

  const handleDeletePartner = (id: string) => {
    onDeleteCustomer(id)
  }

  useEffect(() => {
    getListPartnersApi(params)
  }, [params])

  const alertActionSuccess = (id: string) =>
    updateAlert({
      isShowAlert: true,
      alertInfo: {
        type: 'success',
        message: StringFormat(
          i18Customer('MSG_DELETE_PARTNER_ITEM_SUCCESS'),
          id
        ),
      },
    })

  return (
    <CommonScreenLayout title={i18Customer('TXT_PARTNER_MANAGEMENT_TITLE')}>
      <Box className={classes.partnerContainer}>
        <PartnerListActions listChecked={listChecked} setParams={setParams} />
        <TablePartnerList
          listChecked={listChecked}
          setListChecked={setListChecked}
          params={params}
          setParams={setParams}
          onDeletePartner={handleDeletePartner}
        />
      </Box>
    </CommonScreenLayout>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  rootPartnerList: {},
  title: {
    fontSize: 16,
    fontWeight: 700,
    borderBottom: `1px solid ${theme.color.grey.secondary}`,
    width: 'max-content',
    paddingBottom: '28px',
  },
  partnerContainer: {
    marginTop: theme.spacing(3),
  },
}))

export default PartnerList
