import { createSlice } from '@reduxjs/toolkit'
import { UserState } from '@/stores/types'

const initialState: UserState = {
  userInfo: null,
  token: undefined,
  sessionTimeout: false,
  lastUpdateTime: 0
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
      state.lastUpdateTime = new Date().getTime()
    },
    setSessionTimeout: (state, action) => {
      state.sessionTimeout = action.payload
    }
  }
})

export const { setToken } = userSlice.actions

export default userSlice.reducer