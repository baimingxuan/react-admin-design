import { lazy } from 'react'
import { RouteObject } from '../types'
import { LayoutGuard } from '../guard'
// import { LazyLoad } from '@/components/LazyLoad'
import FlowApprove from '@/views/flow/flow-approve'
import FlowBpmn from '@/views/flow/flow-bpmn'

// flow-editor module page
const FlowEditorRoute: RouteObject = {
  path: '/flow-editor',
  name: 'FlowEditor',
  element: <LayoutGuard />,
  meta: {
    title: '流程图编辑器',
    icon: 'flow',
    orderNo: 8
  },
  children: [
    {
      path: 'flow-approve',
      name: 'FlowApprove',
      element: <FlowApprove />,
      // element: LazyLoad(lazy(() => import('@/views/flow/flow-approve'))),
      meta: {
        title: '审批流程图',
        key: 'flowApprove'
      }
    },
    {
      path: 'flow-bpmn',
      name: 'FlowBpmn',
      element: <FlowBpmn />,
      // element: LazyLoad(lazy(() => import('@/views/flow/flow-bpmn'))),
      meta: {
        title: 'BPMN流程图',
        key: 'flowBpmn'
      }
    }
  ]
}

export default FlowEditorRoute
