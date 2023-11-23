import { lazy } from 'react'
import { RouteObject } from '../types'
import { BasicLayout } from '../../layout'
import lazyLoad from '../lazyLoad'

// graph-editor module page
const GraphEditorRoute: RouteObject = {
  path: '/graph-editor',
  element: <BasicLayout />,
  meta: {
    title: '图形编辑器',
    icon: 'flow',
    orderNo: 8
  },
  children: [
    {
      path: 'flow-chart',
      element: lazyLoad(lazy(() => import('@/views/blank'))),
      meta: {
        title: '流程图',
        key: 'flowChart'
      }
    },
    {
      path: 'mind-chart',
      element: lazyLoad(lazy(() => import('@/views/blank'))),
      meta: {
        title: '思维导图',
        key: 'mindChart'
      }
    }
  ]
}

export default GraphEditorRoute
