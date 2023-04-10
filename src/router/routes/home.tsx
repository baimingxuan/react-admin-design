import { AppRoute } from '../types'
import { BasicLayout } from '../../layout'
import Home from '../../views/home'

// Home route
const HomeRoute: AppRoute = {
  element: <BasicLayout />,
  children: [
    {
      path: '/home',
      element: <Home />,
      meta: {
        title: '首页',
        key: 'home',
        icon: 'home'
      }
    }
  ]
}

export default HomeRoute