import { lazy } from '@loadable/component'
import type { RouteObject } from '../types'
import { LayoutGuard } from '../guard'
import { LazyLoad } from '@/components/LazyLoad'

// component module page
const CompoRoute: RouteObject = {
  path: '/compo',
  name: 'Compo',
  element: <LayoutGuard />,
  meta: {
    title: '组件',
    icon: 'compo',
    orderNo: 6
  },
  children: [
    {
      path: 'image-upload',
      name: 'ImageUpload',
      element: LazyLoad(lazy(() => import('@/views/compo/image-upload'))),
      meta: {
        title: '图片上传',
        key: 'imageUpload'
      }
    },
    {
      path: 'drag',
      name: 'Drag',
      meta: {
        title: '拖拽'
      },
      children: [
        {
          path: 'drag-list',
          name: 'DragList',
          element: LazyLoad(lazy(() => import('@/views/compo/drag/drag-list'))),
          meta: {
            title: '列表拖拽',
            key: 'dragList'
          }
        },
        {
          path: 'drag-resize',
          name: 'DragResize',
          element: LazyLoad(lazy(() => import('@/views/compo/drag/drag-resize'))),
          meta: {
            title: '组件拖拽',
            key: 'dragResize'
          }
        }
      ]
    },
    {
      path: 'transfer',
      name: 'Transfer',
      element: LazyLoad(lazy(() => import('@/views/compo/transfer'))),
      meta: {
        title: '穿梭框'
      }
    },
    {
      path: 'count-up',
      name: 'CountUp',
      element: LazyLoad(lazy(() => import('@/views/compo/count-up'))),
      meta: {
        title: '数字滚动',
        key: 'countUp'
      }
    }
  ]
}

export default CompoRoute
