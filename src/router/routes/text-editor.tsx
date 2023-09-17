import { RouteObject } from '../types'
import { BasicLayout } from '../../layout'
import Markdown from '@/views/editor/markdown'
import CodeMirror from '@/views/editor/code-mirror'
import RichText from '@/views/editor/rich-text'

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
      element: <Markdown />,
      meta: {
        title: 'Markdown编辑器',
        key: 'markdown'
      }
    },
    {
      path: 'rich-text',
      element: <RichText />,
      meta: {
        title: '富文本编辑器',
        key: 'richText'
      }
    },
    {
      path: 'code-editor',
      element: <CodeMirror />,
      meta: {
        title: '代码编辑器',
        key: 'codeEditor'
      }
    }
  ]
}

export default TextEditorRoute