import { AnyAction } from 'redux'
import { MenuState } from '@/stores/types'
import { produce } from 'immer'
import * as types from '@/stores/constant'

const menuState: MenuState = {
  isCollapse: false,
  menuList: []
}

const menu = (state: MenuState = menuState, action: AnyAction) => {
  produce(state, (draftState: any) => {
    switch (action.type) {
      case types.SET_MENU_LIST:
        draftState.menuList = action.menuList
        break
      case types.UPDATE_COLLAPSE:
        draftState.isCollapse = action.isCollapse
        break
      default:
        return draftState
    }
  })
}

export default menu