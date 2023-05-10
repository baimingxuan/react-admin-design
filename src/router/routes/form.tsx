import { RouteObject } from '../types'
import { BasicLayout } from '../../layout'
import Home from '../../views/home'

// form module page
const FormRoute: RouteObject = {
  path: '/form',
  element: <BasicLayout />,
  meta: {
      title: '表单',
      icon: 'form',
      orderNo: 2
  },
  children: [
      {
          path: 'form-list',
          element: <Home />,
          meta: {
              title: '表单列表'
          }
      },
      {
          path: 'form-marking',
          element: <Home />,
          meta: {
              title: '表单生成器'
          }
      }
  ]
}

export default FormRoute