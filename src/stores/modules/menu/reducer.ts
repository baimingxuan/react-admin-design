import { AnyAction } from 'redux'
import { MenuState } from '@/stores/types'
import * as types from '@/stores/constant'

const menuState: MenuState = {
  isCollapse: false,
  menuList: []
}

const menu = (state: MenuState = menuState, action: AnyAction) => {
  switch (action.type) {
    case types.SET_MENU_LIST:
      state.menuList = action.menuList
      break
    case types.UPDATE_COLLAPSE:
      state.isCollapse = action.isCollapse
      break
    default:
      return state
  }
}

export default menu