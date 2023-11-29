import { lazy } from 'react'
import { RouteObject } from '../types'
import { LayoutGuard } from '../guard'
import { LazyLoad } from '@/components/LazyLoad'

// component module page
const CompoRoute: RouteObject = {
  path: '/compo',
  element: <LayoutGuard />,
  meta: {
    title: '组件',
    icon: 'compo',
    orderNo: 6
  },
  children: [
    {
      path: 'image-upload',
      element: LazyLoad(lazy(() => import('@/views/compo/image-upload'))),
      meta: {
        title: '图片上传',
        key: 'imageUpload'
      }
    },
    {
      path: 'drag',
      meta: {
        title: '拖拽'
      },
      children: [
        {
          path: 'drag-list',
          element: LazyLoad(lazy(() => import('@/views/compo/drag/drag-list'))),
          meta: {
            title: '列表拖拽',
            key: 'dragList'
          }
        },
        {
          path: 'drag-resize',
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
      element: LazyLoad(lazy(() => import('@/views/compo/transfer'))),
      meta: {
        title: '穿梭框'
      }
    },
    {
      path: 'count-up',
      element: LazyLoad(lazy(() => import('@/views/compo/count-up'))),
      meta: {
        title: '数字滚动',
        key: 'countUp'
      }
    }
  ]
}

export default CompoRoute
