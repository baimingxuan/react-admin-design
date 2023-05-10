import { RouteObject } from '../types'
import { BasicLayout } from '../../layout'
import Home from '../../views/home'

// Home route
const HomeRoute: RouteObject = {
  element: <BasicLayout />,
  children: [
    {
      path: '/home',
      element: <Home />,
      meta: {
        title: '首页',
        key: 'home',
        icon: 'home',
        orderNo: 1
      }
    }
  ]
}

export default HomeRoute