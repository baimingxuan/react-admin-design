import { redirect } from 'react-router-dom'
import { getToken } from '@/utils/auth'

export const permissionLoader = () => {
  if (!getToken()) return redirect('/login')
  return {}
}
