import { RouteObject } from './types'
import { Navigate, createHashRouter } from 'react-router-dom'
import LoginPage from '@/views/login'

const metaRoutes = import.meta.glob('./routes/*.tsx', { eager: true }) as Recordable

const routeList: RouteObject[] = []

Object.keys(metaRoutes).forEach(key => {
  const module = metaRoutes[key].default || {}
  const moduleList = Array.isArray(module) ? [...module] : [module]
  routeList.push(...moduleList)
})

const rootRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to='/home' />
  },
  {
    path: '/login',
    element: <LoginPage />,
    meta: {
      title: '登录页',
      key: 'login'
    }
  },
  ...routeList,
  {
    path: '*',
    element: <Navigate to='/404' />
  }
]

export { routeList as basicRoutes }

export default createHashRouter(rootRoutes)
