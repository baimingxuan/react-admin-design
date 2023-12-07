import type { UserState } from '@/stores/types'
import { createSlice } from '@reduxjs/toolkit'
import { TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum'
import { setAuthCache } from '@/utils/auth'

const initialState: UserState = {
  userInfo: null,
  token: undefined,
  sessionTimeout: false,
  lastUpdateTime: 0
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload ? action.payload : ''
      setAuthCache(TOKEN_KEY, action.payload)
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
      state.lastUpdateTime = new Date().getTime()
      setAuthCache(USER_INFO_KEY, action.payload)
    },
    setSessionTimeout: (state, action) => {
      state.sessionTimeout = action.payload
    },
    resetState(state) {
      state.userInfo = null
      state.token = undefined
      state.sessionTimeout = false
      state.lastUpdateTime = 0
    }
  }
})

export const { setToken, setUserInfo, setSessionTimeout, resetState } = user.actions

export default user.reducer
