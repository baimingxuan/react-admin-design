import { lazy } from '@loadable/component'
import type { RouteObject } from '../types'
import { LayoutGuard } from '../guard'
import { LazyLoad } from '@/components/LazyLoad'

// text-editor module page
const TextEditorRoute: RouteObject = {
  path: '/editor',
  name: 'Editor',
  element: <LayoutGuard />,
  meta: {
    title: '文本编辑器',
    icon: 'editor',
    orderNo: 7
  },
  children: [
    {
      path: 'markdown',
      name: 'Markdown',
      element: LazyLoad(lazy(() => import('@/views/editor/markdown'))),
      meta: {
        title: 'Markdown编辑器',
        key: 'markdown'
      }
    },
    {
      path: 'rich-text',
      name: 'RichText',
      element: LazyLoad(lazy(() => import('@/views/editor/rich-text'))),
      meta: {
        title: '富文本编辑器',
        key: 'richText'
      }
    },
    {
      path: 'code-editor',
      name: 'CodeEditor',
      element: LazyLoad(lazy(() => import('@/views/editor/code-mirror'))),
      meta: {
        title: '代码编辑器',
        key: 'codeEditor'
      }
    }
  ]
}

export default TextEditorRoute
