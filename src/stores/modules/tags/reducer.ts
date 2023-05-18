import { AnyAction } from 'redux'
import { TagsState } from '@/stores/types'
import { produce } from 'immer'
import * as types from '../../constant'

const tagsState: TagsState = {
  tagsActive: '/home',
  tagsList: [{
    title: '首页',
    path: '/home'
  }]
}

const tags = (state: TagsState = tagsState, action: AnyAction) => {
  produce(state, draftState => {
    switch (action.type) {
      case types.SET_MENU_LIST:
        draftState.tagsList = action.tagsList
        break
      case types.SET_TAGS_ACTIVE:
        draftState.tagsActive = action.tagsActive
        break
      default: 
        return draftState
    }
  })
}

export default tags