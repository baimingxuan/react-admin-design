import { lazy } from '@loadable/component'
import type { RouteObject } from '../types'
import { LayoutGuard } from '../guard'
import { LazyLoad } from '@/components/LazyLoad'

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
      element: LazyLoad(lazy(() => import('@/views/flow/flow-approve'))),
      meta: {
        title: '审批流程图',
        key: 'flowApprove'
      }
    },
    {
      path: 'flow-bpmn',
      name: 'FlowBpmn',
      element: LazyLoad(lazy(() => import('@/views/flow/flow-bpmn'))),
      meta: {
        title: 'BPMN流程图',
        key: 'flowBpmn'
      }
    }
  ]
}

export default FlowEditorRoute
