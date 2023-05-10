import { RouteObject } from './types'
import { Navigate, useRoutes } from 'react-router-dom'

const metaRoutes = import.meta.glob('./routes/*.tsx', { eager: true }) as Recordable

const routeList: RouteObject[] = []

Object.keys(metaRoutes).forEach(key => {
  const module = metaRoutes[key].default || {}
  const moduleList = Array.isArray(module) ? [...module] : [module]
  routeList.push(...moduleList)
})

export const basicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to='/home' />
  },
  ...routeList,
  {
		path: '*',
		element: <Navigate to='/404' />
	}
]

const Router = () => {
  const routes = useRoutes(basicRoutes)
  return routes
}

export default Router