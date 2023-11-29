import type { UserInfo } from '@/stores/types'
import { getAuthCache } from '@/utils/auth'
import { TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum'
import { useAppSelector } from '@/stores'

const { userInfo, token, sessionTimeout, lastUpdateTime } = useAppSelector(state => state.user)

export const getUserInfo = (): UserInfo => {
  return userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {}
}

export const getUserToken = (): string => {
  return token || getAuthCache<string>(TOKEN_KEY)
}

export const getSessionTimeout = (): boolean => {
  return !!sessionTimeout
}

export const getLastUpdateTime = (): number => {
  return lastUpdateTime || 0
}
