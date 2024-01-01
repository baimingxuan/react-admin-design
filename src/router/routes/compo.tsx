import { lazy } from 'react'
import { RouteObject } from '../types'
import { LayoutGuard } from '../guard'
// import { LazyLoad } from '@/components/LazyLoad'
import ImageUpload from '@/views/compo/image-upload'
import DragList from '@/views/compo/drag/drag-list'
import DragResize from '@/views/compo/drag/drag-resize'
import Transfer from '@/views/compo/transfer'
import CountUp from '@/views/compo/count-up'

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
      element: <ImageUpload />,
      // element: LazyLoad(lazy(() => import('@/views/compo/image-upload'))),
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
          element: <DragList />,
          // element: LazyLoad(lazy(() => import('@/views/compo/drag/drag-list'))),
          meta: {
            title: '列表拖拽',
            key: 'dragList'
          }
        },
        {
          path: 'drag-resize',
          name: 'DragResize',
          element: <DragResize />,
          // element: LazyLoad(lazy(() => import('@/views/compo/drag/drag-resize'))),
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
      element: <Transfer />,
      // element: LazyLoad(lazy(() => import('@/views/compo/transfer'))),
      meta: {
        title: '穿梭框'
      }
    },
    {
      path: 'count-up',
      name: 'CountUp',
      element: <CountUp />,
      // element: LazyLoad(lazy(() => import('@/views/compo/count-up'))),
      meta: {
        title: '数字滚动',
        key: 'countUp'
      }
    }
  ]
}

export default CompoRoute
