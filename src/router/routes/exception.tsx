import { RouteObject } from '../types'
import { BasicLayout } from '../../layout'
import Page403 from '@/views/exception/page-403'
import Page404 from '@/views/exception/page-404'
import Page500 from '@/views/exception/page-500'

// exception module page
const ExceptionRoute: RouteObject = {
  path: '/exception',
  element: <BasicLayout />,
  meta: {
    title: '异常页面',
    icon: 'bug',
    orderNo: 11
  },
  children: [
    {
      path: 'page-403',
      element: <Page403 />,
      meta: {
        title: '403页面',
        key: 'page403'
      }
    },
    {
      path: 'page-404',
      element: <Page404 />,
      meta: {
        title: '404页面',
        key: 'page404'
      }
    },
    {
      path: 'page-500',
      element: <Page500 />,
      meta: {
        title: '500页面',
        key: 'page500'
      }
    }
  ]
}

export default ExceptionRoute