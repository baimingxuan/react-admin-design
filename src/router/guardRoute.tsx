
import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getUserToken } from '@/stores/getters'

export const GuardRoute = (props: { children: JSX.Element }) => {
  const { pathname } = useLocation()

  useEffect(() => {
    console.log('pathname', pathname)
  }, [pathname])

  if (getUserToken()) {
    return props.children
  } else {
    return <Navigate to='/login' replace />
  }
}
