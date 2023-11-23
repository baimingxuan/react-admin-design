import { lazy } from 'react'
import { RouteObject } from '../types'
import { BasicLayout } from '../../layout'
import lazyLoad from '../lazyLoad'

// Home route
const HomeRoute: RouteObject = {
  path: '/home',
  element: <BasicLayout />,
  meta: {
    title: '首页',
    icon: 'home',
    orderNo: 1,
    hideChildrenInMenu: true
  },
  children: [
    {
      path: '',
      element: lazyLoad(lazy(() => import('@/views/home'))),
      meta: {
        title: '首页',
        key: 'home',
        icon: 'home',
        orderNo: 1,
        hideMenu: true
      }
    }
  ]
}

export default HomeRoute
