import { AppRoute } from '../types'
import { BasicLayout } from '../../layout'
import Home from '../../views/home'

// exception module page
const ExceptionRoute: AppRoute = {
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
        title: '403页面'
      }
    },
    {
      path: 'page-404',
      element: <Home />,
      meta: {
        title: '404页面'
      }
    },
    {
      path: 'page-500',
      element: <Home />,
      meta: {
        title: '500页面'
      }
    }
  ]
}

export default ExceptionRoute