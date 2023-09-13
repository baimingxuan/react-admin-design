import { RouteObject } from '../types'
import { BasicLayout } from '../../layout'
import Home from '../../views/home'
import ImageCropper from '@/views/image/image-cropper'

// image module page
const ImageRoute: RouteObject = {
    path: '/image',
    element: <BasicLayout />,
    meta: {
        title: '图片处理',
        icon: 'image',
        orderNo: 4
    },
    children: [
        {
            path: 'image-cropper',
            element: <ImageCropper />,
            meta: {
                title: '图片裁剪',
                key: 'imageCropper'
            }
        },
        {
            path: 'image-compress',
            element: <Home />,
            meta: {
                title: '图片压缩',
                key: 'imageCompress'
            }
        },
        {
            path: 'image-composition',
            element: <Home />,
            meta: {
                title: '图片合成',
                key: 'imageComposition'
            }
        }
    ]
}

export default ImageRoute