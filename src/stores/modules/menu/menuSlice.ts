import { createSlice } from '@reduxjs/toolkit'

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    isCollapse: false,
    menuList: []
  },
  reducers: {
    setMenuList: (state, action) => {
      state.menuList = action.payload
    },
    updateCollapse: (state, action) => {
      state.isCollapse = action.payload
    }
  }
})