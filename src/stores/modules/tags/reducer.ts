import { AnyAction } from 'redux'
import { TagsState } from '@/stores/types'
import * as types from '../../constant'

const tagsState: TagsState = {
  tagsActive: '/home',
  tagsList: [{
    title: '首页',
    path: '/home'
  }]
}

const tags = (state: TagsState = tagsState, action: AnyAction) => {
  switch (action.type) {
    case types.SET_MENU_LIST:
      state.tagsList = action.tagsList
      break
    case types.SET_TAGS_ACTIVE:
      state.tagsActive = action.tagsActive
      break
    default: 
      return state
  }
}

export default tags