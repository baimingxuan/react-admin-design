import { lazy } from 'react'
import { RouteObject } from '../types'
import { LayoutGuard } from '../guard'
import { LazyLoad } from '@/components/LazyLoad'

// form module page
const FormRoute: RouteObject = {
  path: '/form',
  element: <LayoutGuard />,
  meta: {
    title: '表单',
    icon: 'form',
    orderNo: 2
  },
  children: [
    {
      path: 'basic-form',
      element: LazyLoad(lazy(() => import('@/views/form/basic-form'))),
      meta: {
        title: '基础表单',
        key: 'basicForm'
      }
    },
    {
      path: 'form-designer',
      element: LazyLoad(lazy(() => import('@/views/blank'))),
      meta: {
        title: '表单设计器',
        key: 'formDesigner'
      }
    }
  ]
}

export default FormRoute
