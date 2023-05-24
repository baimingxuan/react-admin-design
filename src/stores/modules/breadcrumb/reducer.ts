import { AnyAction } from 'redux'
import { BreadcrumbState } from '@/stores/types'
import * as types from '@/stores/constant'

const breadcrumbState: BreadcrumbState = {
  breadcrumbs: {}
}

const breadcrumb = (state: BreadcrumbState = breadcrumbState, action: AnyAction) => {
  switch (action.type) {
    case types.SET_BREADCRUMBS:
      state.breadcrumbs = action.breadcrumbs
      break
    default:
      return state
  }
}

export default breadcrumb