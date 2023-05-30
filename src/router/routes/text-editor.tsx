import { RouteObject } from '../types'
import { BasicLayout } from '../../layout'
import Home from '../../views/home'

// text-editor module page
const TextEditorRoute: RouteObject = {
  path: '/editor',
  element: <BasicLayout />,
  meta: {
    title: '文本编辑器',
    icon: 'editor',
    orderNo: 7
  },
  children: [
    {
      path: 'markdown',
      element: <Home />,
      meta: {
        title: 'Markdown编辑器',
        key: 'markdown'
      }
    },
    {
      path: 'rich-text',
      element: <Home />,
      meta: {
        title: '富文本编辑器',
        key: 'richText'
      }
    },
    {
      path: 'code-editor',
      element: <Home />,
      meta: {
        title: '代码编辑器',
        key: 'codeEditor'
      }
    }
  ]
}

export default TextEditorRoute