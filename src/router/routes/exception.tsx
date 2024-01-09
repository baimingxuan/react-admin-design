import { lazy } from '@loadable/component'
import type { RouteObject } from '../types'
import { LayoutGuard } from '../guard'
import { ExceptionEnum } from '@/enums/exceptionEnum'
import { LazyLoad } from '@/components/LazyLoad'

// exception module page
const ExceptionRoute: RouteObject = {
  path: '/exception',
  name: 'ExceptionPage',
  element: <LayoutGuard />,
  meta: {
    title: '异常页面',
    icon: 'bug',
    orderNo: 11
  },
  children: [
    {
      path: 'page-403',
      name: 'Page403',
      element: LazyLoad(lazy(() => import('@/views/exception'))),
      meta: {
        title: '403页面',
        key: 'page403'
      },
      loader: () => ({ status: ExceptionEnum.PAGE_NOT_ACCESS, withCard: true })
    },
    {
      path: 'page-404',
      name: 'Page404',
      element: LazyLoad(lazy(() => import('@/views/exception'))),
      meta: {
        title: '404页面',
        key: 'page404'
      },
      loader: () => ({ status: ExceptionEnum.PAGE_NOT_FOUND, withCard: true })
    },
    {
      path: 'page-500',
      name: 'Page500',
      element: LazyLoad(lazy(() => import('@/views/exception'))),
      meta: {
        title: '500页面',
        key: 'page500'
      },
      loader: () => ({ status: ExceptionEnum.SERVER_ERROR, withCard: true })
    }
  ]
}

export default ExceptionRoute
