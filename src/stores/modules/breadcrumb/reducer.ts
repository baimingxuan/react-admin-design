import { AnyAction } from 'redux'
import { BreadcrumbState } from '@/stores/types'
import { produce } from 'immer'
import * as types from '@/stores/constant'

const breadcrumbState: BreadcrumbState = {
  breadcrumbs: {}
}

const breadcrumb = (state: BreadcrumbState = breadcrumbState, action: AnyAction) => {
  produce(state, (draftState: any) => {
    switch (action.type) {
      case types.SET_BREADCRUMBS:
        draftState.breadcrumbs = action.breadcrumbs
				break
			default:
				return draftState
    }
  })
}

export default breadcrumb