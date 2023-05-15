import { RouteObject } from '../types'
import { BasicLayout } from '../../layout'
import Home from '../../views/home'

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
          element: <Home />,
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
                  element: <Home />,
                  meta: {
                      title: '列表拖拽',
                      key: 'dragList'
                  }
              },
              {
                  path: 'drag-resize',
                  element: <Home />,
                  meta: {
                      title: '组件拖拽',
                      key: 'dragResize'
                  }
              }
          ]
      },
      {
          path: 'transfer',
          element: <Home />,
          meta: {
              title: '穿梭框'
          }
      },
      {
          path: 'count-to',
          element: <Home />,
          meta: {
              title: '数字滚动',
              key: 'countTo'
          }
      }
  ]
}

export default CompoRoute