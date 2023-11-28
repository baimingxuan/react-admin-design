import { Navigate } from 'react-router-dom'
import { getAuthCache } from '@/utils/auth'
import { TOKEN_KEY } from '@/enums/cacheEnum'
import { useAppSelector } from '@/stores'

export const GuardRoute = (props: { children: JSX.Element }) => {
  const { token } = useAppSelector(state => state.user)
  const getToken = (): string => {
    return token || getAuthCache<string>(TOKEN_KEY)
  }

  if (getToken()) {
    return props.children
  } else {
    return <Navigate to='/login' replace />
  }
}
