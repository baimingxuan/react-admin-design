import { createSlice } from '@reduxjs/toolkit'
import type { MenuState } from '@/stores/types'

const initialState: MenuState = {
  menuList: [],
  isCollapse: false
}

const menu = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenuList: (state, action) => {
      state.menuList = action.payload
    },
    updateCollapse: (state, action) => {
      state.isCollapse = action.payload
    }
  }
})

export const { setMenuList, updateCollapse } = menu.actions

export default menu.reducer
