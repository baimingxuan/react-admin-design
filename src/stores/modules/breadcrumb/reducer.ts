import { AnyAction } from 'redux'
import { BreadcrumbState } from '@/stores/types'
import { produce } from 'immer'

const breadcrumbState: BreadcrumbState = {
  breadcrumbList: {}
}

const breadcrumb = (state: BreadcrumbState = breadcrumbState, action: AnyAction) => {
  produce(state, (draftState: any) => {
    switch (action.type) {
      case 'set_breadcrumb_list':
        draftState.breadcrumbList = action.breadcrumbList;
				break
			default:
				return draftState
    }
  })
}

export default breadcrumb