import { lazy } from 'react'
import { RouteObject } from '../types'
import { LayoutGuard } from '../guard'
// import { LazyLoad } from '@/components/LazyLoad'
import ImageCropper from '@/views/image/image-cropper'
import ImageCompress from '@/views/image/image-compress'
import ImageComposition from '@/views/image/image-composition'

// image module page
const ImageRoute: RouteObject = {
  path: '/image',
  name: 'Image',
  element: <LayoutGuard />,
  meta: {
    title: '图片处理',
    icon: 'image',
    orderNo: 4
  },
  children: [
    {
      path: 'image-cropper',
      name: 'ImageCropper',
      element: <ImageCropper />,
      // element: LazyLoad(lazy(() => import('@/views/image/image-cropper'))),
      meta: {
        title: '图片裁剪',
        key: 'imageCropper'
      }
    },
    {
      path: 'image-compress',
      name: 'ImageCompress',
      element: <ImageCompress />,
      // element: LazyLoad(lazy(() => import('@/views/image/image-compress'))),
      meta: {
        title: '图片压缩',
        key: 'imageCompress'
      }
    },
    {
      path: 'image-composition',
      name: 'ImageComposition',
      element: <ImageComposition />,
      // element: LazyLoad(lazy(() => import('@/views/image/image-composition'))),
      meta: {
        title: '图片合成',
        key: 'imageComposition'
      }
    }
  ]
}

export default ImageRoute
