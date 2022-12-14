import { OptionItem } from '@/types'
import { List } from '@mui/material'
import { IStatusConstant } from '../types'

export function convertStatusInSelectOption(
  listStatus: IStatusConstant[]
): OptionItem[] {
  return listStatus.map((item: IStatusConstant) => ({
    id: item.type,
    label: item.label,
    value: item.type,
  }))
}

export function convertToOptionItem(
  list: any,
  uniqueKey?: string
): OptionItem[] | OptionItem {
  const _uniqueKey: string = uniqueKey ? uniqueKey : 'id'
  if (!Array.isArray(list)) {
    return {
      ...list,
      id: list[_uniqueKey],
      label: list.name || list.label,
      value: list[_uniqueKey],
    }
  } else {
    return list.map((item: any) => ({
      ...item,
      id: item[_uniqueKey],
      label: item.name ?? item.label,
      value: item[_uniqueKey],
    }))
  }
}
