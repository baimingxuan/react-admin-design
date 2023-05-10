import { AppRoute } from './types'
import { useRoutes } from 'react-router-dom'

const metaRoutes = import.meta.glob('./routes/*.tsx', { eager: true }) as Recordable

const routeList: AppRoute[] = []

Object.keys(metaRoutes).forEach(key => {
  const module = metaRoutes[key].default || {}
  const moduleList = Array.isArray(module) ? [...module] : [module]
  routeList.push(...moduleList)
})