import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { getAuthCache } from '@/utils/auth'
import { TOKEN_KEY } from '@/enums/cacheEnum'
import { useAppSelector } from '@/stores'

export const GuardRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useAppSelector(state => state.user)
  const getToken = (): string => {
    return token || getAuthCache<string>(TOKEN_KEY)
  }

  if (getToken()) {
    return children
  } else {
    return <Navigate to='/login' replace />
  }
}
