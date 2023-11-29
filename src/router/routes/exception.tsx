import { lazy } from 'react'
import { RouteObject } from '../types'
import { LayoutGuard } from '../guard'
import { LazyLoad } from '@/components/LazyLoad'

// exception module page
const ExceptionRoute: RouteObject = {
  path: '/exception',
  element: <LayoutGuard />,
  meta: {
    title: '异常页面',
    icon: 'bug',
    orderNo: 11
  },
  children: [
    {
      path: 'page-403',
      element: LazyLoad(lazy(() => import('@/views/exception/page-403'))),
      meta: {
        title: '403页面',
        key: 'page403'
      }
    },
    {
      path: 'page-404',
      element: LazyLoad(lazy(() => import('@/views/exception/page-404'))),
      meta: {
        title: '404页面',
        key: 'page404'
      }
    },
    {
      path: 'page-500',
      element: LazyLoad(lazy(() => import('@/views/exception/page-500'))),
      meta: {
        title: '500页面',
        key: 'page500'
      }
    }
  ]
}

export default ExceptionRoute
