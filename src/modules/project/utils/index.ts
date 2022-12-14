import QueryString from 'query-string'

export const removeItemObjectEmpty = (obj: any) => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([__, v]) => v != null && v != '' && v != undefined
    )
  )
}
export const queryStringParam = (params: any) => {
  return QueryString.stringify(removeItemObjectEmpty(params))
}
