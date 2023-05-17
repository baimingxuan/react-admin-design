import * as types from '@/stores/constant'
import { MenuOptions } from '@/stores/types'

export const setMenuList = (menuList: MenuOptions[]) => ({
  type: types.SET_MENU_LIST,
  menuList
})

export const updateCollapse = (isCollapse: boolean) => ({
  type: types.UPDATE_COLLAPSE,
  isCollapse
})