import { lazy } from 'react'
import { RouteObject } from '../types'
import { LayoutGuard } from '../constant'
import lazyLoad from '../lazyLoad'

// image module page
const ImageRoute: RouteObject = {
  path: '/image',
  element: <LayoutGuard />,
  meta: {
    title: '图片处理',
    icon: 'image',
    orderNo: 4
  },
  children: [
    {
      path: 'image-cropper',
      element: lazyLoad(lazy(() => import('@/views/image/image-cropper'))),
      meta: {
        title: '图片裁剪',
        key: 'imageCropper'
      }
    },
    {
      path: 'image-compress',
      element: lazyLoad(lazy(() => import('@/views/blank'))),
      meta: {
        title: '图片压缩',
        key: 'imageCompress'
      }
    },
    {
      path: 'image-composition',
      element: lazyLoad(lazy(() => import('@/views/blank'))),
      meta: {
        title: '图片合成',
        key: 'imageComposition'
      }
    }
  ]
}

export default ImageRoute
