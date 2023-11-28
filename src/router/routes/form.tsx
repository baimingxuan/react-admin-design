import { lazy } from 'react'
import { RouteObject } from '../types'
import { BasicLayout } from '@/layout'
import lazyLoad from '../lazyLoad'

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
      path: 'basic-form',
      element: lazyLoad(lazy(() => import('@/views/form/basic-form'))),
      meta: {
        title: '基础表单',
        key: 'basicForm'
      }
    },
    {
      path: 'form-designer',
      element: lazyLoad(lazy(() => import('@/views/blank'))),
      meta: {
        title: '表单设计器',
        key: 'formDesigner'
      }
    }
  ]
}

export default FormRoute
