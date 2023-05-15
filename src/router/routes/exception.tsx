import { RouteObject } from '../types'
import { BasicLayout } from '../../layout'
import Home from '../../views/home'

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
      element: <Home />,
      meta: {
        title: '403页面',
        key: 'page403'
      }
    },
    {
      path: 'page-404',
      element: <Home />,
      meta: {
        title: '404页面',
        key: 'page404'
      }
    },
    {
      path: 'page-500',
      element: <Home />,
      meta: {
        title: '500页面',
        key: 'page500'
      }
    }
  ]
}

export default ExceptionRoute