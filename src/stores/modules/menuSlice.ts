import { createSlice } from '@reduxjs/toolkit'
import { MenuState } from '@/stores/types'

const initialState: MenuState = {
  menuList: [],
  isCollapse: false
}

const menuSlice = createSlice({
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

export const { setMenuList, updateCollapse } = menuSlice.actions

export default menuSlice.reducer