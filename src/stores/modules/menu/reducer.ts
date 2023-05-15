import { AnyAction } from 'redux'
import { MenuState } from '@/stores/types'
import { produce } from 'immer'

const menuState: MenuState = {
  isCollapse: false,
  menuList: []
}

const menu = (state: MenuState = menuState, action: AnyAction) => {
  produce(state, (draftState: any) => {
    switch (action.type) {
      case 'set_menu_list':
        draftState.menuList = action.menuList
        break
      default:
        return draftState
    }
  })
}

export default menu