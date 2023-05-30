import { RouteObject } from './types'
import { Navigate, useRoutes } from 'react-router-dom'

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
  ...routeList,
  {
		path: '*',
		element: <Navigate to='/404' />
	}
]

export { routeList as basicRoutes }

export default () => useRoutes(rootRoutes)