import * as types from '@/stores/constant'

export const setBreadcrumbs = (breadcrumbs: { [propName: string]: any }) => ({
  type: types.SET_BREADCRUMBS,
  breadcrumbs
})