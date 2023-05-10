import { AppRoute } from '../types'
import { BasicLayout } from '../../layout'
import Home from '../../views/home'

// graph-editor module page
const GraphEditorRoute: AppRoute = {
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
          element: <Home />,
          meta: {
              title: '流程图'
          }
      },
      {
          path: 'mind',
          element: <Home />,
          meta: {
              title: '思维导图'
          }
      }
  ]
}

export default GraphEditorRoute