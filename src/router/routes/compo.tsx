import { lazy } from 'react'
import { RouteObject } from '../types'
import { BasicLayout } from '../../layout'
import lazyLoad from '../lazyLoad'

// component module page
const CompoRoute: RouteObject = {
  path: '/compo',
  element: <BasicLayout />,
  meta: {
    title: '组件',
    icon: 'compo',
    orderNo: 6
  },
  children: [
    {
      path: 'image-upload',
      element: lazyLoad(lazy(() => import('@/views/compo/image-upload'))),
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
          element: lazyLoad(lazy(() => import('@/views/compo/drag/drag-list'))),
          meta: {
            title: '列表拖拽',
            key: 'dragList'
          }
        },
        {
          path: 'drag-resize',
          element: lazyLoad(lazy(() => import('@/views/compo/drag/drag-resize'))),
          meta: {
            title: '组件拖拽',
            key: 'dragResize'
          }
        }
      ]
    },
    {
      path: 'transfer',
      element: lazyLoad(lazy(() => import('@/views/compo/transfer'))),
      meta: {
        title: '穿梭框'
      }
    },
    {
      path: 'count-up',
      element: lazyLoad(lazy(() => import('@/views/compo/count-up'))),
      meta: {
        title: '数字滚动',
        key: 'countUp'
      }
    }
  ]
}

export default CompoRoute
